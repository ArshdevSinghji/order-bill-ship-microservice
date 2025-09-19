import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateShippingTable1726471235001 implements MigrationInterface {
  name = 'UpdateShippingTable1726471235001';

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "shippings" ADD "is_placed" boolean NOT NULL DEFAULT false`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "shippings" ADD "is_billed" boolean NOT NULL DEFAULT false`,
      undefined,
    );
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "shippings" DROP COLUMN "is_placed"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "shippings" DROP COLUMN "is_billed"`,
      undefined,
    );
  }
}
