"use server"

import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"

import { usersTable } from "@/db/schema"
import { decrypt } from "@/lib/session"

const db = drizzle(process.env.DATABASE_URL!)

type GetUser = typeof usersTable.$inferSelect

export async function getUserData () {
    const data = new UserData()
    return await data.select()
}

class UserData {
    private readonly user: GetUser | undefined

    constructor(){}

    public async select() {
        return await this.searchUserData()
    }
    
    private async searchUserData() {
        try {
            const userId = this.getSession()
            console.log(userId)
            
        } catch (error) {
            return console.log("Failed to get user!")
        }
    }

    private async getSession(): Promise<void | {}> {
        const cookie = (await cookies()).get('session')?.value
        const session = await decrypt(cookie)

        if (!session?.userId) {
            return console.log('User unauthorized!')
        }
        return session.userId
    }
}