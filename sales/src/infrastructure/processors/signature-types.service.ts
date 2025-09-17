import { Injectable } from '@nestjs/common';
import { LazyLoadHandler } from './lazy-loader.service';
import { SalesOrderPlacedModule } from './sales-order-placed/sales-order-placed.module';
import { SalesOrderPlacedProcessor } from './sales-order-placed/sales-order-placed.processor';
import { SalesOrderBilledModule } from './sales-order-billed/sales-order-billed.module';
import { SalesOrderBilledProcessor } from './sales-order-billed/sales-order-billed.processor';
import { SalesOrderPaymentFailedProcessor } from './sales-order-payment-failed/sales-order-payment-failed.processor';
import { SalesOrderPaymentFailedModule } from './sales-order-payment-failed/sales-order-payment-failed.module';

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
      'billing.order_billed': [
        this.lazyLoader.handle(
          SalesOrderBilledModule,
          SalesOrderBilledProcessor,
        ),
      ],
      'billing.payment_failed': [
        this.lazyLoader.handle(
          SalesOrderPaymentFailedModule,
          SalesOrderPaymentFailedProcessor,
        ),
      ],
    };
  }

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
