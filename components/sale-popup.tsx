"use client"

import { useState } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

export const SalePopup = () => {
    const [isClosed, setIsClosed] = useState<boolean>(false)

    const handleClose = () => {
        setIsClosed(true)
    }
    
    return (
        <div className={cn(
            "w-full bg-black text-slate-200 text-sm p-2 space-x-0.5",
            isClosed ? "hidden" : "flex items-center justify-center"
        )}>
            <p>
                Sign up and get 20% off to yuor first order.
            </p>
            <Link 
                className="underline"
                href="/sign-up"
            >
                Sign Up Now 
            </Link>
            <button 
                className="absolute md:right-1/4 right-10 text-sm font-semibold hover:text-slate-200/75 hover:cursor-pointer"
                onClick={() => handleClose()}
            >
                x
            </button>
        </div>
    )
}