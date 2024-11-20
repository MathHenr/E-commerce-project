"use server";

import { 
    ValidationRule, 
    IRegisterInput,
    ILoginInput,
    PasswordValidator,
    CPFValidator,
    EmailValidator,
    hash,
    NameValidator,
} from "@/feature/users/validators/UserValidator"
import { UserRegistrationService } from "./UserRegistrationService";
import { UserLoginService } from "./UserLoginService";
import type { IUserData } from "@/feature/users/validators/UserValidator";


interface IUserValidationService {
    register(rules: ValidationRule[], user: IRegisterInput): Promise<boolean>;
    login(rules: ValidationRule[], user: ILoginInput): Promise<boolean>;
}

// TYPES
export interface IUserLoginFunction {
    status: boolean;
    argument: IUserData | string;
}

export interface IUserRegistrationFunction {
    status: boolean;
    argument: string | undefined;
}

// Function to register a new user;
export async function UserRegistrationFunction (
    user: IRegisterInput,
): Promise<IUserRegistrationFunction> {
    const newUser = new UserValidationService();
    const isRegsiter = await newUser.register(registerServices, user)
    if (!isRegsiter) {
        return { status: isRegsiter, argument: newUser.error!};
    }
    return { status: isRegsiter, argument: undefined};
}

// Function to login a user;
export async function UserLoginFunction (
    user: ILoginInput,
): Promise<IUserLoginFunction> {
    const aUser = new UserValidationService();
    const dbRetunr = await aUser.login(loginServices, user);
    if (!dbRetunr) {
        return { status: dbRetunr, argument: aUser.error! };
    }
    return { status: dbRetunr, argument: aUser.user!};
}

const registerServices = [
    new PasswordValidator(),
    new CPFValidator(),
    new EmailValidator(),
    new NameValidator(),
];

const loginServices = [
    new PasswordValidator(),
    new EmailValidator(),
]

class UserValidationService implements IUserValidationService {
    public error: string | undefined;
    public user: IUserData | undefined;

    private validateInput (rules: ValidationRule[], user: IRegisterInput | ILoginInput): boolean {
        for (const rule of rules) {
            if (!rule.validate(user)) {
                this.error = rule.errorMessage();
                return false;
            }
        }
        return true;
    }
    
    async register(rules: ValidationRule[], user: IRegisterInput): Promise<boolean> {
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

    async login (rules: ValidationRule[], user: ILoginInput): Promise<boolean> {
        if(!this.validateInput(rules, user)){
            return false;
        }

        const aUser = new UserLoginService()
        if (!await aUser.login(user)) {
            this.error = aUser.error;
            return false;
        }

        this.user = aUser.user;
        
        return true;
    }
}