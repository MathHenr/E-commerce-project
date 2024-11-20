"use server";

import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";
import { usersTable } from "@/db/schema";
import { getSession } from "@/feature/profile/GetUserCookieService";

import { FormatUserData, type IUserData } from "@/feature/users/validators/UserValidator";


const db = drizzle(process.env.DATABASE_URL!, { schema });

interface IGetUserDataFunctionReturn {
    status: boolean,
    argument: IUserData | string;
}

export async function GetUserDataFunction (): Promise<IGetUserDataFunctionReturn> {
    const data = new GetUserDataService();
    const output = await data.get();

    if (!output) {
        return { status: output, argument: data.error! };
    }
    return { status: output, argument: data.user! };
}


class GetUserDataService {
    public user: IUserData | undefined;
    public error: string | undefined;

    async get(): Promise<boolean> {
        try {
            const userId = await getSession();
        
            if (!userId) {
                this.error = "There is no user logged in.";
                return false;
            }

            const user = await db.query.usersTable.findFirst({
                where: eq(usersTable.id, userId),
                with: {
                    addressTable: true,
                    paymentTable: true,
                }
            });

            if (!user) {
                throw new Error ("This user was nout found in database, please try again.")
            };

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