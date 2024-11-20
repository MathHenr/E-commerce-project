"use server";

import { CEP } from "@/feature/profile/address/validators/AddressValidator";
import { getSession } from "@/feature/profile/GetUserCookieService";
import { AddressRegistrationFunction } from "@/feature/profile/address/services/AddressRegistrationService";

export interface IAddressValidationAPI {
    cep: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
}

export interface IAddressValidation extends IAddressValidationAPI {
    number: number,
}

export interface AddressValidationRule {
    validate({}: IAddressValidation): Promise<boolean>;
    errorMessage(): string;
    addressJson(): IAddressValidation;
}

export async function AddressValidatorServiceFunction (
    data: IAddressValidation
): Promise<string | boolean> {
    const newAddress = new AddressValidatorService();
    if (!await newAddress.validate(data)) {
        return newAddress.errorMessage();
    }
    return true;
}

class AddressValidatorService implements AddressValidationRule {
    protected address: IAddressValidation | undefined;
    protected error: string | undefined;

    async validate (data: IAddressValidation): Promise<boolean> {
        "use server";
        const instance = new CEP();
        if (!await instance.fetchCEP(data.cep)) {
            this.error = instance.error;
            return false;
        }

        this.address = {
            ...instance.address!,
            number: data.number,
        }
        
        if (!this.validateUsersInput(data)) {
            return false
        }
        
        if (!await this.register()){
            return false
        };
        
        return true;
    }
    
    errorMessage(): string {
        return this.error!;
    }

    addressJson (): IAddressValidation {
        return this.address!
    }

    // Validating users input address with output we recive from the API cep
    private validateUsersInput (data: IAddressValidation): boolean {
        for (const [dataKey, dataValue] of Object.entries(data)) {
            for (const [cepKey, cepValue] of Object.entries(this.address!)) {
                if (dataKey === cepKey) {

                    // removing accents and comparing strings
                    const userInput: string = dataValue.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase();
                    const apiOutput: string = cepValue.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase();

                    if (!(userInput === apiOutput)) {
                        this.error = `Address was not found, ${cepKey} input must be wrong.`
                        return false;
                    }
                }
            }
        }
        return true;
    }

    // inserting Address in database!
    private async register (): Promise<boolean> {
        const userId = await getSession();

        if (!userId) {
            this.error = "You're not in a session, please sign-in."
            return false;
        }

        const newAddress = await AddressRegistrationFunction(
            this.address!,
            userId,
        );

        if (typeof newAddress === 'string') {
            this.error = newAddress;
            return false;
        }
        
        return true;
    }
}