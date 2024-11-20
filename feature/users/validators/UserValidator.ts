import { genSaltSync, hashSync } from "bcrypt-ts";

export interface ValidationRule {
    validate({}: UserInput): boolean;
    errorMessage(): string;
}

export interface UserInput {
    firstName: string;
    lastName: string;
    email: string;
    cpf: string;
    password: string;
}

export class CPFValidator implements ValidationRule {
    validate({ cpf }: UserInput): boolean {
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
    validate({ password }: UserInput): boolean{
        if (password.length <= 6) {
            return false;
        }
        return true;
    }

    errorMessage(): string {
        return "Password must have more than 6 digits.";
    }
}

export function hash (password: string): string {
    const salt = genSaltSync(8);
    const hash = hashSync(password, salt);
    return hash;
}

export class EmailValidator implements ValidationRule {
    validate({ email }: UserInput) {
        const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return mailRegex.test(email)
    }
    errorMessage(): string {
        return "Invalid email, plase enter an valid email.";
    }
}

export class NameValidator implements ValidationRule {
    validate({ firstName, lastName }: UserInput): boolean {
        return firstName.length > 4 && lastName.length > 4;
    }
    errorMessage(): string {
        return "Please enter your first and last name correctly.";
    }

}