import { Module } from '@nestjs/common';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { OrderRepository } from 'src/infrastructure/repositories/order/order.repository';
import { LazyLoadHandler } from '../lazy-loader.service';
import { SalesOrderReadyToShipProcessor } from './sales-order-ready-to-ship.processor';
import { OrderStatusReadyToShipService } from 'src/features/order-status/order-status-ready-to-ship.service';

@Module({
  // imports: [TypeOrmModule.forFeature([InboxMessage, Order])],
  providers: [
    LazyLoadHandler,
    SalesOrderReadyToShipProcessor,
    InboxMessageRepository,
    OrderRepository,
    OrderStatusReadyToShipService,
  ],
  exports: [LazyLoadHandler],
})
export class SalesOrderReadyToShipModule {}
