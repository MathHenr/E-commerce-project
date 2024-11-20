"use server";

import { 
    ValidationRule, 
    UserInput,
    PasswordValidator,
    CPFValidator,
    EmailValidator,
    hash,
    NameValidator,
} from "@/feature/users/validators/UserValidator"
import { UserRegistrationService } from "@/feature/users/services/UserRegistrationService";

export async function UserValidationServiceFunction (
    user: UserInput,
) {
    const newUser = new UserValidationService();
    return [await newUser.register(services, user), newUser.error];
}

const services = [
    new PasswordValidator(),
    new CPFValidator(),
    new EmailValidator(),
    new NameValidator(),
];

class UserValidationService {
    public error: string | undefined;

    private validateInput (rules: ValidationRule[], user: UserInput): boolean {
        for (const rule of rules) {
            if (!rule.validate(user)) {
                this.error = rule.errorMessage();
                return false;
            }
        }
        return true;
    }
    
    async register(rules: ValidationRule[], user: UserInput): Promise<boolean> {
        if(!this.validateInput(rules, user)){
            return false;
        }

        user.password = hash(user.password);

        const newUser = new UserRegistrationService();
        if (!await newUser.insert(user)) {
            this.error = newUser.error;
            return false;
        }

        return true;
    }
}