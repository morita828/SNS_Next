import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;

  const protectedPaths = ["/login"];
  const currentPath = request.nextUrl.pathname;
  const isProtected = protectedPaths.some((path) => currentPath.startsWith(path));

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL("/logout/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login/:path*"],
};
