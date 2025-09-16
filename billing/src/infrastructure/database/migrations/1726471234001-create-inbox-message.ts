import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateInboxMessage1726471234001 implements MigrationInterface {
  name = 'CreateInboxMessage1726471234001';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'inbox_message',
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
            name: 'message_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'handler_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'handled_at',
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

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('inbox_message');
  }
}
