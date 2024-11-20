import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";
import { usersTable } from "@/db/schema";

import { createSession } from "@/lib/session";
import { compareHash, ILoginInput, IUserData, IUserDBResponse } from "@/feature/users/validators/UserValidator";

const db = drizzle(process.env.DATABASE_URL!, { schema });

export interface IPaymentUserData {
    cardHolder: string;
    cardNumber: string;
    cardProvider: string;
    cardExpiration: string;
    cardCvv: string;
}

interface IUserLoginService {
    login ({ email, password }: ILoginInput): Promise<boolean>;
}

export class UserLoginService implements IUserLoginService{
    public error: string | undefined;
    public user: IUserData | undefined;
    
    async login (data: ILoginInput): Promise<boolean> {
        try {
            const user = await db.query.usersTable.findFirst({
                where: eq(usersTable.email, data.email),
                with: {
                    addressTable: true,
                    paymentTable: true,
                }
            });
            
            if (!user) {
                throw new Error("Invalid email credential, please try again.");
            }

            if (!await compareHash(data.password, user.password)) {
                throw new Error("Invalid password credential, please try again.");
            }

            await createSession(user.id.toString());

            if (!this.InserFormatUserData(user)) {
                return false
            }

            return true;
        } catch (error) {
            if (error instanceof Error) {
                this.error = error.message;
            }
            return false;
        }
    }

    private InserFormatUserData (user: IUserDBResponse): boolean {
        const { firstName, lastName, cpf, email } = user;
        const { number, cep, city, state, street, neighborhood } = user.addressTable!;

        try{
            this.user = {
                firstName,
                lastName,
                cpf,
                email,
                addressTable: {
                    number,
                    cep,
                    city,
                    state,
                    street,
                    neighborhood,
                },
                paymentTable: user.paymentTable,
            };
    
            return true;
        } catch (error) {
            if (error instanceof Error) {
                this.error = error.message;
            }
            return false
        }
    }
}