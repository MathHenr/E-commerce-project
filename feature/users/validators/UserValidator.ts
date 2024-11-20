import { IAddressUserData } from "@/feature/profile/address/validators/AddressValidator";
import { genSaltSync, hashSync, compare } from "bcrypt-ts";
import { IPaymentUserData } from "@/feature/users/services/UserLoginService";

// TYPES
export interface ValidationRule {
    validate({}: IRegisterInput | ILoginInput): boolean;
    errorMessage(): string;
}

export interface ILoginInput {
    email: string;
    password: string;
}

export interface IRegisterInput extends ILoginInput{
    firstName: string;
    lastName: string;
    cpf: string;
}

export interface IUserData {
    firstName: string;
    lastName: string;
    cpf: string;
    email: string;
    addressTable: IAddressUserData,
    paymentTable: IPaymentUserData[],
}

export interface IUserDBResponse {
    email: string;
    password: string;
    id: number;
    firstName: string;
    lastName: string;
    cpf: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    addressTable: {
        number: number;
        id: number;
        customerId: number;
        cep: string;
        state: string;
        city: string;
        neighborhood: string;
        street: string;
    } | null;
    paymentTable: {
        id: number;
        customerId: number;
        cardHolder: string;
        cardNumber: string;
        cardProvider: string;
        cardExpiration: string;
        cardCvv: string;
    }[];
}

// FUNCTIONS AND CLASS
export class CPFValidator implements ValidationRule {
    validate({ cpf }: IRegisterInput): boolean {
        const _cpf = cpf.replace(/\D/g, '') // remove signs
        
        if (_cpf.length !== 11) return false;
        if (_cpf.charAt(0).repeat(_cpf.length) === cpf) return false;
        
        const cpfToBeCalculated = _cpf.slice(0, -2);
        const firstDigit = this.calc(cpfToBeCalculated);
        const secondDigit = this.calc(cpfToBeCalculated + firstDigit);

        if (_cpf !== (cpfToBeCalculated + firstDigit + secondDigit)) {
            return false;
        }

        return true;
    }

    errorMessage(): string {
        return "Invalid CPF, please enter a valid CPF.";
    }

    private calc (argument: string): string {
        const arr = Array.from(argument);
        let counter = argument.length + 1;

        const sum = arr.reduce((ac, value) => {
            ac += counter * Number(value);
            counter--;
            return ac;
        }, 0)

        const digit = 11 - (sum % 11);
        return digit > 9 ? '0' : String(digit);
    }
}

export class PasswordValidator implements ValidationRule {
    validate({ password }: ILoginInput): boolean{
        if (password.length <= 6) {
            return false;
        }
        return true;
    }

    errorMessage(): string {
        return "Password must have more than 6 digits.";
    }
}
// function to hash password and save;
export function hash (password: string): string {
    const salt = genSaltSync(8);
    const hash = hashSync(password, salt);
    return hash;
}

// function to compare hash password and login;
export async function compareHash (userPassword: string, dbHash: string): Promise<boolean> {
    return compare(userPassword, dbHash);
}

export class EmailValidator implements ValidationRule {
    validate({ email }: ILoginInput) {
        const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return mailRegex.test(email)
    }
    errorMessage(): string {
        return "Invalid email, plase enter an valid email.";
    }
}

export class NameValidator implements ValidationRule {
    validate({ firstName, lastName }: IRegisterInput): boolean {
        return firstName.length > 4 && lastName.length > 4;
    }
    errorMessage(): string {
        return "Please enter your first and last name correctly.";
    }

}