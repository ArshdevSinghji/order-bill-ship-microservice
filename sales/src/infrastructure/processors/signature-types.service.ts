import { Injectable } from '@nestjs/common';
import { LazyLoadHandler } from './lazy-loader.service';

@Injectable()
export class SignatureTypes {
  public signatureTypes: Record<string, any[]> = {
    'sales.order_placed': [() => console.log('Order placed!')],
  };

  public getSignatureTypes(): Record<string, any[]> {
    return this.signatureTypes;
  }
}
