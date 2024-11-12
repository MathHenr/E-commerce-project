import Link from "next/link"
import { useAuth } from "@/hook/useAuth"
import { useRouter } from "next/navigation"

import { UserCircle2, Settings, LogOut } from "lucide-react"

import { deleteSession } from "@/lib/session"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export const UserIcon = () => {
    const { user } = useAuth()
    const router = useRouter()
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserCircle2 className="bg-transparent hover:cursor-pointer rounded-md size-6"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2 mr-12 size-auto flex flex-col bg-slate-100">
                <DropdownMenuLabel>
                    {user ? `${user.firstName}'s account`: ''}
                </DropdownMenuLabel>
                {user ? (
                    <>
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
                            <Button
                                className="px-3 w-auto rounded-sm text-sm"
                                onClick={() => deleteSession()}
                            >
                                <LogOut />
                                Sign Out
                            </Button>    
                        </DropdownMenuItem>
                    </>
                ) : (
                    <DropdownMenuItem className="w-full flex justify-center mt-3 hover:cursor-pointer hover:bg-slate-300/95">
                        <Button
                            className="px-3 w-auto rounded-sm text-sm"
                            onClick={() => router.push("/sign-in")}
                        >
                            <LogOut />
                            Sign In
                        </Button>    
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}