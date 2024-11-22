import { IUsersRepository } from "@/feature/repositories/IUsersRepositories";
import { User } from "@/feature/entities/User";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { IUserInputValidator } from "@/feature/validators/user/IUserInputValidator";

interface IUserRequest {
    firstName: string;
    lastName: string;
    cpf: string;
    email: string; 
    password: string;
}

class CreateUserService {
    constructor(
        private usersRespository: IUsersRepository,
        private validateUserData: IUserInputValidator,
        private data: User,
    ) {}

    async exec(): Promise<User | string> {
        // validating user data, I need to return a string error to show it in frontend components
        try {
            this.validateUserData.validate();
        } catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
            return String(error);
        }
        
        // verify if users exist
        const userAlreadyExists = await this.usersRespository.exists(this.data.email);

        if (userAlreadyExists) {
            throw new Error("Email already vinculated to an account.");
        }
        
        // hashing password
        this.data.password = this.hash(this.data.password);

        // create an instance of User
        const userCreate = User.create(this.data)
        // create user
        const user = await this.usersRespository.register(userCreate);
        return user;
    }

    private hash (password: string): string {
        const salt = genSaltSync(8);
        return hashSync(password, salt);
    }
}

export { CreateUserService };