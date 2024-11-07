import { UserIcon } from "@/components/user-icon"

export const Nav = () => {
    return (
        <nav className="w-full p-4 flex items-center justify-between font-poppins">
            <h1 className="text-lg">
                Hello, Username!
                <p className="text-sm text-slate-700/90">
                    Tell more about you right here
                </p>
            </h1>
            <div>
                <UserIcon />
            </div>
        </nav>
    )
}