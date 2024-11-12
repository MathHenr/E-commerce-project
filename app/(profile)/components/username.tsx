interface UsernameProps {
    firstName?: string,
    lastName?: string,
}

export const Username = ({
    firstName = '',
    lastName = ''
}: UsernameProps) => {
    return (
        <div className="flex gap-3 items-center">
            <div className="size-[100px] bg-slate-700 rounded-full shadow-sm hover:drop-shadow-xl hover:scale-105 transition-all ease-linear"/>
            <span>
                {`${firstName.charAt(0).toUpperCase().concat(firstName.slice(1))} 
                ${lastName.charAt(0).toUpperCase().concat(lastName.slice(1))}`}
            </span>
        </div>
    )
}