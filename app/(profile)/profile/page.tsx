"use client"

import { useEffect, useState } from "react";
import { Eye, EyeClosed, Mail, Pencil, Save } from "lucide-react";

import { getUserData } from "@/feature/profile/user-data"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Nav } from "@/app/(profile)/components/nav";
import { Loading } from "@/components/loading";
import { Sidebar } from "@/app/(profile)/components/sidebar";

export default function Page () {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCPF] = useState('')
    const [cep, setCEP] = useState<string | null>(null)
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [isEyeClosed, setIsEyeClosed] = useState(true)
    

    useEffect(() => {
        async function fillInputWithData() {
            setLoading(true)
            const response = await getUserData()

            if (typeof response === null || !response?.user) {
                setLoading(false)
                return console.log("Failed to fetch")
            }

            setFirstName(response.user.firstName)
            setLastName(response.user.lastName)
            setEmail(response.user.email)
            setCPF(response.user.cpf)
            setCEP(response.user.cep)
            setLoading(false)
        }
        fillInputWithData()
    } ,[])
    
    function handleEdit () {
        disabled ? setDisabled(false) : setDisabled(true)
    }
    
    return (
        <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-12">
            <div className="hidden md:grid col-span-1">
                <Sidebar />
            </div>
            <div className="flex flex-col col-span-11 font-poppins">
                <Nav firstName={firstName} lastName={lastName}/>
                
                <div className="h-full px-4 py-2">
                    <section className="bg-zinc-100 h-full rounded-md shadow-[7px_-3px_35px_-24px_rgba(0,0,0,0.75)] p-6 flex flex-col gap-10">
                        {loading ? (
                            <Loading />
                        ) : (
                            <>
                                {/* profile header */}
                                <div className="w-full flex items-center justify-between">
                                    <div className="flex gap-3 items-center">
                                        <div className="size-[100px] bg-slate-700 rounded-full shadow-sm hover:drop-shadow-xl hover:scale-105 transition-all ease-linear"/>
                                        <span>
                                            {`${firstName.charAt(0).toUpperCase().concat(firstName.slice(1))} 
                                            ${lastName.charAt(0).toUpperCase().concat(lastName.slice(1))}`}
                                        </span>
                                    </div>
                                    { disabled ? (
                                        <Button
                                            className="w-auto px-8 rounded-md bg-slate-400/40 text-slate-900/65 font-semibold border-2 hover:text-slate-50 border-slate-600/95 transition-all ease-linear"
                                            onClick={() => handleEdit()}
                                        >
                                            <Pencil />
                                            Edit
                                        </Button>
                                    ) : (
                                        <Button
                                            className="w-auto px-8 rounded-md bg-slate-400/40 text-slate-900/65 font-semibold border-2 hover:text-slate-50 border-slate-600/95 transition-all ease-linear"
                                            onClick={() => handleEdit()}
                                        >
                                            <Save />
                                            Save changes
                                        </Button>
                                        )}
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
                                                placeholder="Insert your info here..."
                                                value={firstName 
                                                    ? firstName.charAt(0).toUpperCase().concat(firstName.slice(1)) // Coloca 1ª letra UpperCase
                                                    : ''}
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
                                                placeholder="Insert your info here..."
                                                value={lastName 
                                                    ? lastName.charAt(0).toUpperCase().concat(lastName.slice(1)) 
                                                    : ''}
                                            />
                                        </span>

                                        <span>
                                            <p>
                                                CPF
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <Input 
                                                    className="w-full bg-slate-300 focus-visible:ring-0 focus-visible:ring-offset-0
                                                    placeholder:text-black 
                                                    text-black text-base"
                                                    disabled={disabled}
                                                    placeholder="Insert your info here..."
                                                    value={cpf && isEyeClosed 
                                                        ? `${cpf.slice(0, 2)}.***.***-${cpf.slice(-2)}` 
                                                        : !isEyeClosed 
                                                            ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, `$1.$2.$3-$4`)
                                                            : ''}
                                                />
                                                <Button
                                                    className="w-auto rounded-md bg-slate-400/40 text-slate-900/65 font-semibold border-2 hover:text-slate-50 border-slate-600/95 transition-all ease-linear"
                                                    onClick={() => isEyeClosed ? setIsEyeClosed(false) : setIsEyeClosed(true)}
                                                >
                                                    {isEyeClosed ? (
                                                        <EyeClosed size={24} />
                                                    ) : (
                                                        <Eye size={24} />
                                                    )}
                                                </Button>
                                            </div>
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
                                                placeholder="Insert your info here..."
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
                                                placeholder="Insert your info here..."
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
                                                placeholder="Insert your info here..."
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
                                        {email}
                                    </span>
                                </div>
                                <slot>
                                    <Button
                                        className="w-auto px-8 rounded-md bg-slate-400/40 text-slate-900/65 font-semibold border-2 hover:text-slate-50 border-slate-600/95 transition-all ease-linear"
                                    >
                                        <Pencil />
                                        Edit email
                                    </Button>
                                </slot>
                            </>
                        ) }
                        
                    </section>  
                </div>
            </div>
        </div>
    )
}