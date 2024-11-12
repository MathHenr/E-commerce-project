"use server"

import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { eq } from "drizzle-orm"
import * as schema from "@/db/schema"
import { cookies } from "next/headers"

import { User } from "@/feature/users/login-user"
import { usersTable } from "@/db/schema"
import { decrypt } from "@/lib/session"

const db = drizzle(process.env.DATABASE_URL!, { schema })

export async function getUserData (): Promise<User | null> {
    const userData = new UserData()
    const data = await userData.select()

    if (data === null) {
        return null
    }
    
    return data
}

class UserData {
    constructor(){}

    public async select(): Promise<User | null> {
        return await this.searchUserData()
    }
    
    private async searchUserData(): Promise<User | null> {
        try {
            const userId = await this.getSession()
            
            const user = await db.query.usersTable.findFirst({
                where: eq(usersTable.id, Number(userId)),
                with: {
                    addressTable: true,
                }
            })
            
            if (user === undefined) {
                return null
            }

            const { id, password, ...response } = user

            return response
        } catch (error) {
            return null
        }
    }

    private async getSession(): Promise<null | {}> {
        const cookie = (await cookies()).get("session")?.value
        const session = await decrypt(cookie)

        if (!session?.userId) {
            return null
        }
        return session.userId
    }
}