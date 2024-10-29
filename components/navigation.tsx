import Link from "next/link"
import Image from "next/image"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu"
import { Shirt } from "lucide-react"

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
                            </NavigationMenuList>
                    </NavigationMenu>
            </div>
        </div>      
    )
}