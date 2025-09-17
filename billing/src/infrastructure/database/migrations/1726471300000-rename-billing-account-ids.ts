import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameBillingAccountIds1726471300000
  implements MigrationInterface
{
  name = 'RenameBillingAccountIds1726471300000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'billings',
      'billing_account_ids',
      'billing_account_id',
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'billings',
      'billing_account_id',
      'billing_account_ids',
    );
  }
}
