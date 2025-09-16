interface Product {
  product_id: string;
  quantity: number;
}

export interface SalesOrderPlacedEvent {
  sales_order_placed: {
    order_id: string;
    products: Product[];
    customer_id: string;
    order_total: number;
  };
}
