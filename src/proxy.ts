import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getRouteOwner } from "./utils/auth-utils";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value || null;
  const routeOwner = getRouteOwner(pathname);
  // 2. Unauthenticated user trying to access protected routes
  if (!accessToken && routeOwner !== null) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export default middleware;

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
