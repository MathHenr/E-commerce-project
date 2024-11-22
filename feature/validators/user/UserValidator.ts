import { User } from "@/feature/entities/User";
import { IValidationRules } from "../IValidationRules";
import { IUserInputValidator } from "./IUserInputValidator";

class UserValidator implements IUserInputValidator{
    public error!: string;

    constructor(
        public rules: IValidationRules[],
        public user: User
    ) {
        return Object.assign(this,{
            rules,
            user,
        })
    }

    validate(): boolean {
        try {
            for (const rule of this.rules){
                if (!rule.validate(this.user)) {
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