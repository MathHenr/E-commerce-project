"use client"

import { useEffect, useState } from "react";
import { useAuth } from "@/hook/useAuth";
import { CirclePlus, Pencil, Save } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"

import { Sidebar } from "@/app/(profile)/components/sidebar";
import { Loading } from "@/components/loading";
import { Nav } from "@/app/(profile)/components/nav";
import { Username } from "../../components/username";
import { Card } from "@/app/(profile)/components/credit-card";

export default function Page () {
    const { user } = useAuth()
    const [disabled, setDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [isFrontSide, setIsFrontSide] = useState(false) // set sides of credit card component

    useEffect(() => {
        async function load () {
            setIsLoading(true)
            setIsLoading(false)
        }
        load()
    })

    function handleEdit () {
        disabled ? setDisabled(false) : setDisabled(true)
    }

    function flipCard () {
        return isFrontSide ? setIsFrontSide(false) : setIsFrontSide(true)
    }
    
    return (
        <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-12">
            <div className="hidden md:grid col-span-1">
                <Sidebar />
            </div>
            <div className="flex flex-col col-span-11 font-poppins">
                <Nav firstName={user?.firstName} lastName={user?.lastName} />
                
                <div className="h-full px-4 py-2">
                    <section className="bg-zinc-100 h-full rounded-md shadow-[7px_-3px_35px_-24px_rgba(0,0,0,0.75)] p-6 flex flex-col gap-10">
                        {/* profile header */}
                        <div className="w-full flex items-center justify-between">
                            <Username firstName={user?.firstName} lastName={user?.lastName} />
                            
                            {disabled ? (
                                <Button
                                    variant="change"
                                    onClick={() => handleEdit()}
                                >
                                    <Pencil />
                                    Edit
                                </Button>
                            ) : (
                                <Button
                                    variant="change"
                                    onClick={() => handleEdit()}
                                >
                                    <Save />
                                    Save changes
                                </Button>
                            )}
                        </div>
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <section className="grid grid-cols-1 lg:grid-cols-2">
                                <Card flip={isFrontSide}/>
                                <div className="col-span-1 flex flex-col gap-3 items-center justify-center">
                                    <div className="w-4/5 flex gap-3">
                                        <label className="w-full">
                                            <h1 className="text-base font-medium antialiased">
                                                Card Holder
                                            </h1>
                                            <Input
                                                className="w-full bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                                placeholder:text-black/65 text-black text-base"
                                                placeholder="Insert card holder name here..."
                                            />
                                        </label>

                                        <label className="w-3/5">
                                            <h1 className="text-base font-medium antialiased">
                                                Expiration Date
                                            </h1>
                                            <Input
                                                className="bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                                placeholder:text-black/65 placeholder:text-sm text-black text-base"
                                                placeholder="Insert your card expiration date here..."
                                            />
                                        </label>
                                    </div>

                                    <div className="w-4/5 flex gap-3">
                                        <label className="w-full">
                                            <h1 className="text-base font-medium antialiased">
                                                Card Number
                                            </h1>
                                            <Input
                                                className="w-full bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                                placeholder:text-black/65 text-black text-base"
                                                placeholder="Insert card holder name here..."
                                            />
                                        </label>

                                        <label className="w-3/5">
                                            <h1 className="text-base font-medium antialiased">
                                                CVV/CVC
                                            </h1>
                                            <Input
                                                className="bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                                placeholder:text-black/65 placeholder:text-sm text-black text-base"
                                                placeholder="Insert your card expiration date here..."
                                            />
                                        </label>
                                    </div>
                                    
                                    <Button
                                        className="mt-12"
                                        onClick={() => isFrontSide ? setIsFrontSide(false) : setIsFrontSide(true)}
                                    >
                                        <CirclePlus />
                                        Add card
                                    </Button>
                                </div>
                            </section>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}