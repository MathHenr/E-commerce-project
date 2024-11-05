import Image from "next/image"

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
            <p>
                Profile Page {session.user?.name}
            </p>
            <Image width={120} height={120} src={session.user?.image!} alt="User" />
        </div>
    )
}