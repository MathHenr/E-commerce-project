interface ICreateCard {
    customerId: string;
    cardHolder: string;
    cardNumber: string;
    cardProvider: string;
    expiration: string;
}

export class CreateCard {
    constructor(
        private credentials: ICreateCard,
    ){
        Object.assign(this, credentials)
    }
}