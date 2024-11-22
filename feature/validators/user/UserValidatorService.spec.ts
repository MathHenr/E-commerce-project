import { User } from "@/feature/entities/User";
import { CpfValidator, EmailValidator, PasswordValidator, NameValidator } from "@/feature/validators/user/UserValidatorService";
import { UserValidator } from "./UserValidator";

describe("Validate input data", () => {

    it("We're seending valid data, so do not expect any error", () => {
        const user = User.create({
            firstName: "nome",
            lastName: "sobrenome",
            cpf: "545.628.090-60",
            email: "email@teste.com",
            password: "123123",
        });
        

        const rules = [
            new CpfValidator(),
            new EmailValidator(),
            new PasswordValidator(),
            new NameValidator()
        ]
        
        const valid = new UserValidator(rules, user);
        
        // we expect to recive true;
        expect(valid.validate()).toBe(true);
    })

    it("We're seending a cpf with length different then 11 digits", () => {
        const user = User.create({
            firstName: "nome",
            lastName: "sobrenome",
            cpf: "545.628.090-6012", // cpf with 13 digits
            email: "email@teste.com",
            password: "123123",
        });

        const valid = new CpfValidator();

        // we expect to recive an error
        try {
            valid.validate(user);
        } catch (error) {
            expect(error).toEqual(new Error("Cpf must have exactly 11 digits."));
        }
    })

    it("We're seending a cpf with repeated numbers", () => {
        const user = User.create({
            firstName: "nome",
            lastName: "sobrenome",
            cpf: "111.111.111-11", // cpf with repeated numbers
            email: "email@teste.com",
            password: "123123",
        });

        const valid = new CpfValidator();

        // we expect to recive an error
        try {
            valid.validate(user);
        } catch (error) {
            expect(error).toEqual(new Error("Invalid cpf, please enter a valid one."));
        }
    })

    it("We're seending a invalid cpf", () => {
        const user = User.create({
            firstName: "nome",
            lastName: "sobrenome",
            cpf: "606.531.000-03", // invalid cpf
            email: "email@teste.com",
            password: "123123",
        });

        const valid = new CpfValidator();

        // we expect to recive an error
        try {
            valid.validate(user);
        } catch (error) {
            expect(error).toEqual(new Error("Invalid cpf, please enter a valid one."));
        }
    })

    it("We're seending a password with less than 6 digits", () => {
        const user = User.create({
            firstName: "nome",
            lastName: "sobrenome",
            cpf: "606.531.000-03", 
            email: "email@teste.com",
            password: "12312", // password with less than 6 digits
        });

        const valid = new PasswordValidator();

        // we expect to recive an error
        try {
            valid.validate(user);
        } catch (error) {
            expect(error).toEqual(new Error("Password must have 6+ digits."));
        }
    })

    it("We're seending a invalid email.", () => {
        const user = User.create({
            firstName: "nome",
            lastName: "sobrenome",
            cpf: "606.531.000-03", 
            email: "email@teste.com",
            password: "12312", // password with less than 6 digits
        });

        const valid = new EmailValidator();

        // we expect to recive an error
        try {
            valid.validate(user);
        } catch (error) {
            expect(error).toEqual(new Error("Invalid email, plase enter an valid email."));
        }
    })

    it("We're seending a invalid first name and last name.", () => {
        const user = User.create({
            firstName: "no",
            lastName: "sob",
            cpf: "606.531.000-03", 
            email: "email@teste.com",
            password: "12312", // password with less than 6 digits
        });

        const valid = new EmailValidator();

        // we expect to recive an error
        try {
            valid.validate(user);
        } catch (error) {
            expect(error).toEqual(new Error("Please enter a valid first name/last name."));
        }
    })
});