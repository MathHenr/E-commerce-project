"use server"

import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

type SessionPayload = {
    userId: string,
    expiresAt: Date,
}

const secret = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secret)

async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256']
        })
        return payload
    } catch (error) {
        console.log("Failed to verify session")
    }
}


export async function createSession (userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, expiresAt })
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/"
    })
}

export async function updateSession() {
    const session = (await cookies()).get("session")?.value
    const payload = await decrypt(session)

    if (!session || !payload) {
        return null
    }

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const cookieStore = await cookies()
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/"
    })
}

export async function deleteSession () {
    const cookieStore = await cookies()
    cookieStore.delete("session")
}