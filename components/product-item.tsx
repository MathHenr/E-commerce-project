import { StarRating } from "@/components/star-rating"

interface ProductProps {
    name: string,
    price: number,
    rate: number,
}

export const ProductItem = ({
    name,
    price,
    rate,
}: ProductProps) => {
    return (
        <div
            className="flex flex-col items-center w-full"
        >
            <div className="lg:size-[248px] size-[224px] rounded-xl shadow-sm transition-all duration-100 ease-linear hover:shadow-md bg-white hover:bg-white/85 hover:scale-105 hover:cursor-pointer" />
            <div className="flex flex-col items-start ml-2 py-4">
                <p className="lg:text-lg text-base font-semibold">{name}</p>
                <span className="flex items-center space-x-4">
                    <StarRating rating={rate} />
                    <p className="text-sm">{rate}/5</p>
                </span>
                <p className="text-xl font-semibold">${price}</p>
            </div>
        </div>
    )
}