export interface ShippingBackOrderedEvent {
  shipping_back_ordered: {
    order_id: string;
    order_total: number;
  };
}
