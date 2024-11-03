import { BadgeCheck } from "lucide-react"

import { StarRating } from "@/components/star-rating"

interface Review {
    name: string,
    rate: number,
    review: string
}

export const Review = ({
    name,
    rate,
    review
}: Review) => {
    return (
        <div className="min-w-[398px] min-h-[198px] rounded-xl border border-slate-400/75 p-4 flex flex-col gap-1 transition-all ease-linear duration-75 shadow-sm hover:shadow-md">
            <span>
                <StarRating name={name} rating={rate} />
            </span>
            <h1 className="text-lg font-semibold flex items-center gap-2">
                {name}
                <span>
                    <BadgeCheck className="text-white" size={24} fill="green"/>
                </span>
            </h1>
            <p className="text-sm text-slate-600">
                {review.length > 215 ? review.substring(0, 200) + '...' : review}
            </p>
        </div>
    )
}