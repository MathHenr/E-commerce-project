import { drizzle } from "drizzle-orm/node-postgres"
import { or, eq } from "drizzle-orm"
import { usersTable } from "@/db/schema"
import { createSession } from "@/lib/session"

import type { IRegisterInput } from "@/feature/users/validators/UserValidator" 

const db = drizzle(process.env.DATABASE_URL!);

interface IUserRegistrationService {
    insert(data: IRegisterInput): Promise<boolean>;
}

export class UserRegistrationService implements IUserRegistrationService {
    public error: string | undefined;
    
    async insert(data: IRegisterInput): Promise<boolean> {
        try {
            data.cpf = data.cpf.replace(/\D/g,'');

            const userExist = await db.select().from(usersTable).where(
                or(
                    eq(usersTable.cpf, data.cpf),
                    eq(usersTable.email, data.email),
                )
            )

            if (userExist.length > 0) {
                throw new Error("Email or CPF already exist in your database.");
            }
            
            const user = await db.insert(usersTable).values(data).returning();

            // createa users session when finished register in DB!
            await createSession(String(user[0].id));

            return true;
        } catch (error) {
            if (error instanceof Error){
                this.error = error.message;
                return false;
            }
        }
        return true;
    }
}