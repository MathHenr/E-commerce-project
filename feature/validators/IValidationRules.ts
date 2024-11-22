import { User } from "@/feature/entities/User";

interface IValidationRules {
    validate({}: User): boolean;
}

export type { IValidationRules };