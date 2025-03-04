import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/authService";
import { TUser } from "./types";
type TRole = keyof typeof roleBasedRoutes
const authRoutes = ['/login', '/register']
const roleBasedRoutes = {
    user: [/^\/user/, /^\/create-shop/],
    admin: [/^\/admin/],
}

export const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl

    const user = await getCurrentUser()
    if (!user) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL(`http://localhost:3000/login?redirectPath=${pathname}`,
                request.url
            ))
        }
    }

    if ((user as TUser)?.role && roleBasedRoutes[(user as TUser)?.role as TRole]) {
        if (roleBasedRoutes[(user as TUser)?.role as TRole].some(route => pathname.match(route))) {
            return NextResponse.next()
        }
    }
    return NextResponse.redirect(new URL('/', request.url))



}


export const config = {
    matcher: [
        '/create-shop',
        '/admin',
        '/user',
        '/admin/:page',
        '/user/:page',
    ]
}