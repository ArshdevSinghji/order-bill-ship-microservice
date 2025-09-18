import { Module } from '@nestjs/common';
import { BillingRetrieveController } from './billing-retrieve.controller';
import { BillingRetrieveService } from './billing-retrieve.service';
import { BillingAccountsRepository } from 'src/infrastructure/repositories/billing-account/billing-account.repository';

@Module({
  controllers: [BillingRetrieveController],
  providers: [BillingRetrieveService, BillingAccountsRepository],
  exports: [BillingRetrieveService],
})
export class BillingRetrieveModule {}
