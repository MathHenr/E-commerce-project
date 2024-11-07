import Link from "next/link"

import { UserCircle2, Settings, LogOut } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

export const UserIcon = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserCircle2 className="bg-transparent hover:cursor-pointer rounded-md size-6"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2 mr-12 size-[210px] flex flex-col bg-slate-100">
                <DropdownMenuLabel>
                    My account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-600/45" />
                <DropdownMenuItem className="w-full flex justify-center mt-3 hover:cursor-pointer hover:bg-slate-300/95">
                    <Link
                        className="flex gap-2"
                        href="/profile"
                    >
                        <Settings />
                        My Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="w-full flex justify-center mt-3 hover:cursor-pointer hover:bg-slate-300/95">
                    Item 2
                </DropdownMenuItem>
                <DropdownMenuItem className="w-full flex justify-center mt-3 hover:cursor-pointer hover:bg-slate-300/95">
                    <Link
                        className="flex gap-2"
                        href="/profile"
                    >
                        <LogOut />
                        Sign Out
                    </Link>    
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}