export interface SalesOrderCancelledEvent {
  billing_order_refunded: {
    order_id: string;
  };
}
