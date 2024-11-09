import { genSaltSync, hashSync } from "bcrypt-ts"

export interface UserData {
    success: boolean | null,
    schema: {
        readonly firstName: string
        readonly lastName: string
        readonly email: string
        cpf: string
        password: string
    },
    error_message: string[],
}

export class Validation {
    public readonly response: UserData = {
        success: null,
        schema: {
            firstName: "",
            lastName: "",
            email: "",
            cpf: "",
            password: ""
        },
        error_message: []
    }
    
    constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        private readonly _cpf: string,
        private readonly _password: string,
    ) {
        this._cpf = this._cpf.replace(/\D/g,'')
        this.response = {
            success: true,
            schema: {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                cpf: "",
                password: "",
            },
            error_message: []
        }
    }

    public validate (): UserData {
        this.validateCpf() 
        this.hashPassword()
        
        if (this.response.success === false || this.response.error_message.length > 0) {
            return this.response
        }
        
        return this.response
    }

    private hashPassword () {
        const salt = genSaltSync(8)
        const hash = hashSync(this._password, salt)
        this.response.schema.password = hash
    }

    private validateCpf (): void {
        if (!this._cpf) return this.setErrors("Cpf field is missing") 
        if (this._cpf.length !== 11) return this.setErrors("Please checkout cpf field")
        if (this._cpf.charAt(0).repeat(this._cpf.length) === this._cpf) return this.setErrors("Invalid cpf, please checkout cpf field!")
        
        const cpfToBeCalculated = this._cpf.slice(0, -2)
        const firstDigit = this.cpfCaculator(cpfToBeCalculated)
        const secondDigit = this.cpfCaculator(cpfToBeCalculated + firstDigit)

        if (this._cpf !== (cpfToBeCalculated + firstDigit + secondDigit)) {
            this.setErrors("Invalid cpf, please checkout cpf field!")
            return
        }
        this.response.schema.cpf = this._cpf
        return
    }

    private cpfCaculator (cpf: string): string {
        const arr = Array.from(cpf)
        let counter = cpf.length + 1

        const sum = arr.reduce((ac, value) => {
            ac += counter * Number(value)
            counter--
            return ac
        }, 0)

        const digit = 11 - (sum % 11)
        return digit > 9 ? '0' : String(digit)
    }
    
    private setErrors (message: string) {
        this.response.success = false
        this.response.error_message.push(message)
        return
    } 
}
