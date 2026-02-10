import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./utils/auth-utils";
const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Get authentication and role data from cookies
  let accessToken = request.cookies.get("accessToken")?.value || null;
  const refreshToken = request.cookies.get("refreshToken")?.value || null;
  let userRole = (request.cookies.get("userRole")?.value as UserRole) || null;

  // 2. Token Refresh Logic - If access token is missing but refresh token exists
  if (!accessToken && refreshToken && !isAuthRoute(pathname)) {
    try {
      const refreshResponse = await fetch(
        `${BACKEND_API_URL}/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        },
      );

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        const newAccessToken = refreshData.data?.accessToken;
        const newRefreshToken = refreshData.data?.refreshToken;
        const role = refreshData.data?.user?.role;

        if (newAccessToken) {
          // Create response with updated cookies
          // Create request headers for passing the new token downstream
          const requestHeaders = new Headers(request.headers);
          requestHeaders.set("Authorization", `Bearer ${newAccessToken}`);

          // Pass the updated headers to the next response
          const response = NextResponse.next({
            request: {
              headers: requestHeaders,
            },
          });
          const isProduction = process.env.NODE_ENV === "production";

          // Set new access token cookie on the response (for the client)
          response.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "lax",
            maxAge: 3600, // 1 hour
            path: "/",
          });

          // Set new refresh token if provided
          if (newRefreshToken) {
            response.cookies.set("refreshToken", newRefreshToken, {
              httpOnly: true,
              secure: isProduction,
              sameSite: "lax",
              maxAge: 3600 * 24 * 90, // 90 days
              path: "/",
            });
          }

          // Set role if provided
          if (role) {
            response.cookies.set("userRole", role, {
              httpOnly: true,
              secure: isProduction,
              sameSite: "lax",
              maxAge: 3600 * 24 * 90,
              path: "/",
            });
            userRole = role as UserRole;
          }

          // Update local variables for subsequent checks
          accessToken = newAccessToken;

          console.log("✅ Token refreshed successfully in middleware");

          // Continue with the refreshed token
          return response;
        }
      } else {
        // Refresh token is invalid - clear all cookies
        const response = NextResponse.redirect(
          new URL("/auth/login", request.url),
        );
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        response.cookies.delete("userRole");
        return response;
      }
    } catch (error) {
      console.error("❌ Token refresh failed in middleware:", error);
      // On error, clear cookies and redirect to login
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url),
      );
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      response.cookies.delete("userRole");
      return response;
    }
  }
  const routeOwner = getRouteOwner(pathname);
  const isAuth = isAuthRoute(pathname);

  // 3. Redirect unauthenticated users trying to access protected routes
  if (!accessToken && routeOwner !== null) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }
  // 4. Handle authenticated users
  // We only treat them as fully authenticated if they have BOTH the token and the role
  if (accessToken && userRole) {
    // If they are logged in, don't let them go back to login/register pages
    if (isAuth) {
      const defaultRoute = getDefaultDashboardRoute(userRole);
      // Ensure we don't redirect to the same page (infinite loop protection)
      if (pathname === defaultRoute) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL(defaultRoute, request.url));
    }

    // Role-Based Access Control (RBAC)
    if (routeOwner !== null && routeOwner !== "COMMON") {
      // If userRole doesn't match the required route owner, redirect to their own dashboard
      if (userRole !== routeOwner) {
        console.warn(
          `Access Denied: User role '${userRole}' cannot access '${pathname}' (owned by ${routeOwner})`,
        );
        const safeRoute = getDefaultDashboardRoute(userRole);
        return NextResponse.redirect(new URL(safeRoute, request.url));
      }
    }
  }

  // 5. Special Case: Token exists but Role is missing (possibly stale session)
  // In this case, we allow them to access the login page to re-authenticate properly
  if (accessToken && !userRole && isAuth) {
    return NextResponse.next();
  }

  return NextResponse.next();
}
export default middleware;

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
