import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { decrypt } from "@/lib/session";

const privateRoutes = ["/profile","/profile/address","/profile/payment-methods"]

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isPrivateRoute = privateRoutes.includes(path)

    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)
    // TODO: google session if user sign-in with google acc
    
    if (isPrivateRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/sign-in", req.nextUrl))
    }
    
    if (isPrivateRoute && session?.userId && !req.nextUrl.pathname.startsWith("/profile")) {
        return NextResponse.redirect(new URL("/profile", req.nextUrl))
    }

    return NextResponse.next()
}