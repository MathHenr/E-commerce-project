import Link from "next/link"
import { ShoppingBag, Settings, DollarSign, MapPinHouse  } from "lucide-react"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface IconProps {
    href: string,
    label: string
    isActive?: boolean,
}


export const Icon = ({
    href,
    label,
    isActive
}: IconProps) => {
    const lucideIcon = () => {
        return label === "Store" ? (<ShoppingBag/>) : label === "Profile" ? (<Settings />) : label === "Address" ? (<MapPinHouse />) : label === "Payment Methods" ? (<DollarSign />) : null
    }
    return (
        <div
            className={cn("w-full text-center hover:bg-slate-600/95 hover:text-slate-100 transition-all ease-linear duration-75 font-poppins",
                isActive ? "bg-slate-600/95 text-slate-100" : "bg-slate-50"
            )}
        >
            <TooltipProvider>
                <Tooltip>
                    <Link
                        href={href}
                    >
                        <TooltipTrigger
                            className="w-full h-full py-6 flex items-center justify-center"
                        >
                            {lucideIcon()}
                        </TooltipTrigger>
                    </Link>
                    <TooltipContent
                        className="ml-0.5"
                    >
                        <p className="text-sm">
                            {label}
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}