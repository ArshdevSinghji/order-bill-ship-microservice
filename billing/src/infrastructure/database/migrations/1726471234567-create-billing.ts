import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBilling1726471234567 implements MigrationInterface {
  name = 'CreateBilling1726471234567';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'billings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            isNullable: false,
          },
          {
            name: 'order_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'billing_account_ids',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'billing_address',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('billings');
  }
}
