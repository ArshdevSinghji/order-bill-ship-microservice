import { Module } from '@nestjs/common';
import { SignatureTypes } from './signature-types.service';
import { LazyLoadHandler } from './lazy-loader.service';
import { ShippingBackOrderedModule } from './shipping-back-ordered/shipping-back-ordered.module';
import { SalesOrderPlacedModule } from './sales-order-placed.ts/sales-order-placed.module';

@Module({
  imports: [SalesOrderPlacedModule, ShippingBackOrderedModule],
  providers: [SignatureTypes, LazyLoadHandler],
  exports: [SignatureTypes],
})
export class SignatureTypesModule {}
