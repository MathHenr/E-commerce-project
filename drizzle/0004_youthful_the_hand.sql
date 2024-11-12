ALTER TABLE "address" ALTER COLUMN "customer_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "address" ALTER COLUMN "cep" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "address" ALTER COLUMN "state" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "address" ALTER COLUMN "city" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "address" ALTER COLUMN "neighborhood" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "address" ALTER COLUMN "street" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "address" ALTER COLUMN "number" DROP NOT NULL;