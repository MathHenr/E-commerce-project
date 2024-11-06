"use client"

import { FormEvent, useState } from "react"
import Image from "next/image"

import { createUser } from "@/feature/users/create-user"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function Page () {
    const [firstName, setFirtName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [cpf, setCpf] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const fields = [
        {
            name: "First Name",
            var: firstName,
        },
        {
            name: "Last Name",
            var: lastName,
        },
        {
            name: "Email",
            var: email,
        },
        {
            name: "CPF",
            var: cpf,
        },
        {
            name: "Password",
            var: password,
        },
    ] 

    const errors = []
    
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        fields.map((field) => {
            if (field?.var.length === 0) {
                toast.error(`Please fill out the ${field.name} field`)
                throw new Error("Empty fields")
            }
        })
        const results = await createUser({
            firstName, 
            lastName, 
            email,
            cpf,
            password,
        })
        results.ok ? toast.success(results.message) : toast.error(results.message)
        return
    }
    
    return (
        <div className="min-h-screen font-poppins max-lg:py-8 grid grid-cols-1 lg:grid-cols-2">
            <div className="px-4 py-2 flex items-center justify-center">
                <div className="max-w-[600px] min-w-[450px] flex flex-col items-center justify-center p-4 gap-6 rounded-lg bg-slate-50 shadow-md">
                    <span className="flex flex-col gap-3 items-center justify-center px-4 py-2">
                        <Image height={180} width={180} src="/logo.svg" alt="Logo" />
                        <h1 className="text-lg font-semibold text-slate-900/95">
                            Sign up and wear the best brands
                        </h1>
                        <p className="text-xs text-center font-normal text-slate-800/75">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, voluptatem. Sunt reprehenderit doloribus facilis.
                        </p>
                    </span>
                    <form onSubmit={handleSubmit} className="max-w-[350px] w-3/4 flex flex-col gap-2">
                        <label className="text-base font-semibold tracking-wide flex flex-col">
                            First Name
                            <Input
                                placeholder="Tell us your first name"
                                className="w-full leading-1 rounded-none border-none bg-transparent tracking-wider text-base font-normal outline-none placeholder:text-xs placeholder:font-semibold focus-visible:ring-offset-0 focus-visible:ring-0"
                                onChange={(e) => setFirtName(e.target.value)}
                            />
                            <div className="w-full h-px bg-slate-900" />
                        </label>
                        <label className="text-base font-semibold tracking-wide flex flex-col">
                            Last Name
                            <Input 
                                placeholder="Tell us your last name"
                                className="w-full leading-1 rounded-none border-none bg-transparent tracking-wider text-base font-normal outline-none placeholder:text-xs placeholder:font-semibold focus-visible:ring-offset-0 focus-visible:ring-0"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <div className="w-full h-px bg-slate-900" />
                        </label>
                        <label className="text-base font-semibold tracking-wide flex flex-col">
                            Email
                            <Input 
                                type="email"
                                placeholder="Tell us your email address"
                                className="w-full leading-1 rounded-none border-none bg-transparent tracking-wider text-base font-normal outline-none placeholder:text-xs placeholder:font-semibold focus-visible:ring-offset-0 focus-visible:ring-0"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="w-full h-px bg-slate-900" />
                        </label>
                        <label className="text-base font-semibold tracking-wide flex flex-col">
                            CPF
                            <Input 
                                placeholder="Enter your cpf here"
                                className="w-full leading-1 rounded-none border-none bg-transparent tracking-wider text-base font-normal outline-none placeholder:text-xs placeholder:font-semibold focus-visible:ring-offset-0 focus-visible:ring-0"
                                onChange={(e) => setCpf(e.target.value)}
                            />
                            <div className="w-full h-px bg-slate-900" />
                        </label>
                        <label className="text-base font-semibold tracking-wide flex flex-col">
                            Password
                            <Input 
                                type="password"
                                placeholder="Put your secret key"
                                className="w-full leading-1 rounded-none border-none bg-transparent tracking-wider text-base font-normal outline-none placeholder:text-xs placeholder:font-semibold focus-visible:ring-offset-0 focus-visible:ring-0"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="w-full h-px bg-slate-900" />
                        </label>
                        <label className="text-base font-semibold tracking-wide flex flex-col">
                            Confirm Password
                            <Input 
                                type="password"
                                placeholder="Confirm your secret key"
                                className="w-full leading-1 rounded-none border-none bg-transparent tracking-wider text-base font-normal outline-none placeholder:text-xs placeholder:font-semibold focus-visible:ring-offset-0 focus-visible:ring-0"
                            />
                            <div className="w-full h-px bg-slate-900" />
                        </label>
                        <Button
                            className="mx-auto mt-4"
                        >
                            Sign up
                        </Button>
                    </form>
                </div>
            </div>

            <div className="max-lg:hidden p-4 min-h-screen relative">
                <div className="h-full bg-slate-600/95 rounded-md shadow-md flex justify-center items-center px-5">
                    <h1 className="-mt-[520px] text-center text-slate-100">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, itaque. Rerum, nisi perspiciatis numquam harum consequatur.
                    </h1>
                    <Image 
                        className="absolute bottom-4 drop-shadow-xl"
                        height={500} width={500} src="/model_1.png" alt="Model" 
                    />
                </div>
            </div>
        </div>
    )
}