"use client"

import { ChangeEvent, FormEvent, useState } from "react"

import Link from "next/link"
import Image from "next/image"

import { Facebook, Github, Instagram, Linkedin, Mail, } from "lucide-react"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export const Footer = () => {
    const [email, setEmail] = useState<string>('');

    function handleSubmit (event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        return email.length > 0 ? toast.success("Registration Success") : toast.error("Registration Failed")
        // TODO: Register email to db
    };

    function handleEmail (event: ChangeEvent<HTMLInputElement>) {
        return setEmail(event.target.value);
    };
    
    return (
        <div className="w-full px-4 py-2 bg-slate-500/25 space-y-8 last-of-type:space-y-0">
            <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 max-md:grid-rows-2 items-center md:justify-evenly px-16 py-9 md:-mt-[90px] -mt-[128px] bg-slate-900 rounded-2xl shadow-sm">
                <h1
                    className="md:col-span-1 max-md:row-span-1 xl:text-6xl lg:text-5xl text-4xl xl:font-bold font-extrabold font-fantasy md:text-start text-center text-white"
                >
                    STAY UPTO DATE ABOUT OUR LATEST OFFERS
                </h1>
                {/* Form Newsletter */}
                <div className="md:col-span-1 max-md:row-span-1 max-md:mt-2 items-center justify-end">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full md:items-end items-center gap-4">
                        <label
                            htmlFor="email"
                            className="relative flex items-center"
                        >
                            <Mail 
                                className="absolute right-0 mr-4 text-slate-500 size-6"
                            />
                            <input 
                                type="email" 
                                className="md:w-[340px] max-md:w-[298px] py-2 px-4 pr-12 rounded-full focus:outline-none focus-visible:ring-offset-0 focus:ring-0" 
                                placeholder="Enter your email adress"
                                onChange={handleEmail}
                            />
                        </label>
                        <Button
                            
                            className="md:min-w-[340px] min-w-[298px] w-min bg-white text-slate-800 p-3 rounded-full text-base font-semibold font-poppins hover:text-slate-300 hover:bg-slate-700"
                        >
                            Subscribe to Newsletter
                        </Button>
                    </form>
                </div>
            </div>
            <div className="max-w-screen-2xl mx-auto grid grid-cols-2 justify-items-stretch max-md:gap-3 md:grid-cols-5 border-b border-slate-600 py-4">
                {/* footer component */}
                <div className="max-md:col-span-2 flex flex-col pt-0.5 gap-4">
                    <Image height={130} width={130} src="/logo.svg" alt="Logo" />
                    <p className="text-xs w-3/4 text-slate-600">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                    <div className="w-full flex gap-3">
                        <span className="p-1.5 bg-slate-200 rounded-full hover:bg-slate-900 hover:cursor-pointer border-slate-900 group">
                            <Link target="_blank" href="https://www.linkedin.com/in/matheus-henrique-sobrinho-987831188/">
                                <Linkedin size={16} className="group-hover:text-slate-200" />
                            </Link>
                        </span>
                        <span className="p-1.5 bg-slate-200 rounded-full hover:bg-slate-900 hover:cursor-pointer border-slate-900 group">
                            <Link href="#">
                                <Facebook size={16} className="group-hover:text-slate-200" />
                            </Link>
                        </span>
                        <span className="p-1.5 bg-slate-200 rounded-full hover:bg-slate-900 hover:cursor-pointer border-slate-900 group">
                            <Link href="#">
                                <Instagram size={16} className="group-hover:text-slate-200" />
                            </Link>
                        </span>
                        <span className="p-1.5 bg-slate-200 rounded-full hover:bg-slate-900 hover:cursor-pointer border-slate-900 group">
                            <Link target="_blank" href="https://github.com/MathHenr">
                                <Github size={16} className="group-hover:text-slate-200" />
                            </Link>
                        </span>
                    </div>
                </div>
                {/* company */}
                <div className="flex flex-col">
                    <h2 className="font-poppins text-sm">
                        COMPANY
                    </h2>
                    <span className="flex flex-col h-full justify-around text-sm gap-0.5 text-slate-600">
                        <Link className="hover:underline" href="/about">
                            About
                        </Link>
                        <Link className="hover:underline" href="/">
                            Features
                        </Link>
                        <Link className="hover:underline" href="/">
                            Works
                        </Link>
                        <Link className="hover:underline" href="/">
                            Career
                        </Link>
                    </span>
                </div>
                {/* help */}
                <div className="flex flex-col">
                    <h2 className="font-poppins text-sm">
                        HELP
                    </h2>
                    <span className="flex flex-col h-full justify-around text-sm gap-0.5 text-slate-600">
                        <Link className="hover:underline" href="/about">
                            Customer Support
                        </Link>
                        <Link className="hover:underline" href="/">
                            Delivery Details
                        </Link>
                        <Link className="hover:underline" href="/">
                            Term & Conditions
                        </Link>
                        <Link className="hover:underline" href="/">
                            Privacy Policy
                        </Link>
                    </span>
                </div>
                {/* FAQ */}
                <div className="flex flex-col">
                    <h2 className="font-poppins text-sm">
                        FAQ
                    </h2>
                    <span className="flex flex-col h-full justify-around text-sm gap-0.5 text-slate-600">
                        <Link className="hover:underline" href="/about">
                            Account
                        </Link>
                        <Link className="hover:underline" href="/">
                            Manage Deliveries
                        </Link>
                        <Link className="hover:underline" href="/">
                            Orders

                        </Link>
                        <Link className="hover:underline" href="/">
                            Payments
                        </Link>
                    </span>
                </div>
                {/* resources */}
                <div className="flex flex-col">
                    <h2 className="font-poppins text-sm">
                        RESOURCES
                    </h2>
                    <span className="flex flex-col h-full justify-around text-sm gap-0.5 text-slate-600">
                        <Link className="hover:underline" href="/about">
                            Free eBooks
                        </Link>
                        <Link className="hover:underline" href="/">
                            Development Tutorial
                        </Link>
                        <Link className="hover:underline" href="/">
                            How to 
                        </Link>
                        <Link className="hover:underline" href="/">
                            Youtube Playlist
                        </Link>
                    </span>
                </div>
            </div>
            {/* Rights session */}
            <div className="max-w-screen-2xl mx-auto flex justify-between py-2">
                <span className="text-sm w-1/2 text-slate-600">
                    All Rights Reserverd to brands and templates based on 
                    <Link 
                        href="https://www.figma.com/community/file/1273571982885059508/e-commerce-website-template-freebie"
                        target="_blank"
                        className="hover:underline"
                    > Hamza Naeem </Link> 
                    template.
                </span>
                <span className="flex space-x-2">
                    <p className="bg-slate-100 rounded-sm flex items-center">
                        <Image height={48} width={48} src="/mastercard.svg" alt="MasterCard"/>
                    </p>
                    <p className="bg-slate-100 rounded-sm flex items-center">
                        <Image height={48} width={48} src="/visa.svg" alt="MasterCard"/>
                    </p>
                    <p className="bg-slate-100 rounded-sm flex items-center">
                        <Image height={48} width={48} src="/paypal.svg" alt="MasterCard"/>
                    </p>
                </span>
            </div>
        </div>
    )
}