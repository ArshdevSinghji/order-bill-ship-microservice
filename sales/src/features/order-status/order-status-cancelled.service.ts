import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from 'src/infrastructure/repositories/order/order.repository';

@Injectable()
export class OrderStatusCancelledService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) {}

  async handle(orderId: string) {
    const order = await this.orderRepository.getOrder(orderId);

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    order[0].markAsCancelled();

    return await this.orderRepository.save(order[0]);
  }
}
