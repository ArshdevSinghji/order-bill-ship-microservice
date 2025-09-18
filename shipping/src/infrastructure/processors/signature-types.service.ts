import { Injectable } from '@nestjs/common';
import { LazyLoadHandler } from './lazy-loader.service';
import { BillingOrderBilledModule } from './billing-order-billed/billing-order-billed.module';
import { BillingOrderBilledProcessor } from './billing-order-billed/billing-order-billed.processor';

@Injectable()
export class SignatureTypes {
  public signatureTypes: Record<string, any[]>;

  constructor(private readonly lazyLoader: LazyLoadHandler) {
    this.signatureTypes = {
      'billing.order_billed': [
        this.lazyLoader.handle(
          BillingOrderBilledModule,
          BillingOrderBilledProcessor,
        ),
      ],
    };
  }

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
