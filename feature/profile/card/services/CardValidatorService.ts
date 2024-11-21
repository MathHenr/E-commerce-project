import { CardCVValidator, CardExpirationValidator, CardNumberValidator, CardProviderValidator, type CardValidationRule, type IPaymentUserData } from "@/feature/profile/card/validators/CardValidator";

export interface ICardValidatorService {
    validationRule(rules: CardValidationRule[], payment: IPaymentUserData): boolean;
    register(rules: CardValidationRule[], payment: IPaymentUserData): boolean;
    getPayment(): boolean;
}

export function CardValidatorFunction (
    payment: IPaymentUserData
) {
    const newPayment = new CardValidatorService();
    if (!newPayment.register(services, payment)){
        return newPayment.error;
    }
    return true;
}

const services = [
    new CardNumberValidator(),
    new CardProviderValidator(),
    new CardExpirationValidator(),
    new CardCVValidator(),
]

class CardValidatorService implements ICardValidatorService {
    public error: string | undefined;
    
    register(rules: CardValidationRule[], payment: IPaymentUserData): boolean {
        if (!this.validationRule(rules, payment)){
            return false;
        }

        console.log("Card register successfully."); // TODO - register card in database

        return true;
    }
    
    validationRule (rules: CardValidationRule[], payment: IPaymentUserData): boolean {
        for (const rule of rules) {
            if (!rule.validate(payment)) {
                this.error = rule.getError();
                return false;
            }
        }
        return true;
    }

    getPayment(): boolean {
        throw new Error("Method not implemented.");
    }
}