import { Injectable } from '@nestjs/common';
import { LazyLoadHandler } from './lazy-loader.service';
import { SalesOrderPlacedModule } from './sales-order-placed.ts/sales-order-placed.module';
import { SalesOrderPlacedProcessor } from './sales-order-placed.ts/sales-order-placed.processor';
import { ShippingBackOrderedProcessor } from './shipping-back-ordered/shipping-back-ordered.processor';
import { ShippingBackOrderedModule } from './shipping-back-ordered/shipping-back-ordered.module';

@Injectable()
export class SignatureTypes {
  public signatureTypes: Record<string, any[]>;

  constructor(private readonly lazyLoader: LazyLoadHandler) {
    this.signatureTypes = {
      'sales.order_placed': [
        this.lazyLoader.handle(
          SalesOrderPlacedModule,
          SalesOrderPlacedProcessor,
        ),
      ],
      'shipping.back_ordered': [
        this.lazyLoader.handle(
          ShippingBackOrderedModule,
          ShippingBackOrderedProcessor
        )
      ]
    };
  }

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
