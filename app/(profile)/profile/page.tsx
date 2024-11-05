import { getServerSession } from "next-auth"

export default async function Page () {
    const session = await getServerSession()

    if (!session) {
        return (
            <div>
                User not authorized
            </div>
        )
    }
    
    return (
        <div>
            Profile Page {session.user?.name}
        </div>
    )
}