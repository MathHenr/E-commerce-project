import { Nav } from "@/app/(profile)/components/nav";
import { Sidebar } from "../components/sidebar";

type Props = {
    children: React.ReactNode;
}

export default function HomeLayout ({ children }: Props) {
    return (
        <>
            <main>
                { children }
            </main>
        </>
    )
}