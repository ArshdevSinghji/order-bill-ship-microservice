import { Event } from 'src/domain/common/event';

export class ShippingBackOrdered extends Event {
  type = 'shipping.back_ordered';

  getBody() {
    return {
      shipping_back_ordered: {
        order_id: this.payload.id,
      },
    };
  }
}
