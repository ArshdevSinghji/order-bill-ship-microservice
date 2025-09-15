import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderTable1757935444359 implements MigrationInterface {
    name = 'CreateOrderTable1757935444359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."outbox_message_status_enum" AS ENUM('SENT', 'PENDING')`);
        await queryRunner.query(`CREATE TABLE "outbox_message" ("id" SERIAL NOT NULL, "message_id" uuid NOT NULL, "type" character varying(255) NOT NULL, "headers" json NOT NULL, "properties" json NOT NULL, "body" json NOT NULL, "status" "public"."outbox_message_status_enum" NOT NULL DEFAULT 'PENDING', "sent_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_452f044f9b3436b9fcfa3f8f520" UNIQUE ("message_id"), CONSTRAINT "PK_2f36ee5236f2793f3e7bd554589" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('PENDING', 'PLACED', 'BILLED', 'PAYMENT_FAILED', 'READY_TO_SHIP', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "products" jsonb NOT NULL, "customer_id" uuid NOT NULL, "total_amount" numeric NOT NULL, "status" "public"."order_status_enum" NOT NULL DEFAULT 'PENDING', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inbox_message" ("id" SERIAL NOT NULL, "message_id" uuid NOT NULL, "handler_name" character varying NOT NULL, "handled_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "unique_message_handler" UNIQUE ("message_id", "handler_name"), CONSTRAINT "PK_bbd15267b116fd3c45f459a65fa" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "inbox_message"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`DROP TABLE "outbox_message"`);
        await queryRunner.query(`DROP TYPE "public"."outbox_message_status_enum"`);
    }

}
