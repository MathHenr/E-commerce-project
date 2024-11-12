"use server"

import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "@/db/schema"
import { eq } from "drizzle-orm"

import { usersTable, addressTable } from "@/db/schema"

import { User } from "./login-user"

const db = drizzle(process.env.DATABASE_URL!, { schema })

type NewAddress = typeof addressTable.$inferInsert

export interface AddressSchema {
    number: number | null;
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
}

export async function createAdress(data: NewAddress, user: User): Promise<AddressSchema> {
    const newAddress = new CreateAddress(data, user)
    return await newAddress.createAddress()
}

class CreateAddress {
    constructor(
        private readonly address: NewAddress,
        private readonly user: User
    ){
        this.address.customerId = 0;
    }

    public async createAddress(): Promise<AddressSchema> {
        return await this.InsertAddress()
    }

    private async InsertAddress(): Promise<AddressSchema>{
        try {
            const searchIdUser = await db.query.usersTable.findFirst({
                where: eq(usersTable.email, this.user.email),
                with: {
                    addressTable: true,
                }
            })
            
            if (searchIdUser === undefined) {
                throw new Error("User was undefined in create-adress.")
            }

            if (searchIdUser.addressTable !== null) {
                await db.delete(addressTable).where(
                    eq(addressTable.customerId, searchIdUser.id)
                )
            }

            this.address.customerId = searchIdUser.id

            const insertUserAddress = await db.insert(addressTable).values(this.address).returning()

            const { id, customerId, ...filteResult } = insertUserAddress[0]

            return filteResult
        } catch (error) {
            throw new Error("Already have an address.")
        }
    }
}