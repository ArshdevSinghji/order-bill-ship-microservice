import { Event } from 'src/domain/common/event';

export class ShippingLabelCreated extends Event {
  type = 'shipping.shipping_label_created';

  getBody() {
    return {
      shipping_label_created: {
        order_id: this.payload.id,
      },
    };
  }
}
