import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRefunded } from 'src/domain/billing/event/order-refunded';
import { ShippingBackOrderedEvent } from 'src/infrastructure/processors/shipping-back-ordered/shipping-back-ordered.interface';
import { BillingAccountsRepository } from 'src/infrastructure/repositories/billing-account/billing-account.repository';
import { BillingRepository } from 'src/infrastructure/repositories/billing/billing.repository';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';

@Injectable()
export class ShippingBackOrderedService {
  constructor(
    @InjectRepository(BillingAccountsRepository)
    private readonly billingAccountsRepository: BillingAccountsRepository,
    @InjectRepository(OutboxMessageRepository)
    private readonly outboxMessageRepository: OutboxMessageRepository,
    @InjectRepository(BillingRepository)
    private readonly billingRepository: BillingRepository,
  ) {}

  async handle(payload: ShippingBackOrderedEvent) {
    const { order_total, order_id } = payload.shipping_back_ordered;

    try {
      const billingAccount =
        await this.billingRepository.getBillingDetails(order_id);

      if (!billingAccount) {
        throw new BadRequestException('Billing account not found');
      }

      const billing_account_id = billingAccount.billing_account_id;

      const account =
        await this.billingAccountsRepository.getAccountDetails(
          billing_account_id,
        );

      if (!account) {
        throw new BadRequestException('Billing account not found');
      }

      await account.refundBalance(order_total);
      await this.billingAccountsRepository.save(account);

      await this.outboxMessageRepository.storeOutboxMessage(
        new OrderRefunded(payload.shipping_back_ordered),
      );
    } catch (error) {
      console.log('Error processing order billing:', error);
    }
  }
}
