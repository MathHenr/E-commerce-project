// types
export interface IPaymentUserData {
    cardHolder: string;
    cardNumber: string;
    cardProvider: string;
    cardExpiration: string;
    cardCvv: string;
}

export interface CardValidationRule {
    validate({}: IPaymentUserData): boolean;
    getError(): string;
}

type CardType = "visa" | "mastercard" | "maestro" | "jcb" | "discover";
// type CardRegex = {
//     [key in CardType]: RegExp;
// }

// functions and class

// removing any spaces that card might have
function regexRemoveSpace (card: string): string {
    return card.replace(/[\s-]/g, '');
} 

// validation class for credit card cvv
export class CardCVValidator implements CardValidationRule {
    validate ({ cardCvv: cvv }: IPaymentUserData): boolean {
        const regex = /^[0-9]{3,4}$/;
        return regex.test(cvv);
    }
    getError(): string {
        return "Invalid CVV.";
    }
}

// validation class for credit card expiration date
export class CardExpirationValidator implements CardValidationRule {
    validate ({ cardExpiration: date }: IPaymentUserData): boolean {
        const present = new Date();
        const today = present.getTime();
    
        // handling format expiratoin DD/MM/YYYY -> YYYY-MM-DD
        const futureDate = date.split('/').reverse().join('/').replace(/\//g, "-");
    
        const future = new Date(futureDate)
        const expiresIn = future.getTime(); 
    
        if (today >= expiresIn) {
            return false;
        }
        
        return true;
    }

    getError(): string {
        return "Invalid expiration date, please enter a future date.";
    }
}

// validation class for credit card provider
export class CardProviderValidator implements CardValidationRule {
    public error: string | undefined;
    public provider: string | undefined;
    
    validate({ cardNumber: card, cardProvider: provider }: IPaymentUserData): boolean {
        const cardStr = regexRemoveSpace(card);
        
        if (!(cardStr.length > 8)) {
            this.error = "Invalid card, please enter a valid one.";
            return false;
        }

        // get card provider
        const flag = this.GetCardProvider(cardStr) ;

        if (!flag) {
            this.error = "Invalid card, please enter a valid one.";
            return false;
        }
        
        
        if (!(provider.toLowerCase() === flag.toLowerCase())) {
            this.error = "Invalid card provider, please enter a valid one.";
            return false;
        }
        
        return true;
    }

    private GetCardProvider (card: string): CardType | false {
        const provider = {
            visa: /^4[0-9]{12}(?:[0-9]{3})/,
            mastercard: /^5[1-5][0-9]{14}/,
            discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
            maestro: /^5(?:018|020|038|893)[0-9]{12}(?:[0-9]{3})/,
            jcb: /^3(?:5[2-8])[0-9]{13}/,
        };

        for (const flag of Object.keys(provider) as CardType[]) {
            if (provider[flag].test(card)) {
                return flag;
            }
        }

        return false;
    }

    getError(): string {
        return this.error!;
    }

}

// validation class for credit card number
export class CardNumberValidator implements CardValidationRule{
    // validating card number with luhn algorithm
    validate({ cardNumber: card }: IPaymentUserData): boolean {
        const cardStr = regexRemoveSpace(card);
        
        // transforming new card into a array and reversing the order of card number
        const popLast = Array.from(cardStr);

        // tranforming the array above into a array of numbers
        const serial = popLast.map((value) => Number.parseInt(value));

        // multiplying the odd digits by 2 and subtracting 9 from those greater than 9 adn adding everything together
        const sum = serial
            .map((value, index) => {
                if ((index + 1) % 2 !== 0) {
                    return value * 2;
                }
                return value;
            })
            .reduce((acc, value, index) => {
                if (((index + 1) % 2) !== 0) {
                    if (value > 9) {
                        const arrToSum = value.toString().split('');
                        const soma = this.sumArr(arrToSum);

                        return acc += soma
                    }
                    return acc += value;
                }
                return acc += value;
            }, 0)

        // validating last digit
        if ((sum % 10) === 0) {
            // valid card
            return true;
        }
        // invalid card
        return false;
    }

    getError(): string {
        return "Invalid card, please enter a valid one. number";
    }

    private sumArr (values: string[]): number {
        return values
                .map((value) => Number.parseInt(value))
                .reduce((acc, value) => {
                    return acc+= value
                }, 0)
    }
}