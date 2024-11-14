import { faCcMastercard } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface CardProps {
    flip: boolean
}

export const Card = ({ flip }: CardProps) => {
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
                                <p>
                                    Card Serial
                                </p>
                                <p
                                    className="sm:text-2xl text-lg font-medium"
                                >
                                    0000 0000 0000 0001
                                </p>
                            </span>

                            <span
                                className="text-slate-50 flex justify-between items-center gap-4"
                            >
                                <p>
                                    Card Holder
                                </p>
                                <p>
                                    01/90
                                </p>
                                <FontAwesomeIcon icon={faCcMastercard} size="2xl"/>
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
                                    250
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}