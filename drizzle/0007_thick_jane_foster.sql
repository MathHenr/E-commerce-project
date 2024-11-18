CREATE TABLE IF NOT EXISTS "payment" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "payment_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"customer_id" integer NOT NULL,
	"card_holder" varchar NOT NULL,
	"card_number" varchar(16) NOT NULL,
	"card_provider" varchar NOT NULL,
	"card_expiration" varchar NOT NULL
);
