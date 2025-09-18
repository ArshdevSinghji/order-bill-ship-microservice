import { Module } from '@nestjs/common';
import { ShippingOrderController } from './shipping-order.controller';
import { ShippingOrderService } from './shipping-order.service';
import { ShippingRepository } from 'src/infrastructure/repositories/shipping/shipping.repository';

@Module({
  imports: [],
  controllers: [ShippingOrderController],
  providers: [ShippingOrderService, ShippingRepository],
  exports: [ShippingOrderService],
})
export class ShippingOrderModule {}
