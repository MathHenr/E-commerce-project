import { SalePopup } from "@/components/sale-popup";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

type Props = {
    children: React.ReactNode;
}

export default function HomeLayout ({ children }: Props) {
    return (
        <>
            <SalePopup />
            <Navigation />
            <main className="my-32">
                { children }
            </main>
            <Footer />
        </>
    )
}