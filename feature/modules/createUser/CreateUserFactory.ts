import { DrizzleUsersRepository } from "@/feature/repositories/drizzle/DrizzelUsersRepository"
import { UsersRepositoryInMemory } from "@/feature/repositories/in-memory/UsersRepositoryInMemory";
import { User } from "@/feature/entities/User";
import { UserValidator } from "@/feature/validators/user/UserValidator";
import { CpfValidator, EmailValidator, NameValidator, PasswordValidator } from "@/feature/validators/user/UserValidatorService";
import { CreateUserService } from "./CreateUserService";

// validation data classes for sign up process
export const createUserRules = [
    new CpfValidator(),
    new EmailValidator(),
    new PasswordValidator(),
    new NameValidator()
]

export async function createUserFactory () {
    const usersRepository = new UsersRepositoryInMemory();
    const validateUserData = new UserValidator(createUserRules);
    const createUser = new CreateUserService(usersRepository, validateUserData);
    return createUser;
}