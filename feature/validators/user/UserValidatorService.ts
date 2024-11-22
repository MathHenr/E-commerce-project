import { User } from "@/feature/entities/User";
import { IValidationRules } from "../IValidationRules";

// class to validate a Cpf serial
class CpfValidator implements IValidationRules {

    validate({ cpf }: User): boolean {
        // remove spaces and signs
        const _cpf = cpf.replace(/[\s-.]/g, ''); 
        
        if (_cpf.length !== 11) {
            throw new Error("Cpf must have exactly 11 digits.");
        };

        if (_cpf.charAt(0).repeat(_cpf.length) === cpf) {
            throw new Error("Invalid cpf, please enter a valid one.");
        };
        
        const cpfToBeCalculated = _cpf.slice(0, -2);
        const firstDigit = this.calc(cpfToBeCalculated);
        const secondDigit = this.calc(cpfToBeCalculated + firstDigit);

        if (_cpf !== (cpfToBeCalculated + firstDigit + secondDigit)) {
            throw new Error("Invalid cpf, please enter a valid one.");
        };

        return true;
    }

    // this function do the calculation to validate a cpf serial
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

// class to validate a password length
class PasswordValidator implements IValidationRules {

    validate({ password }: User): boolean {
        if (password.length < 6) {
            throw new Error("Password must have 6+ digits.");
        }
        return true;
    }

}

// class to validate if email format is valid
class EmailValidator implements IValidationRules {

    validate({ email }: User): boolean {
        const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!mailRegex.test(email)) {
            throw new Error("Invalid email, plase enter an valid email.");
        }
        return true;
    }
}

// class to validate first name and last name length
class NameValidator implements IValidationRules {

    validate({ firstName, lastName }: User): boolean {
        if (!(firstName.length >= 4 && lastName.length >= 4)){
            throw new Error("Please enter a valid first name/last name.");
        }
        return true;
    }
}

export { CpfValidator, PasswordValidator, EmailValidator, NameValidator };