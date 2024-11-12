import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"


export const Swicth = () => {
    const path = usePathname()
    
    return (
        <nav className="w-full flex items-center justify-center">
            <ul className="w-full flex items-center justify-around gap-3 bg-slate-300/25 rounded-md p-2 text-sm">
                <Link 
                    href="/sign-in"
                    className={cn("px-4 py-2 text-center hover:cursor-pointer rounded-md transition-all ease-linear",
                        (path === "/sign-in") ? "bg-slate-700 text-slate-50" : "hover:bg-slate-700 hover:text-slate-50"
                    )}
                >
                    Sign In
                </Link>
                <Link 
                    href="/sign-up"
                    className={cn("px-4 py-2 text-center hover:cursor-pointer rounded-md transition-all ease-linear",
                        (path === "/sign-up") ? "bg-slate-700 text-slate-50" : "hover:bg-slate-700 hover:text-slate-50"
                    )}
                >
                    Sign Up
                </Link>
            </ul>
        </nav>
    )
}