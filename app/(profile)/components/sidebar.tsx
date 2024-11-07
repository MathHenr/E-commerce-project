"use client"

import { usePathname } from "next/navigation"

import { Icon } from "./sidebar-icon"

const routes = [
    {
        href: "/",
        label: "Store"
    },
    {
        href: "/profile",
        label: "Profile"
    },
    {
        href: "/profile/address",
        label: "Address"
    },
    {
        href: "/profile/payment-methods",
        label: "Payment Methods"
    },
]

export const Sidebar = () => {
    const path = usePathname()
    
    return(
        <aside className="min-h-screen bg-slate-50 shadow-[12px_0_32px_-34px_rgba(0,0,0,.75)] flex flex-col items-center justify-center">
            {routes.map((route) => (
                <Icon
                    key={route.href}
                    label={route.label}
                    href={route.href}
                    isActive={path === route.href}
                />
            ))}
        </aside>
    )
}