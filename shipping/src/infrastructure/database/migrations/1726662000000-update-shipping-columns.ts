import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateShippingColumns1726662000000 implements MigrationInterface {
  name = 'UpdateShippingColumns1726662000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shippings" RENAME COLUMN "address" TO "billing_address"`
    );

    await queryRunner.query(
      `ALTER TABLE "shippings" RENAME COLUMN "product" TO "products"`
    );

    await queryRunner.query(
      `ALTER TABLE "shippings" ALTER COLUMN "products" TYPE jsonb USING "products"::jsonb`
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shippings" RENAME COLUMN "products" TO "product"`
    );

    await queryRunner.query(
      `ALTER TABLE "shippings" RENAME COLUMN "billing_address" TO "address"`
    );
  }
}