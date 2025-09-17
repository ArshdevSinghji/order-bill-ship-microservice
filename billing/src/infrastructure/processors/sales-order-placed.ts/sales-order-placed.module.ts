import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LazyLoadHandler } from '../lazy-loader.service';
import { SalesOrderPlacedProcessor } from './sales-order-placed.processor';
import { InboxMessageRepository } from '../../repositories/inbox-message/inbox-message.repository';
import { OrderBilledService } from '../../../features/order/order-billed/order-billed.service';
import { BillingAccountsRepository } from '../../repositories/billing-account/billing-account.repository';
import { BillingProcessService } from '../../../features/billing-requests/billing-process/billing-process.service';
import { BillingRepository } from '../../repositories/billing/billing.repository';
import { OutboxMessageRepository } from '../../repositories/outbox-message/outbox-message.repository';
import { InboxMessage } from '../../../domain/inbox-message/inbox-message.entity';
import { BillingAccount } from '../../../domain/billing-account/billing-account.entity';
import { Billing } from '../../../domain/billing/billing.entity';
import { OutboxMessage } from '../../../domain/outbox-message/outbox-message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InboxMessage,
      BillingAccount,
      Billing,
      OutboxMessage,
    ]),
  ],
  providers: [
    LazyLoadHandler,
    SalesOrderPlacedProcessor,
    OrderBilledService,
    BillingProcessService,
    InboxMessageRepository,
    BillingAccountsRepository,
    BillingRepository,
    OutboxMessageRepository,
  ],
  exports: [SalesOrderPlacedProcessor],
})
export class SalesOrderPlacedModule {}
