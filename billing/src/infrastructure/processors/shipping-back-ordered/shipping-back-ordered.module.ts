import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LazyLoadHandler } from '../lazy-loader.service';
import { InboxMessageRepository } from '../../repositories/inbox-message/inbox-message.repository';
import { BillingAccountsRepository } from '../../repositories/billing-account/billing-account.repository';
import { ShippingBackOrderedService } from '../../../features/shipping-back-ordered/shipping-back-ordered.service';
import { BillingRepository } from '../../repositories/billing/billing.repository';
import { OutboxMessageRepository } from '../../repositories/outbox-message/outbox-message.repository';
import { InboxMessage } from '../../../domain/inbox-message/inbox-message.entity';
import { BillingAccount } from '../../../domain/billing-account/billing-account.entity';
import { Billing } from '../../../domain/billing/billing.entity';
import { OutboxMessage } from '../../../domain/outbox-message/outbox-message.entity';
import { ShippingBackOrderedProcessor } from './shipping-back-ordered.processor';

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
    ShippingBackOrderedService,
    InboxMessageRepository,
    BillingAccountsRepository,
    BillingRepository,
    OutboxMessageRepository,
    ShippingBackOrderedProcessor,
  ],
  exports: [ShippingBackOrderedProcessor],
})
export class ShippingBackOrderedModule {}
