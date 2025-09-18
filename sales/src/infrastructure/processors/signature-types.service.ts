import { Injectable } from '@nestjs/common';
import { LazyLoadHandler } from './lazy-loader.service';
import { SalesOrderPlacedModule } from './sales-order-placed/sales-order-placed.module';
import { SalesOrderPlacedProcessor } from './sales-order-placed/sales-order-placed.processor';
import { SalesOrderBilledModule } from './sales-order-billed/sales-order-billed.module';
import { SalesOrderBilledProcessor } from './sales-order-billed/sales-order-billed.processor';
import { SalesOrderPaymentFailedProcessor } from './sales-order-payment-failed/sales-order-payment-failed.processor';
import { SalesOrderPaymentFailedModule } from './sales-order-payment-failed/sales-order-payment-failed.module';
import { SalesOrderCancelledModule } from './sales-order-cancelled/sales-order-cancelled.module';
import { SalesOrderCancelledProcessor } from './sales-order-cancelled/sales-order-cancelled.processor';
import { SalesOrderReadyToShipModule } from './sales-order-ready-to-ship/sales-order-ready-to-ship.module';
import { SalesOrderReadyToShipProcessor } from './sales-order-ready-to-ship/sales-order-ready-to-ship.processor';

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
      'billing.order_refunded': [
        this.lazyLoader.handle(
          SalesOrderCancelledModule,
          SalesOrderCancelledProcessor,
        ),
      ],
      'shipping.shipping_label_created': [
        this.lazyLoader.handle(
          SalesOrderReadyToShipModule,
          SalesOrderReadyToShipProcessor,
        ),
      ],
    };
  }

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
