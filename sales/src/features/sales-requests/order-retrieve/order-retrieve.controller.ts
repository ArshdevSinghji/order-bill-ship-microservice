import { Controller, Get, Param } from '@nestjs/common';
import { OrderRetrieveService } from './order-retrieve.service';

@Controller('sales')
export class OrderRetrieveController {
  constructor(private readonly orderRetrieveService: OrderRetrieveService) {}

  @Get('/orders')
  async getOrders() {
    return await this.orderRetrieveService.getOrders();
  }
}
