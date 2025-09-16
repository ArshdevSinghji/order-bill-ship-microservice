import { Module } from '@nestjs/common';
import { LazyLoadHandler } from '../lazy-loader.service';
import { SalesOrderPlacedProcessor } from './sales-order-placed.processor';

@Module({
  imports: [],
  providers: [LazyLoadHandler, SalesOrderPlacedProcessor],
  exports: [SalesOrderPlacedProcessor],
})
export class SalesOrderPlacedModule {}
