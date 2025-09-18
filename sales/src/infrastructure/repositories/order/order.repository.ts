import { Injectable } from '@nestjs/common';
import { Order } from 'src/domain/order/order.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async getOrderById(id?: string) {
    return await this.findOne({ where: { id } });
  }

  async getOrders() {
    return await this.find();
  }

  async createOrder(order: Order) {
    return await this.save(order);
  }
}
