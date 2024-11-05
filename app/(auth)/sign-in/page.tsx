"use client"

import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"

export default function Page () {
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <Button
                onClick={() => signIn('google', { callbackUrl: '/profile' })}
            >
                Sign-in with Google
            </Button>
        </div>
    )
}