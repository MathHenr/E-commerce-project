"use client"

import { useState } from "react"
import { useMedia } from "react-use"

import Image from "next/image"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ProductItem } from "@/components/product-item"
import { Review } from "@/components/review"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

const reviews = [
    {
      name: "Alice Johnson",
      rate: 4.5,
      commentary: "Great experience! The service was excellent and the staff was very friendly."
    },
    {
      name: "Michael Thompson",
      rate: 3.8,
      commentary: "Good overall, but a bit pricey for what was offered."
    },
    {
      name: "Emily Chen",
      rate: 5.0,
      commentary: "Absolutely loved it! Everything was perfect."
    },
    {
      name: "James Rodriguez",
      rate: 2.9,
      commentary: "It was okay. The place was a bit crowded, and the wait time was long."
    },
    {
      name: "Sarah Lee",
      rate: 4.2,
      commentary: "Nice atmosphere, and the food was delicious! Would come again."
    },
    {
      name: "Daniel Kim",
      rate: 1.7,
      commentary: "Not satisfied. The quality didn't meet my expectations."
    },
    {
      name: "Olivia Brown",
      rate: 4.7,
      commentary: "Wonderful place! Highly recommended for a relaxing time."
    },
    {
      name: "Lucas White",
      rate: 3.5,
      commentary: "Average experience. Some things were nice, others could be improved."
    },
    {
      name: "Sophia Martinez",
      rate: 5.0,
      commentary: "Best experience I've had in a long time! Can't wait to come back."
    },
    {
      name: "Henry Walker",
      rate: 3.0,
      commentary: "It was fine, but nothing special. Expected a bit more."
    }
]

export default function Page () {
    const [reviewList, setReviewList] = useState<number>(0)
    const isMobile = useMedia("(max-width: 1024px)", false)
    
    
    function handleLeftArrow (): void {
        return isMobile 
            ? setReviewList((prevMargin) => 
                prevMargin === 0 ? (prevMargin = (reviews.length - 1) * 388) : (prevMargin - 300) < 0 ? prevMargin = 0 : prevMargin - 300)
            : setReviewList((prevMargin) => 
                prevMargin === 0 ? (prevMargin = (reviews.length - 1) * 288) : (prevMargin - 600) < 0 ? prevMargin = 0 : prevMargin - 600)
    }
    function handleRightArrow (): void {
        return isMobile
            ? setReviewList((nextMargin) => 
                nextMargin === ((reviews.length - 1) * 388) ? nextMargin = 0 : (nextMargin + 300) > (reviews.length - 1) * 388 ? nextMargin = (reviews.length - 1) * 388 : nextMargin + 300)
            : setReviewList((nextMargin) => 
                nextMargin === ((reviews.length - 1) * 288) ? nextMargin = 0 : (nextMargin + 600) > (reviews.length - 1) * 288 ? nextMargin = (reviews.length - 1) * 288 : nextMargin + 600)
    }
    
    return (
        <>
            <div className="max-w-screen-2xl mx-auto min-h-[620px] lg:flex items-end justify-between relative">
                {/* Principal Banner */}
                <div className="flex flex-col lg:items-start items-center justify-center gap-y-8 lg:max-w-[600px] w-full p-4">
                    <h1
                        className="xl:text-8xl lg:text-7xl text-5xl lg:w-full w-2/3 xl:font-bold font-extrabold font-fantasy text-center"
                    >
                        FIND CLOTHES THAT MATCHES YOUR STYLE
                    </h1>

                    <p className="lg:text-sm text-xs lg:w-full w-2/3 text-slate-600/90">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima beatae eveniet praesentium magni blanditiis eaque laborum repellat vel qui! Reprehenderit magni suscipit
                    </p>
                    <Button>
                        Shop Now
                    </Button>
                    <div className="lg:w-full w-2/3 flex justify-between">
                        <span className="xl:text-4xl lg:text-3xl text-2xl font-normal">
                            200+
                            <p className="text-justify lg:text-sm text-xs text-slate-600/90 font-light">
                                International Brands
                            </p>
                        </span>
                        <span className="xl:text-4xl lg:text-3xl text-2xl font-normal">
                            2,000+
                            <p className="text-justify lg:text-sm text-xs text-slate-600/90 font-light">
                                High-Quality Products
                            </p>
                        </span>
                        <span className="xl:text-4xl lg:text-3xl text-2xl font-normal">
                            30,000+
                            <p className="text-justifylg:text-sm text-xs text-slate-600/90 font-light">
                                Happy Costumers
                            </p>
                        </span>
                    </div>
                </div>
                <div className="w-full flex justify-center p-4">
                    <Image className="lg:absolute xl:-top-4 lg:top-32 xl:max-w-[680px] max-w-[480px]" width={680} height={680} src="/model_1.png" alt="Modelos" />
                </div>
            </div>

            <div className="min-h-[122px] w-full bg-slate-900 xl:mt-32 lg:mt-12 -mt-4 text-slate-300 flex items-center justify-evenly overflow-hidden">
                {/* Brand Images */}
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
            <div className="max-w-screen-2xl mx-auto w-full overflow-hidden">

                {/* New Arrivals */}
                <section className="min-h-full w-full flex flex-col items-center px-4 py-2 pt-20 border-b border-slate-500">
                    <h1
                        className="translateX xl:text-7xl lg:text-6xl text-5xl lg:w-full w-2/3 xl:font-bold font-extrabold font-fantasy text-start"
                    >
                        NEW ARRIVALS
                    </h1>
                    <div className="w-full min-h-[420px] py-4 mt-10 flex max-lg:flex-col items-center justify-around">
                        {arrivals.map((arrive) => (
                            <ProductItem 
                                key={arrive.name}
                                name={arrive.name}
                                price={arrive.price}
                                rate={arrive.rate}
                            />
                        ))}
                    </div>

                    <Link 
                        href="/shop" 
                        className="flex justify-center items-center mt-10 my-12"
                    >
                            <Button className="bg-white/35 w-full border-2 text-slate-900 hover:text-slate-200">
                                View More...
                            </Button>
                    </Link>
                </section>
                
                {/* Top selling */}
                <section className="min-h-full w-full flex flex-col items-center px-4 py-2 pt-20 border-b border-slate-500">
                    <div className="w-full flex items-center justify-center">
                        <h1
                            className="xl:text-7xl lg:text-6xl text-5xl lg:w-full w-2/3 xl:font-bold font-extrabold font-fantasy text-end"
                        >
                            TOP SELLING
                        </h1>
                    </div>
                    <div className="w-full min-h-[420px] py-4 mt-10 flex max-lg:flex-col items-center justify-around">
                        {arrivals.map((arrive) => (
                            <ProductItem 
                                key={arrive.name}
                                name={arrive.name}
                                price={arrive.price}
                                rate={arrive.rate}
                            />
                        ))}
                    </div>

                    <Link 
                        href="/shop" 
                        className="flex justify-center items-center mt-10 my-12"
                    >
                        <Button className="bg-white/35 w-full border-2 text-slate-900 hover:text-slate-200">
                            View More...
                        </Button>
                    </Link>
                </section>

                {/* Comments */}
                <section className="w-full flex-col py-4">
                    <div>
                        <h1
                            className="xl:text-7xl lg:text-6xl text-5xl lg:w-full md:w-2/3 w-full xl:font-bold font-extrabold font-fantasy text-center"
                        >
                            OUR HAPPY COSTUMERS
                        </h1>
                    </div>
                    <div className="pt-8 flex flex-col">
                        <span className="flex justify-end gap-3">
                            <ChevronLeft 
                                onClick={handleLeftArrow}
                                className="bg-transparent rounded-md hover:bg-slate-500 transition-all duration-100 ease-linear hover:text-slate-200 hover:cursor-pointer" size={24}
                            />
                            <ChevronRight  
                                onClick={handleRightArrow}
                                className="bg-transparent rounded-md hover:bg-slate-500 transition-all duration-100 ease-linear hover:text-slate-200 hover:cursor-pointer" size={24} 
                            />
                        </span>
                        <div 
                            style={{ marginLeft: `-${reviewList}px`}}
                            className="flex gap-4 pt-4 px-0.5 w-full transition-all ease-linear delay-75 duration-300"
                        >
                            {reviews && reviews.map((review) => (
                                <Review
                                    key={review.name}
                                    rate={review.rate}
                                    name={review.name}
                                    review={review.commentary}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}