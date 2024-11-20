import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

export async function getSession (): Promise<number | null> {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
        return null
    }
    
    return session.userId as number;
}