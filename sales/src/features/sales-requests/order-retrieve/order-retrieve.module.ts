import { Module } from '@nestjs/common';
import { OrderRetrieveController } from './order-retrieve.controller';
import { OrderRetrieveService } from './order-retrieve.service';
import { OrderRepository } from 'src/infrastructure/repositories/order/order.repository';

@Module({
  controllers: [OrderRetrieveController],
  providers: [OrderRetrieveService, OrderRepository],
  exports: [OrderRetrieveService],
})
export class OrderRetrieveModule {}
