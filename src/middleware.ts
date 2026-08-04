import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Skip the login page itself
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Check if user has the admin session cookie
  const adminSession = request.cookies.get("admin_session");

  if (!adminSession || adminSession.value !== "true") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};