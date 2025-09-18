import { Injectable } from '@nestjs/common';
import { Order } from 'src/domain/order/order.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async getOrder(id?: string) {
    return await this.find({ where: { id } });
  }

  async createOrder(order: Order) {
    return await this.save(order);
  }
}
