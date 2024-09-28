import { NextResponse } from "next/server";

export async function middleware(request) {
  // Accessing the cookie named 'authToken'
  const token = request.cookies.get("authToken");

  // If no authToken is found and the user is trying to access protected routes
  if (!token && !request.nextUrl.pathname.startsWith("/login")) {
    // Redirect to login page
    const url = new URL("/login", request.url);
    return NextResponse.redirect(url);
  }

  // Proceed to the requested page if authToken exists or it's a non-protected route
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/about/:path*",
    "/services/:path*",
    "/contact/:path*",
  ],
};
