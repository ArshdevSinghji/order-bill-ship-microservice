import { Injectable } from '@nestjs/common';
import { Shipping } from 'src/domain/shipping/shipping.entity';
import { ShippingOrderPayload } from 'src/features/shipping-requests/shipping-order/shipping-order.interface';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ShippingRepository extends Repository<Shipping> {
  constructor(dataSource: DataSource) {
    super(Shipping, dataSource.createEntityManager());
  }

  async createShippingOrder(payload: ShippingOrderPayload) {
    const shipping = this.create(payload);
    return await this.save(shipping);
  }

  async getShippingOrder(id: string) {
    return await this.findOne({ where: { order_id: id } });
  }
}
