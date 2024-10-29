import { SalePopup } from "@/components/sale-popup";
import { Navigation } from "@/components/navigation";

type Props = {
    children: React.ReactNode;
}

export default function HomeLayout ({ children }: Props) {
    return (
        <>
            <SalePopup />
            <Navigation />
            <main className="">
                { children }
            </main>
        </>
    )
}