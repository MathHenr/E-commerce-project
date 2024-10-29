import Image from "next/image"

import { cn } from "@/lib/utils"
import { Title } from "@/components/title"
import { Button } from "@/components/ui/button"
import { Product } from "@/components/product"

const brands = [
    {
        href: "/gucci.svg",
        label: "Gucci",
    },
    {
        href: "/versace.svg",
        label: "Versace",
    },
    {
        href: "/nike.svg",
        label: "Nike",
    },
    {
        href: "/prada.svg",
        label: "Prada",
    },
    {
        href: "/zara.svg",
        label: "Zara",
    },
]

const arrivals = [
    {
        name: "T-shirt with Tape Details",
        price: 120,
        rate: 4.5,
    },
    {
        name: "Skinny Fit Jeans",
        price: 240,
        rate: 3.5,
    },
    {
        name: "Checkered Shirt",
        price: 180,
        rate: 4.5,
    },
    {
        name: "Sleeve Striped T-shirt",
        price: 130,
        rate: 4.5,
    },
]

export default function Page () {
    return (
        <div>
            <div className="max-w-screen-2xl mx-auto min-h-[620px] lg:flex items-end justify-between relative">
                <div className="flex flex-col lg:items-start items-center justify-center gap-y-8 lg:max-w-[600px] w-full p-4">
                    <Title>
                        FIND CLOTHES THAT MATCHES YOUR STYLE
                    </Title>
                    <p className="lg:text-sm text-xs lg:w-full w-2/3 text-slate-600/90">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima beatae eveniet praesentium magni blanditiis eaque laborum repellat vel qui! Reprehenderit magni suscipit
                    </p>
                    <Button
                        className="h-10 lg:max-w-[210px] w-2/3 rounded-full hover:shadow-sm focus:shadow-md"
                    >
                        Shop Now
                    </Button>
                    <div className="lg:w-full w-2/3 flex justify-between">
                        <span className="xl:text-4xl lg:text-3xl text-2xl font-normal">
                            200+
                            <p className="text-justify lg:text-sm text-xs text-slate-600/90 font-light">International Brands</p>
                        </span>
                        <span className="xl:text-4xl lg:text-3xl text-2xl font-normal">
                            2,000+
                            <p className="text-justify lg:text-sm text-xs text-slate-600/90 font-light">High-Quality Products</p>
                        </span>
                        <span className="xl:text-4xl lg:text-3xl text-2xl font-normal">
                            30,000+
                            <p className="text-justifylg:text-sm text-xs text-slate-600/90 font-light">Happy Costumers</p>
                        </span>
                    </div>
                </div>
                <div className="w-full flex justify-center p-4">
                    <Image className="lg:absolute xl:-top-4 lg:top-32 xl:max-w-[680px] max-w-[480px]" width={680} height={680} src="/model_1.png" alt="Modelos" />
                </div>
            </div>
            <div className="min-h-[122px] w-full bg-slate-900 xl:mt-32 lg:mt-12 -mt-4 text-slate-300 flex items-center justify-evenly overflow-hidden">
                {brands.map((brand) => (
                    <Image
                        height={112}
                        width={112}
                        key={brand.href}
                        src={brand.href} 
                        alt={brand.label}
                        className={cn("", (brand.label === "Prada") || (brand.label === "Gucci") ? "svg" : "")}
                    />
                ))}
            </div>
            <div className="max-w-screen-2xl mx-auto w-full">
                <section className="min-h-screen w-full flex flex-col items-center pt-20">
                    <Title>
                        NEW ARRIVALS
                    </Title>
                    <div className="w-[90%] min-h-[620px] lg:py-4 py-0 flex items-center justify-around space-x-4">
                        {arrivals.map((arrive) => (
                            // TODO: fazer um componente produto que vira flex-col quando responseivo
                        ))}
                    </div>
                </section>
            </div>
            
        </div>
    )
}