import { Event } from 'src/domain/common/event';

export class OrderBilled extends Event {
  type = 'billing.order_billed';

  getBody() {
    return {
      billing_order_billed: {
        order_id: this.payload.order_id,
      },
    };
  }
}
