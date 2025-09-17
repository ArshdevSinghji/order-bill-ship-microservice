import { Body, Controller, Post } from '@nestjs/common';
import type { BillingProcess } from './billing-process.interface';
import { BillingProcessService } from './billing-process.service';

@Controller('billing')
export class BillingProcessController {
  constructor(private readonly billingProcessService: BillingProcessService) {}

  @Post('/orders')
  async processOrder(@Body() payload: BillingProcess) {
    await this.billingProcessService.processOrder(payload);
  }
}
