
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
        };
        
        const user = await createUserFactory().exec(userData);
    
        expect(user).toHaveProperty("id");
    })

    it("Should not be able to create an user that already exist", async () => {
        const userData: User = {
            firstName: "Matheus teste",
            lastName: "Henrique teste",
            cpf: "592.538.230-70",
            email: "matheus@email1.com", 
            password: "123456qewqwe",
        };

        const create = createUserFactory();

        await create.exec(userData);
        
        try {
            await create.exec(userData);
        } catch (error) {
            return expect(error)
                .toEqual(new Error("Email already vinculated to an account."));
        }
    })
})