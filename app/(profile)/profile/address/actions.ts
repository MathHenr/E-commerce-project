export interface Address {
    cep: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    service?: string,
}

export class CEP {
    private readonly apiUrl: string = "https://brasilapi.com.br/api/cep/v1/"
    public message: string = ""
    public response: Address = {
        cep: "",
        state: "",
        city: "",
        neighborhood: "",
        street: "",
        service:"",
    }
    
    constructor(
        public readonly cep: string,
    ){}

    public async getCep (): Promise<Address|string> {
        const info = await this.getCepData()
        if (this.message.length > 0) {
            return this.message
        }
        this.response = {...info!}
        return this.response
    }
    
    private async getCepData (): Promise<Address | void> {
        if (!this.validateCep()) {
            this.setErrors("CEP must have exactly 8 digits.")
            return 
        }
        try {
            const res = await fetch(this.apiUrl + this.cep)
            if (!res.ok) {
                this.setErrors("CEP was not found.")
                return 
            }
            const data: Address = await res.json()
            // verifying data format
            if (!this.attributeData(data, true)) {
                this.setErrors("Something went wrong, please try again later.")
                return 
            }

            return data
        } catch (error) {
            this.setErrors("Something went wrong, please try again later.")
            return
        }
    }

    private validateCep (): boolean {
        return this.cep.replace(/\D/g,'').length === 8
    }

    private attributeData (data: Address, typed: boolean): boolean {
        for (const value in data) {
            (!this.response.hasOwnProperty(value)) 
            ? typed = false : null
        }
        return typed
    }

    private setErrors (message: string) {
        this.message = message
        return
    }
}

const user = new CEP("13088136")
user.getCep()