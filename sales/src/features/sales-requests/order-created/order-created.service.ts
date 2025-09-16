import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderPlaced } from 'src/domain/order/event/order-placed';
import { Order } from 'src/domain/order/order.entity';
import { OrderRepository } from 'src/infrastructure/repositories/order/order.repository';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class OrderCreatedService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
    @InjectRepository(OutboxMessageRepository)
    private readonly outboxMessageRepository: OutboxMessageRepository,
  ) {}

  @Transactional()
  async handle(order: Order) {
    const savedOrder = await this.orderRepository.createOrder(order);
    await this.outboxMessageRepository.storeOutboxMessage(
      new OrderPlaced(savedOrder),
    );
    return savedOrder;
  }
}
