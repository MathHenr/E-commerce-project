"use client"

import { FormEvent, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { UserRegistrationFunction } from "@/feature/users/services/UserValidationService"
import { createUserFactory } from "@/feature/modules/createUser/CreateUserFactory"

import { toast } from "sonner"

import { Swicth } from "../components/swicth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User } from "@/feature/entities/User"

export default function Page () {
    const [firstName, setFirtName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter()
    
    function verifyPasswords () {
        return password === confirmPassword
    }
    
    function redirectUser (message: string) {
        toast.success(message);
        router.push("/");
    }
    
    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        
        // verify if passwords match
        if (!verifyPasswords()) {
            toast.error("Passwords don't match, please fix it", {
                duration: 5000,
            });
            return
        }

        // validating user's data, return an array -> ex: [false, "Password must have 6 digits."]
        const data: User = {
            firstName,
            lastName,
            email,
            cpf,
            password,
        }
        
        try {
            const createUser = await createUserFactory();
            await createUser.exec(data);
        } catch (error) {
            if (error instanceof Error) {
                // toast.error(error.message);
                throw new Error(error.message)
            }
        }
        
        redirectUser("User created successfully.");
        return;
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

                    <div className="w-ful py-2 mx-auto">
                       <Swicth />
                    </div>
                    
                    <form onSubmit={handleSubmit} className="max-w-[350px] w-3/4 flex flex-col gap-2 transition-all ease-linear animate-[fadeLeft_ease-out_0.5s_forwards]">
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
                                onChange={(e) => setConfirmPassword(e.target.value)}
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