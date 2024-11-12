"use client"

import Link from "next/link"
import Image from "next/image"

import { useEffect, useState } from "react"
import { useMedia } from "react-use"
import { useRouter, usePathname } from "next/navigation"

import { Menu, Search, Shirt } from "lucide-react"

import { UserIcon } from "@/components/user-icon"
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
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { getUserData } from "@/feature/profile/get-user-data"


const routes = [
    {
        href: "/shop",
        label: "Shop",
    },
    {
        href: "/on-sale",
        label: "On Sale",
    },
    {
        href: "/new-arrivals",
        label: "New Arrivals",
    },
    {
        href: "/brands",
        label: "Brands",
    },
]

export const Navigation = () => {
    const [firstName, setFirstName] = useState('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const isMobile = useMedia("(max-width: 1024px)", false)
    const pathname = usePathname()
    const router = useRouter()
    
    const onClick = (href: string): void => {
        router.push(href)
        setIsOpen(false)
        return
    }

    useEffect(() => {
        async function getUser () {
            const userData = await getUserData()

            if (!userData) {
                throw new Error('deu erro')
            }

            setFirstName(userData.user!.firstName)
        }
        getUser()
    }, [])
    
    if (isMobile) {
       return (
        <div className="bg-default flex justify-between px-4 py-2 font-poppins">
            <div className="flex gap-4">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger>
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-md h-8 px-4 py-2 bg-slate-300 bg-muted hover:bg-slate-300/85 border-none"
                        >
                            <Menu className="text-slate-900 size-4"/>
                        </Button>
                    </SheetTrigger>
                    <Image
                        className="w-56 lg:w-[200px]"
                        height={200}
                        width={200} 
                        src="/logo.svg" 
                        alt="Logo"
                    />
                    <SheetContent side="left" className="px-2 flex flex-col items-center gap-y-8 focus-visible:outline-none focus-visible:ring-offset-0 focus:ring-0">
                        <Image
                            className="w-56 lg:w-[200px]"
                            height={200}
                            width={200} 
                            src="/logo.svg" 
                            alt="Logo"
                        />
                        <nav className="flex flex-col w-full gap-y-2 pt-8">
                            {routes.map((route) => (
                                <Button
                                    key={route.href}
                                    variant={route.href === pathname ? "secondary" : "ghost"}
                                    className="bg-muted-foreground w-full rounded-md text-slate-200 focus:shadow-md hover:bg-muted-foreground/80 font-normal font-poppins"
                                    onClick={() => onClick(route.href)}
                                >
                                    {route.label}
                                </Button>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
            <UserIcon />
        </div>
       )
    }
    
    return (
        <div className="bg-white shadow-md font-poppins">
            <div className="max-w-screen-2xl mx-auto px-4 py-2 flex space-x-2">
                    <Image
                        className="w-56 lg:w-[200px]"
                        height={200}
                        width={200} 
                        src="/logo.svg" 
                        alt="Logo"
                    />
                    <div className="lg:flex hidden items-center">
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
                                                <div className="row-span-3 text-slate-800">
                                                    <NavigationMenuLink asChild>
                                                        <Link 
                                                            className="flex h-full w-full flex-col gap-2 justify-start rounded-md bg-gradient-to-t from-muted to-muted/80 p-4 no-underline outline-none focus:shadow-md"
                                                            href="/"
                                                        >
                                                            <div className="flex gap-3 text-slate-900">
                                                                <Shirt size={20}/>
                                                                <h1>Formal</h1>
                                                            </div>
                                                            <p className="font-base text-sm text-slate-800/60">
                                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est ducimus totam, perferendis iusto repudiandae minus quod velit?
                                                            </p>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </div>
                                                <Link 
                                                    className="bg-gradient-to-l from-slate-300 to-slate-200 p-4 rounded-md flex gap-3 items-center hover:shadow-md transition-transform ease-in delay-75 focus:shadow-md outline-none text-sm"
                                                    href="/"
                                                >
                                                    <Shirt size={20}/>
                                                    teste
                                                </Link>
                                                <Link 
                                                    className="bg-gradient-to-l from-slate-300 to-slate-200 p-4 rounded-md flex gap-3 items-center hover:shadow-md transition-transform ease-in delay-75 focus:shadow-md outline-none text-sm"
                                                    href="/"
                                                >
                                                    <Shirt size={20}/>
                                                    teste
                                                </Link>
                                                <Link 
                                                    className="bg-gradient-to-l from-slate-300 to-slate-200 p-4 rounded-md flex gap-3 items-center hover:shadow-md transition-transform ease-in delay-75 focus:shadow-md outline-none text-sm "
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
                                                    className="bg-gradient-to-l from-slate-300 to-slate-200 p-4 rounded-md flex gap-3 items-center hover:shadow-md transition-transform ease-in delay-75 focus:shadow-md outline-none text-sm"
                                                    href="/"
                                                >
                                                    <Shirt size={20}/>
                                                    teste
                                                </Link>
                                                <Link 
                                                    className="bg-gradient-to-l from-slate-300 to-slate-200 p-4 rounded-md flex gap-3 items-center hover:shadow-md transition-transform ease-in delay-75 focus:shadow-md outline-none text-sm"
                                                    href="/"
                                                >
                                                    <Shirt size={20}/>
                                                    teste
                                                </Link>
                                                <Link 
                                                    className="bg-gradient-to-l from-slate-300 to-slate-200 p-4 rounded-md flex gap-3 items-center hover:shadow-md transition-transform ease-in delay-75 focus:shadow-md outline-none text-sm "
                                                    href="/"
                                                >
                                                    <Shirt size={20}/>
                                                    teste
                                                </Link>
                                                <Link 
                                                    className="bg-gradient-to-l from-slate-300 to-slate-200 p-4 rounded-md flex gap-3 items-center hover:shadow-md transition-transform ease-in delay-75 focus:shadow-md outline-none text-sm "
                                                    href="/"
                                                >
                                                    <Shirt size={20}/>
                                                    teste
                                                </Link>
                                                <div className="col-span-2 text-slate-800">
                                                    <NavigationMenuLink asChild>
                                                        <Link 
                                                            className="flex h-full w-full flex-col gap-2 justify-start rounded-md bg-gradient-to-t from-muted to-muted/80 p-4 no-underline outline-none focus:shadow-md"
                                                            href="/"
                                                        >
                                                            <div className="flex gap-3 text-slate-900">
                                                                <Shirt size={20}/>
                                                                <h1>Formal</h1>
                                                            </div>
                                                            <p className="font-base text-sm text-slate-800/60">
                                                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est ducimus totam, perferendis iusto repudiandae minus quod velit?
                                                            </p>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </div>
                                            </div>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                    <ul className="flex gap-0.5 text-sm">
                                        <Link
                                            href="/new-arrivals"
                                        >
                                            <Button
                                                className="rounded-md h-8 px-4 py-2 text-slate-900 bg-transparent hover:bg-accent/50"
                                            >
                                                New Arrivals
                                            </Button>
                                        </Link>
                                        <Link
                                            href="/brands"
                                        >
                                            <Button
                                                className="rounded-md h-8 px-4 py-2 text-slate-900 bg-transparent hover:bg-accent/50"
                                            >
                                                Brands
                                            </Button>
                                        </Link>
                                    </ul>
                                </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="w-full grid grid-cols-1 lg:grid-cols-3 items-center justify-end">
                        <form action="" className="col-span-2 lg:flex hidden justify-end">
                            <div className="w-2/3 flex items-center justify-center bg-default rounded-3xl border border-slate-800">
                                <Input
                                    className="w-full rounded-3xl p-4 border-none bg-default focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-slate-900 placeholder:text-slate-500 tracking-wide "
                                    placeholder="Search for products..."
                                />
                                <Search 
                                    className="mx-4 text-slate-600/90"
                                />
                            </div>
                        </form>
                        <div className="col-span-1 flex gap-3 items-center justify-end">
                            <span className="text-sm antialiased font-normal">
                                {firstName ? firstName : ''}
                            </span>
                            <UserIcon />
                        </div>
                    </div>
            </div>
        </div>      
    )
}