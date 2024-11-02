import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"

export const Footer = () => {
    return (
        <div className="w-full px-4 py-2 bg-slate-500/25 space-y-8">
            <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 max-md:grid-rows-2 items-center md:justify-evenly px-16 py-9 md:-mt-[90px] -mt-[128px] bg-slate-900 rounded-2xl shadow-sm">
                <h1
                    className="md:col-span-1 max-md:row-span-1 xl:text-6xl lg:text-5xl text-4xl xl:font-bold font-extrabold font-fantasy md:text-start text-center text-white"
                >
                    STAY UPTO DATE ABOUT OUR LATEST OFFERS
                </h1>
                <div className="md:col-span-1 max-md:row-span-1 max-md:mt-2 items-center justify-end">
                    <form className="flex flex-col w-full md:items-end items-center gap-4">
                        <label
                            className="relative flex items-center"
                        >
                            <Mail 
                                className="absolute right-0 mr-4 text-slate-500 size-6"
                            />
                            <input 
                                type="text" 
                                className="md:w-[340px] max-md:w-[298px] py-2 px-4 pr-12 rounded-full focus:outline-none focus-visible:ring-offset-0 focus:ring-0" 
                                placeholder="Enter your email adress"
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

            <div className="bg-red-500/25 grid grid-cols-2 md:grid-cols-5">
                <div className="max-md:col-span-2">
                    shop
                </div>
                <div>
                    company
                </div>
                <div>
                    help
                </div>
                <div>
                    FAQ
                </div>
                <div>
                    resources
                </div>
            </div>
        </div>
    )
}