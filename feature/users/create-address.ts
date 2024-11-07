"use server"

import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { eq } from "drizzle-orm"

import { addressTable } from "@/db/schema"

const db = drizzle(process.env.DATABASE_URL!)

type NewUser = typeof addressTable.$inferInsert

export const createUser = async (user: NewUser) => {

    try {
        
    } catch (error) {
        
    }
    return 
}