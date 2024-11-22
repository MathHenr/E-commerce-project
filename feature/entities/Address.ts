class Address {
    id?: number;
    customerId?: number;
    number!: number;
    cep!: string;
    state!: string;
    city!: string;
    neighborhood!: string;
    street!: string;
    
    private constructor ({ number, cep, state, city, neighborhood, street }: Address) {
        return Object.assign(this, {
            number,
            cep,
            state,
            city,
            neighborhood,
            street,
        })
    }

    static create ({ number, cep, state, city, neighborhood, street }: Address) {
        const address = new Address({ number, cep, state, city, neighborhood, street });
        return address;
    }
}

export { Address };