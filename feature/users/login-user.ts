"use server"

import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { eq } from "drizzle-orm"
import { compare } from "bcrypt-ts"

import { usersTable } from "@/db/schema"
import { createSession } from "@/lib/session"

const db = drizzle(process.env.DATABASE_URL!)

export type NewUser = typeof usersTable.$inferInsert

interface UserResponse {
    success: boolean,
    message: string,
}

export async function login (email: string, password: string): Promise<UserResponse> {
    const log = new CheckUser(email, password)
    return await log.Login()
}

class CheckUser {
    constructor(
        private readonly email: string,
        private readonly hash: string,
    ){}
    
    public async Login (): Promise<UserResponse> {
        return await this.CheckUserInDB()
    }

    private async CheckUserInDB (): Promise<UserResponse> {
        try {
            const user = await db
                .select().from(usersTable).where(
                    eq(usersTable.email, this.email)
                )
            
            if (user.length > 1) {
                return {
                    success: false,
                    message: "There are multiple users found in the database."
                }
            }

            if (user.length === 0) {
                return {
                    success: false,
                    message: "Invalid email credential."
                }
            }
            
            const passMatch = await compare(this.hash, user[0].password)
            
            if (!passMatch) {
                return {
                    success: false,
                    message: "Invalid password credential."
                }
            }

            await createSession(String(user[0].id))

            return {
                success: true,
                message: "User logged in successfully!"
            }
        } catch (error) {
            return {
                success: false,
                message: "Failed to connect."
            }
        }
    }
}