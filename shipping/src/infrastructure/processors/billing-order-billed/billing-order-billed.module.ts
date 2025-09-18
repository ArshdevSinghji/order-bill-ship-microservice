import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderBilledService } from 'src/features/order-billed/order-billed.service';
import { BillingOrderBilledProcessor } from './billing-order-billed.processor';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';
import { ShippingRepository } from 'src/infrastructure/repositories/shipping/shipping.repository';
import { ProductsRepository } from 'src/infrastructure/repositories/products/products.repository';
import { OutboxMessage } from 'src/domain/outbox-message/outbox-message.entity';
import { Shipping } from 'src/domain/shipping/shipping.entity';
import { Products } from 'src/domain/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OutboxMessage, Shipping, Products])],
  providers: [
    OrderBilledService,
    BillingOrderBilledProcessor,
    InboxMessageRepository,
    OutboxMessageRepository,
    ShippingRepository,
    ProductsRepository,
  ],
  exports: [],
})
export class BillingOrderBilledModule {}
