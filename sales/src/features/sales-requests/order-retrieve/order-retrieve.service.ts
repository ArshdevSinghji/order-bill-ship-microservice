import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from 'src/infrastructure/repositories/order/order.repository';

@Injectable()
export class OrderRetrieveService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) {}

  async getOrders() {
    return await this.orderRepository.getOrder();
  }
}
