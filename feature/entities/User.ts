import { Address } from "./Address";

class User {
    id?: number;
    firstName!: string;
    lastName!: string;
    cpf!: string;
    email!: string; 
    password!: string;
    addressTable?: Address;

    private constructor({ firstName, lastName, cpf, email, password }: User) {
        return Object.assign(this,{
            firstName,
            lastName,
            cpf: cpf.replace(/[\s-.]/g, ''),
            email,
            password,
        });
    }

    static create ({ firstName, lastName, cpf, email, password }: User) {
        const user = new User({ firstName, lastName, cpf, email, password });
        return user;
    }
}

export { User };