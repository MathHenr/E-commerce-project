"use client"

import { useEffect, useState } from "react";
import { useAuth } from "@/hook/useAuth";
import { Mail, Pencil, Save } from "lucide-react";

import { cn } from "@/lib/utils";
import { Address, CEP } from "@/lib/cep-api";
import { AddressSchema, createAdress } from "@/feature/users/create-address";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Nav } from "@/app/(profile)/components/nav";
import { Sidebar } from "@/app/(profile)/components/sidebar";
import { Loading } from "@/components/loading";

import { Username } from "../../components/username";

export default function Page () {
    const { user } = useAuth()
    const [disabled, setDisabled] = useState(true)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [userWrote, setUserWrote] = useState(false)
    
    const [houseNumber, setHouseNumber] = useState(0)
    const [cep, setCep] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    
    const inputs = {
        cep,
        street,
        city,
        state,
        neighborhood,
        number: houseNumber
    }
    
    useEffect (() => {
        async function load () {
            setIsLoading(true)
            if (user && user.addressTable !== null) {
                setCep(user.addressTable.cep)
                setCity(user.addressTable.city)
                setState(user.addressTable.state)
                setStreet(user.addressTable.street)
                setNeighborhood(user.addressTable.neighborhood)
                setHouseNumber(user.addressTable.number!)
            }
            setIsLoading(false)
        }
        load()
    }, [user])
    
    function setValuesCep (data: Address): void {
        setCep(data.cep)
        setCity(data.city)
        setState(data.state)
        setStreet(data.street)
        setNeighborhood(data.neighborhood)
        return
    }
    
    async function handleSearchCep () {
        setError('')
        const response = new CEP(cep)  
        const userCEP = await response.getCep()
        typeof userCEP === 'string'
            ? setError(userCEP)
            : setValuesCep(userCEP)
        return
    }
    
    async function handleSavingAddress () {
        if (houseNumber === 0) {
           toast.error("Insert your house number.")
           return null
        }

        if (userWrote) {
            try {
                verifyInputsValue()
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message)
                }
            }
        }

        const values: Address | null = {
            cep,
            street,
            city,
            state,
            neighborhood,
        }
        
        if (user === null || values === null) {
            toast.error("Input is missing.")
            return 
        }

        const addressToInsert = {
            ...values,
            customerId: 0,
            number: houseNumber,
        }

        try {
            await createAdress(addressToInsert, user)
            toast.success("Address successfully saved!")
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }
        setDisabled(true)
        return
    }
    
    function verifyInputsValue () {
        for (const key in inputs) {
            if (inputs.hasOwnProperty(key)) {
                const value = inputs[key as keyof AddressSchema]
                if (!value) {
                    toast.error(`${key} input is missing.`)
                    throw new Error(`${key} input is missing.`)
                }
            }
        }
    }
    
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
                                    onClick={() => handleSavingAddress()}
                                >
                                    <Save />
                                    Save changes
                                </Button>
                            )}
                        </div>
                        {isLoading ? (
                            <Loading/>
                        ) : (
                            <>
                                {/* profile form */}
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-1 w-full flex flex-col gap-8">
                                        <span>
                                            <p>
                                                CEP
                                            </p>
                                            <div className="flex gap-2">
                                                <Input 
                                                    className={cn("w-full focus-visible:ring-0 focus-visible:ring-offset-0 text-black text-base",
                                                        error ? `placeholder:text-red-600 bg-red-300/55` : 'placeholder:text-black bg-slate-300'
                                                    )}
                                                    disabled={disabled}
                                                    placeholder={error ? error : "Insert your cep here..."}
                                                    onChange={(e) => {
                                                        setUserWrote(true)
                                                        setCep(e.target.value)
                                                    }}
                                                    value={cep.replace(/(\d{5})(\d{3})/, '$1-$2')}
                                                />
                                                <Button
                                                    variant="change"
                                                    onClick={() => handleSearchCep()}
                                                >
                                                    Search CEP
                                                </Button>
                                            </div>
                                        </span>
        
                                        <span>
                                            <p>
                                                Street
                                            </p>
                                            <Input 
                                                className="w-full bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                                placeholder:text-black 
                                                text-black text-base"
                                                disabled={disabled}
                                                placeholder="Insert your street here..."
                                                onChange={(e) => {
                                                    setUserWrote(true)
                                                    setStreet(e.target.value)
                                                }}
                                                value={street}
                                            />
                                        </span>
        
                                        <span>
                                            <p>
                                                City
                                            </p>
                                            <Input 
                                                className="w-full bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                                placeholder:text-black 
                                                text-black text-base"
                                                disabled={disabled}
                                                placeholder="Insert your city here..."
                                                onChange={(e) => {
                                                    setUserWrote(true)
                                                    setCity(e.target.value)
                                                }}
                                                value={city}
                                            />
                                        </span>
                                    </div>
        
                                    <div className="col-span-1 w-full flex flex-col gap-8">
                                        <span>
                                            <p>
                                                State
                                            </p>
                                            <Input
                                                className="w-full bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                                placeholder:text-black 
                                                text-black text-base"
                                                disabled={disabled}
                                                placeholder="Insert your state here..."
                                                onChange={(e) => {
                                                    setUserWrote(true)
                                                    setState(e.target.value)
                                                }}
                                                value={state}
                                            />
                                        </span>
        
                                        <span>
                                            <p>
                                                Neighborhood
                                            </p>
                                            <Input 
                                                className="w-full bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                                placeholder:text-black 
                                                text-black text-base"
                                                disabled={disabled}
                                                placeholder="Insert your neighborhood here..."
                                                onChange={(e) => {
                                                    setUserWrote(true)
                                                    setNeighborhood(e.target.value)
                                                }}
                                                value={neighborhood}
                                            />
                                        </span>
        
                                        <span>
                                            <p>
                                                Number
                                            </p>
                                            <Input 
                                                className="w-full bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                                placeholder:text-black 
                                                text-black text-base"
                                                disabled={disabled}
                                                placeholder="Insert your house number here..."
                                                onChange={(e) => {
                                                    setUserWrote(true)
                                                    setHouseNumber(Number(e.target.value))
                                                }}
                                                value={houseNumber}
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
                                        {user?.email}
                                    </span>
                                </div>
                                <slot>
                                    <Button
                                        variant="change"
                                    >
                                        <Pencil />
                                        Edit email
                                    </Button>
                                </slot>
                            </>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}