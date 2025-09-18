import { Product } from 'src/domain/shipping/shipping.entity';

export interface ShippingOrderPayload {
  order_id: string;
  address: string;
  products: Product[];
}
