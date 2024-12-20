import { Footer } from "@/components/footer";

type Props = {
    children: React.ReactNode;
}

export default function SignOutLayout ({ children }: Props) {
    return (
        <>
            <main className="mb-32">
                { children }
            </main>
            <Footer />
        </>
    )
}