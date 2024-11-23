import { User } from "../../entities/User";
import { IUserSignIn, IUsersRepository } from "../IUsersRepositories";
import { compare } from "bcrypt-ts";

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

    async login(data: IUserSignIn): Promise<boolean> {
        const user = this.users.find((user) => user.email === data.email);

        if (!await compare(data.password, user!.password)) {
            return false
        }
        return true;
    }
    
    collect(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
}

export { UsersRepositoryInMemory };
