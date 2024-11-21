import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";
import { usersTable } from "@/db/schema";

import { createSession } from "@/lib/session";
import { compareHash, FormatUserData, ILoginInput, IUserData } from "@/feature/users/validators/UserValidator";

const db = drizzle(process.env.DATABASE_URL!, { schema });

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

            const userFormatData = FormatUserData(user);
            
            if (!userFormatData) {
                this.error = "Something went wrong, please try again later.";
                return false
            }

            if (typeof userFormatData === "string") {
                this.error = userFormatData;
                return false;
            }

            this.user = userFormatData;

            return true;
        } catch (error) {
            if (error instanceof Error) {
                this.error = error.message;
            }
            return false;
        }
    }
}