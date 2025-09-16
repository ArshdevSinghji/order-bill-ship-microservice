import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillingAccountsRepository } from 'src/infrastructure/repositories/billing-account/billing-account.repository';

@Injectable()
export class OrderBilledService {
  constructor(
    @InjectRepository(BillingAccountsRepository)
    private readonly billingAccountsRepository: BillingAccountsRepository,
  ) {}

  async handle(payload) {
    // const { order_id, billing_account_ids, billing_address } = payload;
    // const account =
    //   await this.billingAccountsRepository.getAccountDetails(
    //     billing_account_ids,
    //   );
    // if (!account) {
    //   throw new BadRequestException('Billing account not found');
    // }
    // if (account.balance < payload.order_total) {
    //   throw new BadRequestException('Insufficient balance in billing account');
    // }
    // await account.updateBalance(payload.order_total);
    // await this.billingAccountsRepository.save(account);
  }
}
