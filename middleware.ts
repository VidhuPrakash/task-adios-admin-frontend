import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = ["/"];
const AUTH_REDIRECT_PATHS = ["/",];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes and static files
  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Create absolute URL for session check
  const sessionUrl = new URL("/api/auth/session", request.url);

  let isAuthenticated = false;
  try {
    const sessionRes = await fetch(sessionUrl, {
      headers: {
        cookie: request.cookies.toString(),
        // Forward host header for proper backend routing
        host: request.headers.get("host") || "",
      },
      credentials: "include",
    });

    // Check if session is valid (200 OK)
    isAuthenticated = sessionRes.ok;
  } catch (error) {
    console.error("Session check failed:", error);
  }

  // Handle redirects
  if (AUTH_REDIRECT_PATHS.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!PUBLIC_PATHS.includes(pathname) && !isAuthenticated) {
    const loginUrl = new URL("/", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|images).*)"],
};
