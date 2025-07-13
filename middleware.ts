import { NextResponse, type NextRequest } from "next/server";

const IntersectionCookie = process.env.NEXT_PUBLIC_INTERSECTION_COOKIE;
const PUBLIC_PATHS = ["/"];
const AUTH_REDIRECT_PATHS = ["/"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasCookie = request.cookies.has(IntersectionCookie!);

  // Skip API routes and static files
  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  if (hasCookie && (pathname === "/" || PUBLIC_PATHS.includes(pathname))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  // Handle redirects
  if (!hasCookie && pathname !== "/login" && !PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - image.png (specific static file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|image.png|firebase-messaging-sw.js).*)",
  ],
};
