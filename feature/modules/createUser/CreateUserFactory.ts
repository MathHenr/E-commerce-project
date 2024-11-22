"use server"

import { DrizzleUsersRepository } from "@/feature/repositories/drizzle/DrizzelUsersRepository"
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

export async function createUserFactory (data: User) {
    const usersRepository = new DrizzleUsersRepository();
    const validateUserData = new UserValidator(createUserRules, data);
    const createUser = new CreateUserService(usersRepository, validateUserData, data);
    return createUser;
}