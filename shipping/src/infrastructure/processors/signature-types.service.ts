import { Injectable } from '@nestjs/common';
import { LazyLoadHandler } from './lazy-loader.service';

@Injectable()
export class SignatureTypes {
  public signatureTypes: Record<string, any[]>;

  constructor(private readonly lazyLoader: LazyLoadHandler) {
    this.signatureTypes = {
      'sales.order_placed': [() => console.log('Event handled!')],
    };
  }

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
