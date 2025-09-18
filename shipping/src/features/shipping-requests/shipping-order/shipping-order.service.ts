import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShippingRepository } from 'src/infrastructure/repositories/shipping/shipping.repository';
import { ShippingOrderPayload } from './shipping-order.interface';

@Injectable()
export class ShippingOrderService {
  constructor(
    @InjectRepository(ShippingRepository)
    private readonly shippingRepository: ShippingRepository,
  ) {}

  async createShippingOrder(payload: ShippingOrderPayload) {
    return await this.shippingRepository.createShippingOrder(payload);
  }
}
