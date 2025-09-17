import { Event } from 'src/domain/common/event';

export class PaymentFailed extends Event {
  type = 'billing.payment_failed';

  getBody() {
    return {
      billing_payment_failed: {
        order_id: this.payload.id,
      },
    };
  }
}
