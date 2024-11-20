"use client"

import { FormEvent, useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { toast } from "sonner";

import { useAuth } from "@/hook/useAuth";
import { Swicth } from "../components/swicth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function Page () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    
    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<boolean> {
        event.preventDefault();

        try {
            await login(email, password);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
                return false;
            }
        }
        
        return true;
    }
    
    return (
        <div className="min-h-screen font-poppins max-lg:py-8 grid grid-cols-1 lg:grid-cols-2">
            <div className="px-4 py-2 flex items-center justify-center">
                <div className="max-w-[600px] min-w-[450px] flex flex-col items-center justify-center p-4 gap-6 rounded-lg bg-slate-50 shadow-md">
                    <span className="flex flex-col gap-3 items-center justify-center px-4 py-2">
                        <Image height={180} width={180} src="/logo.svg" alt="Logo" />
                        <h1 className="text-lg font-semibold text-slate-900/95">
                            Sign in and find the best branded clothes
                        </h1>
                        <p className="text-xs text-center font-normal text-slate-800/75">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, voluptatem. Sunt reprehenderit doloribus facilis.
                        </p>
                    </span>

                    <div className="w-ful py-2 mx-auto">
                       <Swicth />
                    </div>
                    
                    <form onSubmit={handleSubmit} className="max-w-[350px] w-3/4 flex flex-col gap-2 transition-all ease-linear animate-[fadeRigth_ease-out_0.5s_forwards]">
                        <label className="text-base font-semibold tracking-wide flex flex-col">
                            Email
                            <Input 
                                type="email"
                                placeholder="Your Email"
                                className="w-full leading-1 rounded-none border-none bg-transparent tracking-wider text-base font-normal outline-none placeholder:text-xs placeholder:font-semibold focus-visible:ring-offset-0 focus-visible:ring-0"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="w-full h-px bg-slate-900" />
                        </label>
                        <label className="text-base font-semibold tracking-wide flex flex-col">
                            Password
                            <Input 
                                type="password"
                                placeholder="Your Password"
                                className="w-full leading-1 rounded-none border-none bg-transparent tracking-wider text-base font-normal outline-none placeholder:text-xs placeholder:font-semibold focus-visible:ring-offset-0 focus-visible:ring-0"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="w-full h-px bg-slate-900" />
                        </label>
                        <div className="flex gap-2 items-center justify-between mt-4">
                            <Button
                                className="w-full"
                            >
                                Sign In
                            </Button>
                            {/* <p className="my-0 text-sm font-semibold">
                                Or
                            </p> */}
                            <Button
                                className="flex items-center w-full"
                                onClick={() => signIn('google', { callbackUrl: '/profile' })}
                            >
                                Sign-in with
                                <FontAwesomeIcon icon={faGoogle} />
                            </Button>
                        </div>
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