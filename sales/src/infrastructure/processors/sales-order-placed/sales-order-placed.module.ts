import { Module } from '@nestjs/common';
import { OrderStatusPlacedService } from 'src/features/order-status/order-status-placed.service';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { OrderRepository } from 'src/infrastructure/repositories/order/order.repository';
import { LazyLoadHandler } from '../lazy-loader.service';
import { SalesOrderPlacedProcessor } from './sales-order-placed.processor';

@Module({
  // imports: [TypeOrmModule.forFeature([InboxMessage, Order])],
  providers: [
    LazyLoadHandler,
    SalesOrderPlacedProcessor,
    InboxMessageRepository,
    OrderRepository,
    OrderStatusPlacedService,
  ],
  exports: [LazyLoadHandler],
})
export class SalesOrderPlacedModule {}
