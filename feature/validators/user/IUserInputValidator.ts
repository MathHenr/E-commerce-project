import { User } from "@/feature/entities/User";

interface IUserInputValidator {
    validate(data: User): boolean;
    error: string;
}

export type { IUserInputValidator };