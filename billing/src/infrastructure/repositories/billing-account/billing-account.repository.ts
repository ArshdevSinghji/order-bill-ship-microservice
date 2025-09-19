import { Injectable } from '@nestjs/common';
import { BillingAccount } from 'src/domain/billing-account/billing-account.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BillingAccountsRepository extends Repository<BillingAccount> {
  constructor(dataSource: DataSource) {
    super(BillingAccount, dataSource.createEntityManager());
  }

  async getAccounts() {
    return await this.find();
  }

  async getAccountDetail(accountId: string) {
    return await this.findOne({
      where: { id: accountId },
      lock: { mode: 'pessimistic_write' },
    });
  }
}
