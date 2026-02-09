import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./utils/auth-utils";
import { verifyAccessToken } from "./utils/jwtHanlders";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value || null;

  let userRole: UserRole | null = null;

  if (accessToken) {
    const result = await verifyAccessToken(accessToken);
    if (result.success && result.payload) {
      userRole = result.payload.role as UserRole;
    } else {
      const response = NextResponse.redirect(
        new URL("/auth/login", request.url),
      );
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  }

  const isAuthPath = isAuthRoute(pathname);
  const routeOwner = getRouteOwner(pathname);

  // 1. Logged in user trying to access Auth Routes (Login/Register)
  if (accessToken && isAuthPath && userRole) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole), request.url),
    );
  }

  // 2. Unauthenticated user trying to access protected routes
  if (!accessToken && routeOwner !== null) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Authenticated user trying to access role-specific routes (Cross-role protection)
  if (
    accessToken &&
    userRole &&
    routeOwner !== null &&
    routeOwner !== "COMMON"
  ) {
    if (userRole !== routeOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole), request.url),
      );
    }
  }

  return NextResponse.next();
}

export default middleware;

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
