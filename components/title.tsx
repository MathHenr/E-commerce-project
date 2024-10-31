import { ComponentProps } from "react"

interface TitleProps extends ComponentProps<'h1'> {}

export const Title = (h1: TitleProps) => {
    return (
        <>
            <h1 className="xl:text-8xl lg:text-7xl text-5xl lg:w-full w-2/3 xl:font-bold font-extrabold font-fantasy text-center" {...h1}/>
        </>
    )
}