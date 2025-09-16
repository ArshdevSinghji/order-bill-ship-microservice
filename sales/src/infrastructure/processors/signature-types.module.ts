import { Module } from '@nestjs/common';
import { SignatureTypes } from './signature-types.service';
import { LazyLoadHandler } from './lazy-loader.service';
import { SalesOrderPlacedModule } from './sales-order-placed.ts/sales-order-placed.module';
import { SalesOrderBilledModule } from './sales-order-billed.ts/sales-order-billed.module';

@Module({
  imports: [SalesOrderPlacedModule, SalesOrderBilledModule],
  providers: [SignatureTypes, LazyLoadHandler],
  exports: [SignatureTypes],
})
export class SignatureTypesModule {}
