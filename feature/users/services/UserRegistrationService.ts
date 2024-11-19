import { drizzle } from "drizzle-orm/node-postgres"

import { UserInput } from "@/feature/users/validators/UserValidator" 
import { usersTable } from "@/db/schema"
import { createSession } from "@/lib/session"

const db = drizzle(process.env.DATABASE_URL!)

interface IUserRegistrationService {
    insert(data: UserInput): void;
}

export class UserRegistrationService implements IUserRegistrationService {
    async insert(data: UserInput) {
        try {
            data.cpf = data.cpf.replace(/\D/g,'');
            
            // No need to check cpf or email, drizzle throw an error if those alredy exist in DB!
            const user = await db.insert(usersTable).values(data).returning();

            // createa users session when finished register in DB!
            await createSession(String(user[0].id));

            return true;
        } catch (error) {
            throw new Error("Email or CPF already exist in your database.")
        }
    }
}