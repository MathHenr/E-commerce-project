"use server"

import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { eq } from "drizzle-orm"

import { usersTable } from "@/db/schema"
import { createSession } from "@/lib/session"

const db = drizzle(process.env.DATABASE_URL!)

type NewUser = typeof usersTable.$inferInsert

interface UserResponse {
    success: boolean,
    message: string,
}

export async function createUser (data: NewUser): Promise<UserResponse> {
    const user = new User(data)
    return await user.CreateUser()
}

class User {
    constructor(
        private readonly user: NewUser
    ){}
    
    public async CreateUser (): Promise<UserResponse> {
        return this.insertUserInDB()
    }

     private async insertUserInDB (): Promise<UserResponse> {
        try {
            // Check if any user with this cpf already exist
            const cpfAlreadyExist = await db
                .select().from(usersTable).where(
                    eq(usersTable.cpf, this.user.cpf)
                )
            
            if (cpfAlreadyExist.length > 0) {
                return {
                    success: false,
                    message: "Already have an user with this CPF!"
                }
            }

            const user =  await db.insert(usersTable).values(this.user).returning()

            await createSession(String(user[0].id))

            return {
                success: true,
                message: "User created successfully!"
            }
        } catch (error) {
            return {
                success: false,
                message: "Email already exist in database!"
            }
        }
    }
}