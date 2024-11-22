interface IUserInputValidator {
    validate(): boolean;
    error: string;
}

export type { IUserInputValidator };