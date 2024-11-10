"use server"

import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"

import { usersTable } from "@/db/schema"
import { decrypt } from "@/lib/session"
import { Dispatch, SetStateAction } from "react"

const db = drizzle(process.env.DATABASE_URL!)

export interface FetchData {
    success: boolean,
    message?: string,
    user?: {
        firstName: string,
        lastName: string,
        email: string,
        cpf: string,
        cep: string | null,
    }
}

export async function getUserData (): Promise<FetchData | null> {
    const data = new UserData()
    const user = await data.select()

    if (user.success === false) {
        return null
    }
    
    return user
}

class UserData {
    constructor(){}

    public async select(): Promise<FetchData> {
        return await this.searchUserData()
    }
    
    private async searchUserData(): Promise<FetchData> {
        try {
            const userId = await this.getSession()
            
            const user = await db.select()
                .from(usersTable).where(
                    eq(usersTable.id, Number(userId))
                )
            
            if (user.length === 0) {
                return {
                    success: false,
                    message: "User not found in database."
                }
            }

            return {
                success: true,
                message: "Fetch user data succeeded.",
                user: {
                    firstName: user[0].firstName,
                    lastName: user[0].lastName,
                    email: user[0].email,
                    cpf: user[0].cpf,
                    cep: user[0].cep,
                }
            }
        } catch (error) {
            return {
                success: false,
                message: "Failed to get user!",
            }
        }
    }

    private async getSession(): Promise<FetchData | {}> {
        const cookie = (await cookies()).get("session")?.value
        const session = await decrypt(cookie)

        if (!session?.userId) {
            return {
                success: false,
                message: "User unauthorized!"
            }
        }
        return session.userId
    }
}