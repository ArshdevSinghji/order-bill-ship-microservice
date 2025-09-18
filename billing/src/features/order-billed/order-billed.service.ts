import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderBilled } from 'src/domain/billing/event/order-billed';
import { PaymentFailed } from 'src/domain/billing/event/payment-failed';
import { SalesOrderPlacedEvent } from 'src/infrastructure/processors/sales-order-placed.ts/sales-order-placed.interface';
import { BillingAccountsRepository } from 'src/infrastructure/repositories/billing-account/billing-account.repository';
import { BillingRepository } from 'src/infrastructure/repositories/billing/billing.repository';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';

@Injectable()
export class OrderBilledService {
  constructor(
    @InjectRepository(BillingAccountsRepository)
    private readonly billingAccountsRepository: BillingAccountsRepository,
    @InjectRepository(OutboxMessageRepository)
    private readonly outboxMessageRepository: OutboxMessageRepository,
    @InjectRepository(BillingRepository)
    private readonly billingRepository: BillingRepository,
  ) {}

  async handle(payload: SalesOrderPlacedEvent) {
    const { order_total, order_id } = payload.sales_order_placed;

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
        await this.outboxMessageRepository.storeOutboxMessage(
          new PaymentFailed(payload.sales_order_placed),
        );
        return;
      }

      if (account.balance < order_total) {
        await this.outboxMessageRepository.storeOutboxMessage(
          new PaymentFailed(payload.sales_order_placed),
        );
        return;
      }

      account.updateBalance(order_total);
      await this.billingAccountsRepository.save(account);

      await this.outboxMessageRepository.storeOutboxMessage(
        new OrderBilled(payload.sales_order_placed),
      );
    } catch (error) {
      console.log('Error processing order billing:', error);
    }
  }
}
