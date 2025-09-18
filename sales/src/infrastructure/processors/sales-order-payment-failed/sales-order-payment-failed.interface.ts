export interface SalesOrderPaymentFailedEvent {
  billing_payment_failed: {
    order_id: string;
  };
}
