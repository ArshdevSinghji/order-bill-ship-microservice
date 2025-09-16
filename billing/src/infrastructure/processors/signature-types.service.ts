import { Injectable } from '@nestjs/common';
import { LazyLoadHandler } from './lazy-loader.service';
import { SalesOrderPlacedModule } from './sales-order-placed.ts/sales-order-placed.module';
import { SalesOrderPlacedProcessor } from './sales-order-placed.ts/sales-order-placed.processor';

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
    };
  }

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
