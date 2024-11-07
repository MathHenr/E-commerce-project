import { Nav } from "../components/nav";
import { Sidebar } from "../components/sidebar";

export default async function Page () {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-12">
            <div className="hidden md:grid col-span-1">
                <Sidebar />
            </div>
            <div className="flex flex-col col-span-11">
                <Nav />
            </div>
        </div>
    )
}