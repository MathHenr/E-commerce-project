"use client"

import { useState } from "react";
import { Mail } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Nav } from "@/app/(profile)/components/nav";
import { Sidebar } from "@/app/(profile)/components/sidebar";

export default function Page () {
    const [disabled, setDisabled] = useState(true)

    function handleEdit () {
        disabled ? setDisabled(false) : setDisabled(true)
    }
    
    return (
        <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-12">
            <div className="hidden md:grid col-span-1">
                <Sidebar />
            </div>
            <div className="flex flex-col col-span-11 font-poppins">
                <Nav />
                
                <div className="h-full px-4 py-2">
                    <section className="bg-zinc-100 h-full rounded-md shadow-[7px_-3px_35px_-24px_rgba(0,0,0,0.75)] p-6 flex flex-col gap-10">
                        {/* profile header */}
                        <div className="w-full flex items-center justify-between">
                            <div className="flex gap-3 items-center">
                                <div className="size-[100px] bg-slate-700 rounded-full shadow-sm hover:drop-shadow-xl hover:scale-105 transition-all ease-linear"/>
                                <span>
                                    Username
                                </span>
                            </div>
                            <Button
                                className="w-auto px-8 rounded-md bg-slate-400/40 text-slate-900/65 font-semibold border-2 hover:text-slate-50 border-slate-600/95 transition-all ease-linear"
                                onClick={() => handleEdit()}
                            >
                                Edit 
                            </Button>
                        </div>
                        {/* profile form */}
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-1 w-full flex flex-col gap-8">
                                <span>
                                    <p>
                                        First Name
                                    </p>
                                    <Input 
                                        className="w-full bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                        placeholder:text-black 
                                        text-black text-base"
                                        disabled={disabled}
                                        placeholder="Seu nome esta aqui"
                                    />
                                </span>

                                <span>
                                    <p>
                                        Last Name
                                    </p>
                                    <Input 
                                        className="w-full bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                        placeholder:text-black 
                                        text-black text-base"
                                        disabled={disabled}
                                        placeholder="Seu nome esta aqui"
                                    />
                                </span>

                                <span>
                                    <p>
                                        CPF
                                    </p>
                                    <Input 
                                        className="w-full bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                        placeholder:text-black 
                                        text-black text-base"
                                        disabled={disabled}
                                        placeholder="Seu nome esta aqui"
                                    />
                                </span>
                            </div>

                            <div className="col-span-1 w-full flex flex-col gap-8">
                                <span>
                                    <p>
                                        Password
                                    </p>
                                    <Input
                                        type="password"
                                        className="w-full bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                        placeholder:text-black 
                                        text-black text-base"
                                        disabled={disabled}
                                        placeholder="Seu nome esta aqui"
                                    />
                                </span>

                                <span>
                                    <p>
                                        New Password
                                    </p>
                                    <Input 
                                        type="password"
                                        className="w-full bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                        placeholder:text-black 
                                        text-black text-base"
                                        disabled={disabled}
                                        placeholder="Seu nome esta aqui"
                                    />
                                </span>

                                <span>
                                    <p>
                                        Confirm New Password
                                    </p>
                                    <Input 
                                        type="password"
                                        className="w-full bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                        placeholder:text-black 
                                        text-black text-base"
                                        disabled={disabled}
                                        placeholder="Seu nome esta aqui"
                                    />
                                </span>

                            </div>
                        </div>
                        {/* profile email */}
                        <div className=" w-full flex items-center justify-start gap-3">
                            <div className="size-[50px] flex items-center justify-center rounded-full bg-blue-500/65">
                                <Mail className="text-slate-200/95"/>
                            </div>
                            <span>
                                your@email.com
                            </span>
                        </div>
                        <slot>
                            <Button
                                className="w-auto px-8 rounded-md bg-slate-400/40 text-slate-900/65 font-semibold border-2 hover:text-slate-50 border-slate-600/95 transition-all ease-linear"
                            >
                                Edit email
                            </Button>
                        </slot>
                    </section>
                </div>
            </div>
        </div>
    )
}