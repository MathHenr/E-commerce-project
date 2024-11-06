"use server"

import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"

import { usersTable } from "@/db/schema"
import { eq } from "drizzle-orm"

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
        await db.insert(usersTable).values(user)
        
        status = {
            ok: true,
            message: "User created successfully!"
        }
    } catch (error) {
        status = {
            ok: false,
            message: "User already exist!"
        } 
    }
    return status
}