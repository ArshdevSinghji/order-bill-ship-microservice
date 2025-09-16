import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBilling1758019816000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'billing_accounts',
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
            name: 'balance',
            type: 'decimal',
            default: 0,
            isNullable: false,
          },
          {
            name: 'card_number',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<any> {}
}
