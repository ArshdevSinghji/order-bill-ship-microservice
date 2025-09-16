import { Event } from 'src/domain/common/event';

export class OrderPlaced extends Event {
  type = 'sales.order_placed';

  getBody() {
    return {
      sales_order_placed: {
        order_id: this.payload.id,
        products: [
          {
            product_id: this.payload?.products[0]?.product_id,
            quantity: this.payload?.products[0]?.quantity,
          },
        ],
        customer_id: this.payload?.customer_id,
        order_total: this.payload?.total_amount,
      },
    };
  }
}
