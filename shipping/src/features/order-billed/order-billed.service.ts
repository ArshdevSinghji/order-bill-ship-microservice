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
      console.log(`Processing order ${order_id} for shipping`);

      const shipping = await this.shippingRepository.getShippingOrder(order_id);

      if (!shipping) {
        throw new BadRequestException('Shipping order not found');
      }

      let hasInsufficientStock = false;

      for (const p of shipping.products) {
        const product: Products | null =
          await this.productsRepository.getProduct(p.product_id);

        if (!product) {
          throw new BadRequestException(`Product not found: ${p.product_id}`);
        }

        if (p?.quantity > product?.quantity_on_hand) {
          console.log(
            '========================INSUFFICIENT STOCK==================',
          );
          hasInsufficientStock = true;
          break;
        }

        product.updateStock(p.quantity);
        await this.productsRepository.save(product);
      }

      if (hasInsufficientStock) {
        console.log('Dispatching ShippingBackOrdered event');
        await this.outboxMessageRepository.storeOutboxMessage(
          new ShippingBackOrdered(payload.billing_order_billed),
        );
      } else {
        console.log('Dispatching ShippingLabelCreated event');
        await this.outboxMessageRepository.storeOutboxMessage(
          new ShippingLabelCreated(payload.billing_order_billed),
        );
      }
    } catch (error) {
      console.error('Error handling Billing Order Billed event:', error);
      await this.outboxMessageRepository.storeOutboxMessage(
        new ShippingBackOrdered(payload.billing_order_billed),
      );
    }
  }
}
