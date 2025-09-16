import { OutBoxStatus } from 'src/domain/outbox-message/enums/outbox-status.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOutbox1758000397 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'outbox_message',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
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
            enum: Object.values(OutBoxStatus),
            default: `'${OutBoxStatus.PENDING}'`,
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

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('outbox_message');
  }
}
