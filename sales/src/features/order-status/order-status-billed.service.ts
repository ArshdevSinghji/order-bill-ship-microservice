import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from 'src/infrastructure/repositories/order/order.repository';

@Injectable()
export class OrderStatusBilledService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) {}

  async handle(orderId: string) {
    const order = await this.orderRepository.getOrderById(orderId);

    if (!order) {
      throw new BadRequestException('Order not found');
    }

    order.markAsBilled();

    return await this.orderRepository.save(order);
  }
}
