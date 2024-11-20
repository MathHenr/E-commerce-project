"use server";

import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";
import { usersTable, addressTable } from "@/db/schema";

import type { IAddressValidation, IAddressValidationAPI } from "@/feature/profile/services/AddressValidatorService";

interface IAddressRegistrationService {
    insert(
        data: IAddressValidation,
        customerId: number,
    ): Promise<boolean>;
    getErrorMessage(): string;
}

const db = drizzle(process.env.DATABASE_URL!, { schema });

export async function AddressRegistrationFunction (
    data: IAddressValidation,
    customerId: number,
) {
    const newAddress = new AddressRegistration()
    if (!await newAddress.insert(data, customerId)) {
        return newAddress.getErrorMessage();
    }
    return true;
}

class AddressRegistration implements IAddressRegistrationService{
    private error: string | undefined;

    getErrorMessage(): string {
        return this.error!;
    } 
    
    async insert(data: IAddressValidation, customerId: number): Promise<boolean> {
        try {
            const userData = await db.query.usersTable.findFirst({
                where: eq(usersTable.id, customerId),
                with: {
                    addressTable: true,
                },
            });
            
            if (!userData) {
                this.error = "User was undefined in create-adress.";
                return false;
            }
            
            // verify if users already have an address
            if (userData.addressTable !== null) {
                await db.delete(addressTable).where(
                    eq(addressTable.customerId, userData.id),
                );
            }

            const address = {
                customerId,
                ...data,
            }
            
            await db.insert(addressTable).values(address);
            
            return true;
        } catch (error) {
            if (error instanceof Error) {
                this.error = 'error.message';
            }
            return false
        }
    }

}