import Image from "next/image"

import { UserIcon } from "@/components/user-icon"

export const Nav = () => {
    return (
        <nav className="w-full p-4 flex items-center justify-between font-poppins">
            <div className="flex items-center gap-6">
                <Image height={140} width={140} src="/logo.svg" alt="Logo" />
                <h1 className="text-lg">
                    Hello, Username!
                    <p className="text-sm text-slate-700/90">
                        Tell more about you right here
                    </p>
                </h1>
            </div>
            <div>
                <UserIcon />
            </div>
        </nav>
    )
}