import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillingAccountsRepository } from 'src/infrastructure/repositories/billing-account/billing-account.repository';

@Injectable()
export class BillingRetrieveService {
  constructor(
    @InjectRepository(BillingAccountsRepository)
    private readonly billingAccountsRepository: BillingAccountsRepository,
  ) {}

  async getAccounts() {
    return await this.billingAccountsRepository.getAccounts();
  }
}
