export interface SalesOrderBilledEvent {
  order_id: string;
  billing_id: string;
  amount_billed: number;
}
