"use server"

import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"

import { User } from "@/feature/users/login-user"
import { usersTable } from "@/db/schema"
import { decrypt } from "@/lib/session"

const db = drizzle(process.env.DATABASE_URL!)


export async function getUserData (): Promise<User | null> {
    const userData = new UserData()
    const data = await userData.select()

    if (data === null) {
        throw new ReferenceError("User data not found.")
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
            
            const user = await db.select()
                .from(usersTable).where(
                    eq(usersTable.id, Number(userId))
                )
            
            if (user.length === 0) {
                return null
            }

            return {
                firstName: user[0].firstName,
                lastName: user[0].lastName,
                email: user[0].email,
                cpf: user[0].cpf,
                cep: user[0].cep,
            }
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