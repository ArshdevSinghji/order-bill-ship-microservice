import { Body, Controller, Post } from '@nestjs/common';
import type { ShippingOrderPayload } from './shipping-order.interface';
import { ShippingOrderService } from './shipping-order.service';

@Controller('shipping')
export class ShippingOrderController {
  constructor(private readonly shippingOrderService: ShippingOrderService) {}

  @Post('/orders')
  async createShippingOrder(@Body() payload: ShippingOrderPayload) {
    return await this.shippingOrderService.createShippingOrder(payload);
  }
}
