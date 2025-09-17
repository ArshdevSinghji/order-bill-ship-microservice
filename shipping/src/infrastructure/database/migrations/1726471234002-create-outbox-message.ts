import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOutboxMessage1726471234002 implements MigrationInterface {
  name = 'CreateOutboxMessage1726471234002';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.createTable(
      new Table({
        name: 'outbox_message',
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
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'headers',
            type: 'json',
            isNullable: false,
          },
          {
            name: 'properties',
            type: 'json',
            isNullable: false,
          },
          {
            name: 'body',
            type: 'json',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['PENDING', 'SENT', 'FAILED'],
            default: "'PENDING'",
            isNullable: false,
          },
          {
            name: 'sent_at',
            type: 'timestamp',
            isNullable: true,
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

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('outbox_message');
  }
}
