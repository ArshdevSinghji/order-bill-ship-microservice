import { BadRequestException, Injectable } from '@nestjs/common';
import type { BillingProcess } from './billing-process.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { BillingRepository } from 'src/infrastructure/repositories/billing/billing.repository';
import { Transactional } from 'typeorm-transactional';
import { BillingAccountsRepository } from 'src/infrastructure/repositories/billing-account/billing-account.repository';
import { OrderBilledService } from 'src/features/order/order-billed/order-billed.service';

@Injectable()
export class BillingProcessService {
  constructor(
    @InjectRepository(BillingRepository)
    private readonly billingRepository: BillingRepository,
    @InjectRepository(BillingAccountsRepository)
    private readonly billingAccountsRepository: BillingAccountsRepository,
    private readonly orderBilledService: OrderBilledService,
  ) {}

  @Transactional()
  async processOrder(payload: BillingProcess) {
    const billing = await this.billingRepository.createBilling(payload);

    const account = await this.billingAccountsRepository.getAccountDetails(
      payload.billing_account_id,
    );
    if (!account) {
      throw new BadRequestException('Billing account not found');
    }

    return billing;
  }
}
