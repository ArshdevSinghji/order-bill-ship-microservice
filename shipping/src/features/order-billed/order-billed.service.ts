import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';
import type { BillingOrderBilledEvent } from './order-billed.interface';
import { ShippingRepository } from 'src/infrastructure/repositories/shipping/shipping.repository';
import { ProductsRepository } from 'src/infrastructure/repositories/products/products.repository';
import { Products } from 'src/domain/product/product.entity';
import { ShippingBackOrdered } from 'src/domain/shipping/event/shipping-back-ordered';
import { Transactional } from 'typeorm-transactional';
import { ShippingLabelCreated } from 'src/domain/shipping/event/shipping-label-created';

@Injectable()
export class OrderBilledService {
  constructor(
    @InjectRepository(OutboxMessageRepository)
    private readonly outboxMessageRepository: OutboxMessageRepository,
    @InjectRepository(ShippingRepository)
    private readonly shippingRepository: ShippingRepository,
    @InjectRepository(ProductsRepository)
    private readonly productsRepository: ProductsRepository,
  ) {}

  @Transactional()
  async handle(payload: BillingOrderBilledEvent) {
    try {
      const { order_id } = payload.billing_order_billed;
      const shipping = await this.shippingRepository.getShippingOrder(order_id);

      if (!shipping) {
        throw new BadRequestException('Shipping order not found');
      }

      shipping.product.map(async (p) => {
        const product: Products | null =
          await this.productsRepository.getProduct(p.product_id);

        if (!product) {
          throw new BadRequestException(`Product not found: ${p.product_id}`);
        }

        if (p?.quantity > product?.quantity_on_hand) {
          throw new BadRequestException(
            `Insufficient stock for product ID: ${p.product_id}`,
          );
        }

        product.updateStock(p.quantity);
        await this.productsRepository.save(product);
      });

      await this.outboxMessageRepository.storeOutboxMessage(
        new ShippingLabelCreated(payload.billing_order_billed),
      );
    } catch (error) {
      console.error('Error handling Billing Order Billed event:', error);
      await this.outboxMessageRepository.storeOutboxMessage(
        new ShippingBackOrdered(payload.billing_order_billed),
      );
    }
  }
}
