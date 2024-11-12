"use server"

import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { eq } from "drizzle-orm"
import { compare } from "bcrypt-ts"

import { usersTable } from "@/db/schema"
import { createSession } from "@/lib/session"

const db = drizzle(process.env.DATABASE_URL!)

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    cpf: string;
    cep: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}

export async function login (email: string, password: string): Promise<User | null> {
    const log = new CheckUser(email, password)
    return await log.Login()
}

export async function logout () {}

class CheckUser {
    constructor(
        private readonly email: string,
        private readonly hash: string,
    ){}
    
    public async Login (): Promise<User | null> {
        const response = await this.CheckUserInDB()
        if (!response) {
            return null
        }
        return response
    }

    private async CheckUserInDB (): Promise<User> {
        try {
            const user = await db
                .select().from(usersTable).where(
                    eq(usersTable.email, this.email)
                )
            
            const passMatch = await compare(this.hash, user[0].password)
            
            if (!passMatch) {
                throw new Error("Invalid password credential.")
            }

            await createSession(String(user[0].id))

            // removing id
            const filter = user.map((att) => {
                const { id, password, ...rest } = att
                return rest
            })

            return filter[0]
        } catch (error) {
            throw new Error("Invalid credentials.")
        }
    }
}