"use server"

import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { eq, or } from "drizzle-orm"

import { usersTable } from "@/db/schema"

const db = drizzle(process.env.DATABASE_URL!)

type NewUser = typeof usersTable.$inferInsert

type Response = {
    ok: boolean,
    message: string,
}

export const createUser = async (user: NewUser): Promise<Response> => {
    let status = {
        ok: false,
        message: "",
    }
    try {
        const cpfAlreadyExist = await db
            .select().from(usersTable).where(
                eq(usersTable.cpf, user.cpf)
            )
        
        if (cpfAlreadyExist.length > 0) {
            status = {
                ok: false,
                message: "Cpf already exist in database!"
            }
            return status
        }

        await db.insert(usersTable).values(user)
        
        status = {
            ok: true,
            message: "User created successfully!"
        }
    } catch (error) {
        status = {
            ok: false,
            message: "Email already exist in database!"
        } 
    }
    return status
}