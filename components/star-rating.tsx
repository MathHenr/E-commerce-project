import { Star, StarHalf } from "lucide-react"

interface StarProps {
    rating: number
}

export const StarRating = ({ rating }: StarProps) => {
    const maxStars = 5
    const fullStars = Math.floor(rating)
    const halfStars = rating % 1 >= 0.5 ? 1 : 0
    const emptyStars = maxStars - (fullStars + halfStars)

    const StarHalfComponent = () => {
        return (
            <div className="flex items-center relative">
                <Star size={16} fill="#FFF" strokeWidth={0.2} />
                <StarHalf className="absolute" size={16} fill="#FFC633" strokeWidth={0.2} />
            </div>
        )
    }

    const stars = [
        ...Array(fullStars).fill(<Star size={16} fill="#FFC633" strokeWidth={0.2} />),
        ...Array(halfStars).fill(<StarHalfComponent />),
        ...Array(emptyStars).fill(<Star size={16} fill="#FFF" strokeWidth={0.2} />),
    ]

    return (
        <div className="flex">
            {stars}
        </div>
    )
}