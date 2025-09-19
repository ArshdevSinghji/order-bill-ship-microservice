import { Module } from '@nestjs/common';
import { SalesOrderPlacedProcessor } from './sales-order-placed.processor';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { OrderPlacedHandler } from 'src/features/order-placed/order-placed.handler';
import { ShippingRepository } from 'src/infrastructure/repositories/shipping/shipping.repository';

@Module({
  providers: [
    SalesOrderPlacedProcessor,
    InboxMessageRepository,
    OrderPlacedHandler,
    ShippingRepository,
  ],
  exports: [SalesOrderPlacedProcessor],
})
export class SalesOrderPlacedModule {}
