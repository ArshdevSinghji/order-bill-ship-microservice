import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingProcessController } from './billing-process.controller';
import { BillingProcessService } from './billing-process.service';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';
import { BillingRepository } from 'src/infrastructure/repositories/billing/billing.repository';
import { BillingAccountsRepository } from 'src/infrastructure/repositories/billing-account/billing-account.repository';
import { OrderBilledService } from 'src/features/order-billed/order-billed.service';
import { Billing } from 'src/domain/billing/billing.entity';
import { BillingAccount } from 'src/domain/billing-account/billing-account.entity';
import { OutboxMessage } from 'src/domain/outbox-message/outbox-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billing, BillingAccount, OutboxMessage])],
  controllers: [BillingProcessController],
  providers: [
    BillingProcessService,
    OutboxMessageRepository,
    BillingRepository,
    BillingAccountsRepository,
    OrderBilledService,
  ],
  exports: [BillingProcessService],
})
export class BillingProcessModule {}
