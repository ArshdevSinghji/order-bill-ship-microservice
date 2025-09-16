import { Injectable } from '@nestjs/common';
import { LazyLoadHandler } from './lazy-loader.service';

@Injectable()
export class SignatureTypes {
  public signatureTypes: Record<string, any[]>;

  constructor(private readonly lazyLoader: LazyLoadHandler) {
    this.signatureTypes = {
      'billing.order_billed': [
        // this.lazyLoader.handle(
        //   SalesOrderPlacedModule,
        //   SalesOrderPlacedProcessor,
        // ),
        () => console.log('order billed!'),
      ],
      'sales.order_placed': [() => console.log('order placed!')],
    };
  }

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
