import { Module } from '@nestjs/common';
import { LazyLoadHandler } from '../lazy-loader.service';
import { SalesOrderBilledProcessor } from './sales-order-billed.processor';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { OrderRepository } from 'src/infrastructure/repositories/order/order.repository';
import { OrderStatusBilledService } from 'src/features/order-status/order-status-billed.service';

@Module({
  providers: [
    LazyLoadHandler,
    SalesOrderBilledProcessor,
    InboxMessageRepository,
    OrderRepository,
    OrderStatusBilledService,
  ],
  exports: [LazyLoadHandler],
})
export class SalesOrderBilledModule {}
