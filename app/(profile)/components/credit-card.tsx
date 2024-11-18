import Image from "next/image"


interface CardProps {
    flip: boolean;
    card_number?: string;
    card_holder?: string;
    expiration?: string;
    card_provider?: string;
    cvv?: string;
}

export const Card = ({ 
    flip,
    card_holder,
    card_number,
    expiration,
    card_provider,
    cvv,
}: CardProps) => {
    return (
        <div
            className="col-span-1 p-4 inline-flex lg:justify-end justify-center"
        >
            <div className="group w-[308px] h-[168px] sm:w-[398px] sm:h-[258px] [perspective:1000px]">

                <div className={`relative h-full w-full bg-gradient-radial rounded-2xl shadow-md transition-all duration-500 [transform-style:preserve-3d] ${ flip ? '[transform:rotateY(180deg)]' : ''}`}>
                    
                    {/* Card Front */}
                    <div className="absolute inset-0">
                        <div className="flex flex-col justify-between h-full p-4">
                            <span
                                className="text-slate-50 text-end"
                            >
                                <p>
                                    Credit Card
                                </p>
                            </span>

                            <span
                                className="text-slate-50 flex flex-col"
                            >
                                <p className="text-sm">
                                    Card Number
                                </p>
                                <p
                                    className="sm:text-2xl text-lg font-medium"
                                >
                                    {card_number}
                                </p>
                            </span>

                            <span
                                className="text-slate-50 flex justify-between items-center gap-4"
                            >
                                <p>
                                    {card_holder}
                                </p>
                                <p>
                                    {expiration}
                                </p>
                                { card_provider ? (
                                    <Image height={48} width={48} src={`/card-providers/${card_provider}_logo.svg`} alt="Card"/>
                                ) : (
                                    <></>
                                ) }
                            </span>
                        </div>
                    </div>
                    
                    {/* Card Back */}
                    <div className="absolute inset-0 h-full w-full bg-gradient-radial rounded-2xl shadow-md [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <div className="flex flex-col justify-evenly h-full">
                            <div 
                                className="w-full h-10 bg-black"
                            />

                            <div
                                className="flex flex-col mx-4 p-2 text-slate-50 bg-white"
                            >
                                <p
                                    className="text-slate-900 text-sm text-end"
                                >
                                    {cvv}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}