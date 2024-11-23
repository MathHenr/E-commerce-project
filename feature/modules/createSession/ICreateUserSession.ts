import { JWTPayload } from "jose";

type IPayload = {
    id: string;
    expiresAt: Date;
}

type SessionParameter = string | undefined;

interface ICreateUserSession {
    encrypt(payload: IPayload): Promise<string>;
    decrypt(session: SessionParameter): Promise<JWTPayload | null>;
    create(id: string): Promise<void>;
    update(): Promise<undefined>;
    delete(): Promise<void>;
}

export type { ICreateUserSession, IPayload, SessionParameter };