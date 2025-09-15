import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/domain/order/order.entity';
import { OutboxMessage } from 'src/domain/outbox-message/outbox-message.entity';
import { OrderRepository } from 'src/infrastructure/repositories/order/order.repository';
import { OrderCreatedController } from './order-created.controller';
import { OrderCreatedService } from './order-created.service';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OutboxMessage])],
  controllers: [OrderCreatedController],
  providers: [OrderCreatedService, OrderRepository, OutboxMessageRepository],
  exports: [OrderCreatedService],
})
export class OrderCreatedModule {}
