ALTER TABLE "address" ALTER COLUMN "number" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "payment" ADD COLUMN "card_cvv" varchar NOT NULL;