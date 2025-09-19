import { BadRequestException, Injectable } from '@nestjs/common';
import type { SalesOrderPlacedEvent } from './order-placed.interface';
import { Transactional } from 'typeorm-transactional';
import { ShippingRepository } from 'src/infrastructure/repositories/shipping/shipping.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderPlacedHandler {
  constructor(
    @InjectRepository(ShippingRepository)
    private readonly shippingRepository: ShippingRepository,
  ) {}

  @Transactional()
  async handle(payload: SalesOrderPlacedEvent) {
    try {
      const { order_id } = payload.sales_order_placed;
      console.log(`Processing order ${order_id} for shipping`);

      const shipping = await this.shippingRepository.getShippingOrder(order_id);

      if (!shipping) {
        throw new BadRequestException('Shipping order not found');
      }

      shipping.placeOrder();
      await this.shippingRepository.save(shipping);
    } catch (error) {
      console.error('Error handling Billing Order Billed event:', error);
    }
  }
}
