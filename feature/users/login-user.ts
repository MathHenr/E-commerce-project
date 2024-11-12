"use server"

import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { eq } from "drizzle-orm"
import * as schema from "@/db/schema"
import { compare } from "bcrypt-ts"

import { usersTable } from "@/db/schema"
import { createSession } from "@/lib/session"

const db = drizzle(process.env.DATABASE_URL!, { schema })

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    cpf: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    addressTable: {
        number: number,
        id: number,
        customerId: number,
        cep: string,
        state: string,
        city: string,
        neighborhood: string,
        street: string,
    }[];
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
                .query.usersTable.findFirst({
                    where: eq(usersTable.email, this.email),
                    with: {
                        addressTable: true
                    },
                })
            
            if (user === undefined) {
                throw new Error("User returned undefined in database search.")
            }

            const passMatch = await compare(this.hash, user.password)
            
            if (!passMatch) {
                throw new Error("Invalid password credential.")
            }

            await createSession(String(user.id))

            // removing id
            const { id, password, ...filter } = user

            return filter
        } catch (error) {
            throw new Error("Invalid credentials.")
        }
    }
}