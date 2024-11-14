"use client"

import { useEffect, useState } from "react";
import { useAuth } from "@/hook/useAuth";
import { CirclePlus, Pencil, Save } from "lucide-react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"

import { Sidebar } from "@/app/(profile)/components/sidebar";
import { Loading } from "@/components/loading";
import { Nav } from "@/app/(profile)/components/nav";
import { Username } from "@/app/(profile)/components/username";
import { Card } from "@/app/(profile)/components/credit-card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {
    Form,
    FormField,
    FormLabel,
    FormMessage,
    FormItem
} from "@/components/ui/form"


const FormSchema = z.object({
    card_provider: z.string({ required_error: "Please select your card provider." }),
    card_holder: z.string({ required_error: "Please enter the cardholder's name." }),
    expiration_date: z.string({ required_error: "Please enter the card expiration date." }),
    card_number: z.string({ required_error: "Please enter the card number." }),
    cvv: z.string({ required_error: "Please enter cvv/cvc number." })
})

export default function Page () {
    const { user } = useAuth()
    const [disabled, setDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [isFrontSide, setIsFrontSide] = useState(false) // set sides of credit card component

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    
    useEffect(() => {
        async function load () {
            setIsLoading(true)
            setIsLoading(false)
        }
        load()
    })

    function handleEdit () {
        // disabled ? setDisabled(false) : setDisabled(true)
    }

    function flipCard () {
        return isFrontSide ? setIsFrontSide(false) : setIsFrontSide(true)
    }

    function onSubmit (data: z.infer<typeof FormSchema>) {
        console.log(data)
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

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5 flex flex-col gap-3">
                                        <FormField 
                                            control={form.control}
                                            name="card_provider"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="w-4/5">
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select your card provider." />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem  value="visa">
                                                                    <span>
                                                                        <Image src="/card-providers/visa_logo.svg" alt="Visa" height={56} width={56}/>
                                                                    </span>
                                                                </SelectItem>
                                                                <SelectItem value="mastercard">
                                                                    <span>
                                                                        <Image src="/card-providers/mastercard_logo.svg" alt="Mastercard" height={56} width={56}/>
                                                                    </span>
                                                                </SelectItem>
                                                                <SelectItem value="paypal">
                                                                    <span>
                                                                        <Image src="/card-providers/paypal_logo.svg" alt="Paypal" height={56} width={56}/>
                                                                    </span>
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormLabel>
                                                    <FormMessage className="text-sm text-red-500/90"/>
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex gap-3">
                                            <FormField 
                                                control={form.control}
                                                name="card_holder"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>
                                                            <h1 className="text-base font-medium antialiased">
                                                                {"Cardholder's name"}
                                                            </h1>
                                                            <Input
                                                                className="w-full bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                                                placeholder:text-black/65 text-black text-base"
                                                                placeholder="Insert card holder name here..."
                                                            />
                                                        </FormLabel>
                                                        <FormMessage className="text-sm text-red-500/90"/>
                                                    </FormItem>  
                                                )}
                                            />
                                            <FormField 
                                                control={form.control}
                                                name="expiration_date"
                                                render={({ field }) => (
                                                    <FormItem className="w-2/5">
                                                        <FormLabel>
                                                            <h1 className="text-base font-medium antialiased">
                                                                Expiration Date
                                                            </h1>
                                                            <Input
                                                                className="w-full bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                                                placeholder:text-black/65 text-black text-base"
                                                                placeholder="Insert card holder name here..."
                                                            />
                                                        </FormLabel>
                                                        <FormMessage className="text-sm text-red-500/90"/>
                                                    </FormItem> 
                                                )}
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <FormField 
                                                control={form.control}
                                                name="card_number"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>
                                                            <h1 className="text-base font-medium antialiased">
                                                                Card Number
                                                            </h1>
                                                            <Input
                                                                className="w-full bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                                                placeholder:text-black/65 text-black text-base"
                                                                placeholder="Insert card holder name here..."
                                                            />
                                                        </FormLabel>
                                                        <FormMessage className="text-sm text-red-500/90"/>
                                                    </FormItem> 
                                                )}
                                            />
                                            <FormField 
                                                control={form.control}
                                                name="cvv"
                                                render={({ field }) => (
                                                    <FormItem className="w-2/5">
                                                        <FormLabel>
                                                            <h1 className="text-base font-medium antialiased">
                                                                CVV/CVC
                                                            </h1>
                                                            <Input
                                                                className="w-full bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                                                placeholder:text-black/65 text-black text-base"
                                                                placeholder="Insert card holder name here..."
                                                            />
                                                        </FormLabel>
                                                        <FormMessage className="text-sm text-red-500/90"/>
                                                    </FormItem> 
                                                )}
                                            />
                                        </div>
                                        <Button
                                            className="mx-auto mt-12"
                                            onClick={() => isFrontSide ? setIsFrontSide(false) : setIsFrontSide(true)}
                                        >
                                            <CirclePlus />
                                            Add card
                                        </Button>
                                    </form>
                                </Form>
                                </div>
                            </section>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}