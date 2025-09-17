import { Module } from '@nestjs/common';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { OrderRepository } from 'src/infrastructure/repositories/order/order.repository';
import { LazyLoadHandler } from '../lazy-loader.service';
import { SalesOrderPaymentFailedProcessor } from './sales-order-payment-failed.processor';
import { OrderStatusPaymentFailedService } from 'src/features/order-status/order-status-payment-failed.service';

@Module({
  // imports: [TypeOrmModule.forFeature([InboxMessage, Order])],
  providers: [
    LazyLoadHandler,
    SalesOrderPaymentFailedProcessor,
    InboxMessageRepository,
    OrderRepository,
    OrderStatusPaymentFailedService,
  ],
  exports: [LazyLoadHandler],
})
export class SalesOrderPaymentFailedModule {}
