export interface SalesOrderReadyToShipEvent {
  shipping_label_created: {
    order_id: string;
  };
}
