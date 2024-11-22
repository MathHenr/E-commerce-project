import { User } from "@/feature/entities/User";
import { IValidationRules } from "../IValidationRules";
import { IUserInputValidator } from "./IUserInputValidator";

class UserValidator implements IUserInputValidator{
    public error!: string;

    constructor(
        public rules: IValidationRules[],
    ) {
        return Object.assign(this,{
            rules,
        })
    }

    validate(data: User): boolean {
        try {
            for (const rule of this.rules){
                if (!rule.validate(data)) {
                    return false;
                }
            }
            return true;
        } catch (error) {
            if (error instanceof Error) {
                this.error = error.message;
            }
            return false;
        }
    }
}

export { UserValidator };