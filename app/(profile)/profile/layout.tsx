import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

type Props = {
    children: React.ReactNode;
}

export default function HomeLayout ({ children }: Props) {
    return (
        <>
            <Navigation />
            <main className="min-h-screen mb-32">
                { children }
            </main>
            <Footer />
        </>
    )
}