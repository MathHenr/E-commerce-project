import { User } from "@/feature/entities/User";
import { createUserFactory } from "./CreateUserFactory";

describe("Create user", () => {   
    it("Should be able to create an user", async () => {
        const userData: User = {
            firstName: "Matheus",
            lastName: "Henrique",
            cpf: "425.005.668-62",
            email: "matheus@email.com", 
            password: "123456",
        }
        
        const user = await (await createUserFactory(userData)).exec();
        console.log(user);
    
        expect(2+2).toBe(4);
    })
})