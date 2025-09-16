import { Module } from '@nestjs/common';
import { SignatureTypes } from './signature-types.service';
import { LazyLoadHandler } from './lazy-loader.service';
import { SalesOrderPlacedModule } from './sales-order-placed.ts/sales-order-placed.module';

@Module({
  imports: [SalesOrderPlacedModule],
  providers: [SignatureTypes, LazyLoadHandler],
  exports: [SignatureTypes],
})
export class SignatureTypesModule {}
