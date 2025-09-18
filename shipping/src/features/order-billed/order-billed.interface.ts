export interface BillingOrderBilledEvent {
  billing_order_billed: {
    order_id: string;
    order_total: number;
  };
}
