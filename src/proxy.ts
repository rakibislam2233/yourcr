import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./utils/auth-utils";

/**
 * Middleware handles route protection and role-based access control.
 * It uses cookies to verify authentication status and user roles.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Get authentication and role data from cookies
  const accessToken = request.cookies.get("accessToken")?.value || null;
  const userRole = (request.cookies.get("userRole")?.value as UserRole) || null;

  const routeOwner = getRouteOwner(pathname);
  const isAuth = isAuthRoute(pathname);

  // 2. Redirect unauthenticated users trying to access protected routes
  if (!accessToken && routeOwner !== null) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Handle authenticated users
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

  // 4. Special Case: Token exists but Role is missing (possibly stale session)
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
