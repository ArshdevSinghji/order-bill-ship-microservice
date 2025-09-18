import { Module } from '@nestjs/common';
import { SignatureTypes } from './signature-types.service';
import { LazyLoadHandler } from './lazy-loader.service';
import { SalesOrderPlacedModule } from './sales-order-placed/sales-order-placed.module';
import { SalesOrderBilledModule } from './sales-order-billed/sales-order-billed.module';
import { SalesOrderCancelledModule } from './sales-order-cancelled/sales-order-cancelled.module';
import { SalesOrderReadyToShipModule } from './sales-order-ready-to-ship/sales-order-ready-to-ship.module';

@Module({
  imports: [
    SalesOrderPlacedModule,
    SalesOrderBilledModule,
    SalesOrderCancelledModule,
    SalesOrderReadyToShipModule,
    SalesOrderBilledModule,
  ],
  providers: [SignatureTypes, LazyLoadHandler],
  exports: [SignatureTypes],
})
export class SignatureTypesModule {}
