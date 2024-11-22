import { db } from "@/db/client";
import { createSession } from "@/lib/session";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcrypt-ts";
import { IUserSignIn, IUsersRepository } from "@/feature/repositories/IUsersRepositories";
import { User } from "@/feature/entities/User";

class DrizzleUsersRepository implements IUsersRepository {
    async register(data: User): Promise<User> {
        const userRegistered = await db.insert(usersTable).values(data).returning();

        await createSession(userRegistered[0].id.toString());

        const { createdAt, updatedAt, ...user} = userRegistered[0];
        
        return user;
    };

    async exists(email: string): Promise<boolean> {
        const user = await db.query.usersTable.findFirst({
            where: eq(usersTable.email, email),
        })

        return !!user;
    };

    async login(data: IUserSignIn): Promise<boolean> {
        try {
            const user = await db.query.usersTable.findFirst({
                where: eq(usersTable.email, data.email)
            })

            if (!this.compareHash) {
                throw new Error("Invalid Password.");
            }

            // await createSession(user!.id.toString());

            return true;
        } catch (error) {
            throw new Error("Internal server error.")
        }
    };

    async collect(id: number): Promise<User> {
        const getUser = await db.query.usersTable.findFirst({
            where: eq(usersTable.id, id),
            with: {
                addressTable: true,
            }
        })

        const { createdAt, updatedAt, ...user } = getUser!;

        return user as User;
    }
    
    
    private async compareHash (hash: string, password: string): Promise<boolean> {
        return compare(password, hash);
    }
}

export { DrizzleUsersRepository };