import { User } from "../../entities/User";
import { IUserSignIn, IUsersRepository } from "../IUsersRepositories";

class UsersRepositoryInMemory implements IUsersRepository {
    private users: User[] = [];

    async register(user: User): Promise<User> {
    Object.assign(user, {
        id: 'uuid()'
    });

    this.users.push(user);
    return user;
    }

    async exists(email: string): Promise<boolean> {
    const user = this.users.some((user) => user.email === email);
    return user;
    }
    login(user: IUserSignIn): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    collect(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
}

export { UsersRepositoryInMemory };
