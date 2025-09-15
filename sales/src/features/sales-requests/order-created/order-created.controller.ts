import { Body, Controller, Post } from '@nestjs/common';
import { OrderCreatedService } from './order-created.service';

@Controller('sales')
export class OrderCreatedController {
  constructor(private readonly handler: OrderCreatedService) {}

  @Post('/orders')
  async create(@Body() order: any) {
    return await this.handler.handle(order);
  }
}
