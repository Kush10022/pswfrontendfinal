import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    console.log("hello middleware")
    return NextResponse.redirect(new URL('/login', request.url))
}

// See "Matching Paths" below to learn more
export const config = {

    //when paths increase change to this array
    matcher: ['/testfile/:path*', '/dashboard/:path*'],

    //matcher: '/dashboard/:path*',
}
