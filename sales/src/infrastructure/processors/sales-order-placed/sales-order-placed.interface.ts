interface Product {
  product_id: string;
  quantity: number;
}

export interface SalesOrderPlacedEvent {
  order_id: string;
  products: Product[];
  customer_id: string;
  order_total: number;
}
