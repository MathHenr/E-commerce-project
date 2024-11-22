import { User } from "@/feature/entities/User";

interface IUserSignIn {
    email: string;
    password: string;
}

interface IUsersRepository {
    register(user: User): Promise<User>;
    exists(email: string): Promise<boolean>;
    login(user: IUserSignIn): Promise<boolean>;
    collect(id: number): Promise<User>;
}

export type { IUsersRepository, IUserSignIn };