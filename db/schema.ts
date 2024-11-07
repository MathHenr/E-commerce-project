import { relations } from "drizzle-orm";
import { 
    varchar, 
    pgTable, 
    integer, 
    timestamp, 
    foreignKey
} from "drizzle-orm/pg-core";

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

export const addressTable = pgTable("address", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    costumerId: integer("costumer_id").notNull(),
    cep: varchar({ length: 255 }).notNull(),
    state: varchar({ length: 255 }).notNull(),
    city: varchar({ length: 255 }).notNull(),
    neighborhood: varchar({ length: 255 }).notNull(),
    street: varchar({ length: 255 }).notNull(),
    number: integer().notNull(),
})

export const userRelations = relations(usersTable, ({ many }) => ({
    addressTable: many(addressTable)
}))
export const addressRelations = relations(addressTable, ({ one }) => ({
    usersTable: one(usersTable, {
        fields: [addressTable.costumerId],
        references: [usersTable.id],
    })
}))