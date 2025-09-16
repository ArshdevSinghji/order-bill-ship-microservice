import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBilling1758000462 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'billings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
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

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('billings');
  }
}
