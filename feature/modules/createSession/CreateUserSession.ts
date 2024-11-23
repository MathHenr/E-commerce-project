import { JWTPayload, SignJWT, jwtVerify } from "jose"
import { ICreateUserSession, IPayload, SessionParameter } from "./ICreateUserSession";
import { cookies } from "next/headers"


const secret = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secret);

class CreateUserSession implements ICreateUserSession {
    
    async encrypt(payload: IPayload): Promise<string> {
        return new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(encodedKey)
    };

    async decrypt(session: SessionParameter): Promise<JWTPayload | null> {
        if (session === undefined) session = '';

        try {
            const { payload } = await jwtVerify(session, encodedKey, {
                algorithms: ['HS256']
            });
            return payload;
        } catch (error) {
            return null;
        }
    };

    async create(id: string ): Promise<void> {
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const session = await this.encrypt({ id, expiresAt });
        const cookieStore = await cookies();

        cookieStore.set('session', session, {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: "lax",
            path: "/"
        });

        return;
    };

    async update(): Promise<undefined> {
        const session = (await cookies()).get("session")?.value;
        const payload = await this.decrypt(session);

        if (!session || !payload) {
            return;
        }

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const cookieStore = await cookies();

        cookieStore.set('session', session, {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: "lax",
            path: "/"
        });

        return;
    };

    async delete(): Promise<void> {
        const cookieStore = await cookies();
        cookieStore.delete("session");

        return;
    };
    
}

export { CreateUserSession };