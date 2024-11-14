"use client"

import { useEffect, useState } from "react";
import { useAuth } from "@/hook/useAuth";
import { Pencil, Save } from "lucide-react";

import { Button } from "@/components/ui/button"
import { Nav } from "@/app/(profile)/components/nav";
import { Sidebar } from "@/app/(profile)/components/sidebar";
import { Loading } from "@/components/loading";

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
                                <div>
                                    <Button
                                        onClick={() => isFrontSide ? setIsFrontSide(false) : setIsFrontSide(true)}
                                    >
                                        switch
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