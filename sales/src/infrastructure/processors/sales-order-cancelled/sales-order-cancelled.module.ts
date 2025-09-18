import { Module } from '@nestjs/common';
import { LazyLoadHandler } from '../lazy-loader.service';
import { SalesOrderCancelledProcessor } from './sales-order-cancelled.processor';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { OrderRepository } from 'src/infrastructure/repositories/order/order.repository';
import { OrderStatusCancelledService } from 'src/features/order-status/order-status-cancelled.service';

@Module({
  // imports: [TypeOrmModule.forFeature([InboxMessage, Order])],
  providers: [
    LazyLoadHandler,
    SalesOrderCancelledProcessor,
    InboxMessageRepository,
    OrderRepository,
    OrderStatusCancelledService,
  ],
  exports: [LazyLoadHandler],
})
export class SalesOrderCancelledModule {}
