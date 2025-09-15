import { Module } from '@nestjs/common';
import { LazyLoadHandler } from '../lazy-loader.service';

@Module({
  imports: [],
  providers: [LazyLoadHandler],
  exports: [],
})
export class SalesOrderPlacedModule {}
