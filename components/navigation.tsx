import Link from "next/link"
import Image from "next/image"

import { Search, Shirt, UserCircle2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from "@/components/ui/hover-card"

export const Navigation = () => {
    return (
        <div className="bg-slate-300/90">
            <div className="max-w-screen-2xl mx-auto p-4 flex space-x-2">
                    <Image height={200} width={200} src="/logo.svg" alt="Logo" />
                    <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger
                                        className="h-8 bg-transparent hover:bg-transparent"
                                    >
                                        Shop
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="grid gap-3 p-4 lg:w-[400px] lg:grid-cols-[.75fr_1fr]">
                                            <span className="row-span-3 text-slate-800">
                                                <NavigationMenuLink asChild>
                                                    <Link 
                                                        className="flex h-full w-full flex-col gap-2 justify-start rounded-md bg-gradient-to-t from-muted to-muted/80 p-4 no-underline outline-none focus:shadow-md"
                                                        href="/"
                                                    >
                                                        <div className="flex gap-3 text-slate-900">
                                                            <Shirt size={20}/>
                                                            <h1>Formal</h1>
                                                        </div>
                                                        <p className="font-base text-sm text-slate-800/60">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est ducimus totam, perferendis iusto repudiandae minus quod velit?</p>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </span>
                                            <Link 
                                                className="bg-gradient-to-l from-slate-300 to-slate-200 p-4 rounded-md flex gap-3 items-center hover:shadow-md transition-transform ease-in delay-75 focus:shadow-md outline-none"
                                                href="/"
                                            >
                                                <Shirt size={20}/>
                                                teste
                                            </Link>
                                            <Link 
                                                className="bg-gradient-to-l from-slate-300 to-slate-200 p-4 rounded-md flex gap-3 items-center hover:shadow-md transition-transform ease-in delay-75 focus:shadow-md outline-none"
                                                href="/"
                                            >
                                                <Shirt size={20}/>
                                                teste
                                            </Link>
                                            <Link 
                                                className="bg-gradient-to-l from-slate-300 to-slate-200 p-4 rounded-md flex gap-3 items-center hover:shadow-md transition-transform ease-in delay-75 focus:shadow-md outline-none "
                                                href="/"
                                            >
                                                <Shirt size={20}/>
                                                teste
                                            </Link>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger
                                         className="h-8 bg-transparent hover:bg-transparent"
                                    >
                                        On Sale
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="grid gap-3 p-4 lg:w-[400px] lg:grid-cols-2">
                                            <Link 
                                                className="bg-gradient-to-l from-slate-300 to-slate-200 p-4 rounded-md flex gap-3 items-center hover:shadow-md transition-transform ease-in delay-75 focus:shadow-md outline-none"
                                                href="/"
                                            >
                                                <Shirt size={20}/>
                                                teste
                                            </Link>
                                            <Link 
                                                className="bg-gradient-to-l from-slate-300 to-slate-200 p-4 rounded-md flex gap-3 items-center hover:shadow-md transition-transform ease-in delay-75 focus:shadow-md outline-none"
                                                href="/"
                                            >
                                                <Shirt size={20}/>
                                                teste
                                            </Link>
                                            <Link 
                                                className="bg-gradient-to-l from-slate-300 to-slate-200 p-4 rounded-md flex gap-3 items-center hover:shadow-md transition-transform ease-in delay-75 focus:shadow-md outline-none "
                                                href="/"
                                            >
                                                <Shirt size={20}/>
                                                teste
                                            </Link>
                                            <Link 
                                                className="bg-gradient-to-l from-slate-300 to-slate-200 p-4 rounded-md flex gap-3 items-center hover:shadow-md transition-transform ease-in delay-75 focus:shadow-md outline-none "
                                                href="/"
                                            >
                                                <Shirt size={20}/>
                                                teste
                                            </Link>
                                            <span className="col-span-2 text-slate-800">
                                                <NavigationMenuLink asChild>
                                                    <Link 
                                                        className="flex h-full w-full flex-col gap-2 justify-start rounded-md bg-gradient-to-t from-muted to-muted/80 p-4 no-underline outline-none focus:shadow-md"
                                                        href="/"
                                                    >
                                                        <div className="flex gap-3 text-slate-900">
                                                            <Shirt size={20}/>
                                                            <h1>Formal</h1>
                                                        </div>
                                                        <p className="font-base text-sm text-slate-800/60">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est ducimus totam, perferendis iusto repudiandae minus quod velit?</p>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </span>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <ul className="flex gap-0.5 text-sm">
                                    <Button
                                        className="rounded-md h-8 px-4 py-2 text-slate-900 bg-transparent hover:bg-accent/50"
                                    >
                                        <Link
                                            href="/new-arrivals"
                                        >
                                            New Arrivals
                                        </Link>
                                    </Button>
                                    <Button
                                        className="rounded-md h-8 px-4 py-2 text-slate-900 bg-transparent hover:bg-accent/50"
                                    >
                                        <Link
                                            href="/brands"
                                        >
                                            Brands
                                        </Link>
                                    </Button>
                                </ul>
                            </NavigationMenuList>
                    </NavigationMenu>

                    <div className="w-full grid grid-cols-3 items-center justify-end">
                        <div className="col-span-2 flex items-center justify-end">
                            <Input
                                className="w-2/3 rounded-3xl p-4 focus:outline-none text-slate-900 placeholder:text-slate-500 placeholder:focus:none tracking-wide"
                                placeholder="Search for products..."
                            />
                            <Search 
                                className="absolute mx-4 items-center text-slate-600/90"
                            />
                        </div>
                        <div className="col-span-1 flex items-center justify-end">
                            <HoverCard>
                                <HoverCardTrigger
                                    className="flex items-center gap-4"
                                >
                                    <UserCircle2 className="bg-transparent hover:cursor-pointer rounded-md size-5"/>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            className="bg-muted-foreground"
                                        >
                                            Sign In
                                        </Button>
                                        <Button
                                            className="bg-muted-foreground"
                                        >
                                            Sign Up
                                        </Button>
                                    </div>
                            </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
            </div>
        </div>      
    )
}