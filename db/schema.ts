import { varchar, pgTable, integer, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    firstName: varchar({ length: 255 }).notNull(),
    lastName: varchar({ length:255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    cpf: varchar({ length: 11 }).notNull(),
    cep: varchar(), // colocar dependencias do cep
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
})