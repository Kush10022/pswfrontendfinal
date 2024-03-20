// import { NextResponse } from 'next/server'

// // This function can be marked async if using await inside
// export function middleware(request) {
//     // console.log("hello middleware")
//     // return NextResponse.redirect(new URL('/login', request.url))
// }
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
    // Accessing the cookie named 'authToken'
    const token = request.cookies.get('authToken');

    // If no authToken is found and the user is trying to access protected routes
    if (!token && !request.nextUrl.pathname.startsWith('/login')) {
        // Redirect to login page
        const url = new URL('/login', request.url);
        return NextResponse.redirect(url);
    }

    // Proceed to the requested page if authToken exists or it's a non-protected route
    return NextResponse.next();
}


// See "Matching Paths" below to learn more
export const config = {

    //when paths increase change to this array
    matcher: ['/dashboard/:path*', '/profile/:path*', '/afterEmailregister/:path*', '/newpassword/:path*', '/verifyEmail/:path*', '/resetPassword/:path*', '/passwordreset/:path*'],

    //matcher: '/dashboard/:path*',
}