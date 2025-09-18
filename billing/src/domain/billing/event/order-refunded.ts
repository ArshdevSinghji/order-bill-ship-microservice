import { Event } from 'src/domain/common/event';

export class OrderRefunded extends Event {
  type = 'billing.order_refunded';

  getBody() {
    return {
      billing_order_refunded: {
        order_id: this.payload.order_id,
      },
    };
  }
}
