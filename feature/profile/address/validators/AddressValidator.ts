import type { IAddressValidation } from "@/feature/profile/address/services/AddressValidatorService";


// TYPES
export interface IAddressUserData {
    number: number;
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
}


export class CEP {
    private readonly apiUrl: string = "https://brasilapi.com.br/api/cep/v1/";
    public error: string | undefined;
    public address: IAddressValidation | undefined;
    
    public async fetchCEP (cep: string): Promise<boolean> {
        const cleanCEP = cep.replace(/\D/g,'');
        
        if (!this.validateFormatCep(cleanCEP)) {
            this.error = "CEP must have exactly 8 digits.";
            return false;
        }

        try {
            const response = await fetch(this.apiUrl + cleanCEP);

            if (!response.ok) {
                this.error = "CEP was not found.";
                return false;
            }

            const { service, ...data } = await response.json();
            
            this.address = data;
            
            return true;
        } catch (error) {
            this.error = "Something went wrong, please try again later.";
            return false;
        }
    }

    private validateFormatCep (cep: string): boolean {
        return cep.length === 8
    }
}