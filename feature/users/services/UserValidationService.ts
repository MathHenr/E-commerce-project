"use server";

import { 
    ValidationRule, 
    UserInput,
    PasswordValidator,
    CPFValidator,
    EmailValidator,
} from "@/feature/users/validators/UserValidator"
import { UserRegistrationService } from "@/feature/users/services/UserRegistrationService";

export async function UserValidationServiceFunction (
    user: UserInput,
) {
    const newUser = new UserValidationService(services, user)
    return await newUser.register();
}

const services = [
    new PasswordValidator(),
    new CPFValidator(),
    new EmailValidator(),
];

class UserValidationService {
    private rules: ValidationRule[];
    private user: UserInput;

    constructor(
        rules: ValidationRule[],
        user: UserInput
    ){
        this.rules = rules;
        this.user = user;
    }

    async register(): Promise<string | void> {
        for (const rule of this.rules) {
            if (!rule.validate(this.user)) {
                return rule.errorMessage();
            }
        }

        try {
            const newUser = new UserRegistrationService()
            await newUser.insert(this.user) // inserting new user in DB
        } catch (error) {
            if (error instanceof Error) {
                return error.message
            }
        }
        
        return
    }
}