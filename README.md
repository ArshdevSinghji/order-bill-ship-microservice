### Order-Billing-Shipping Microservice

This project demonstrates a microservices-based system for handling the core business processes of an e-commerce platform: **Order Creation**, **Billing**, and **Shipping**. 
It showcases **a resilient and reliable message-driven architecture** using a message broker.

### Order Processing: Normal Flow

1.  **Place Order**: A user initiates a new order. The system creates an `OrderPlaced` event.
2.  **Order Billed**: The `Billing` service consumes the `OrderPlaced` event and successfully processes the payment, emitting an `OrderBilled` event.
3.  **Shipping**: The `Shipping` service consumes the `OrderBilled` event. It confirms inventory and creates a shipping label, emitting a `ShippingLabelCreated` event.
4.  **Order Closed**: The `Order` service consumes the `ShippingLabelCreated` event and updates the order status to `Closed`. The order is now ready for fulfillment.

### Failed Payment Scenario

1.  **Place Order**: A user initiates a new order. The system creates an `OrderPlaced` event.
2.  **Payment Failed**: The `Billing` service consumes the `OrderPlaced` event but is unable to process the payment. It then emits a `PaymentFailed` event.
3.  **Cancel Order**: The `Order` service consumes the `PaymentFailed` event and updates the order's status to `Canceled`. The order is terminated.

### Back-Ordered / Refund Scenario

1.  **Place Order**: A user initiates a new order, and an `OrderPlaced` event is generated.
2.  **Order Billed**: The `Billing` service successfully processes the payment and generates an `OrderBilled` event.
3.  **Shipping - Back-Order**: The `Shipping` service consumes the `OrderBilled` event but finds that the item is currently out of stock. It cannot create a shipping label and instead emits a `Shipping.BackOrdered` event.
4.  **Refund Order**: The `Billing` service consumes the `Shipping.BackOrdered` event. It automatically processes a refund for the customer, emitting an `OrderRefunded` event.
5.  **Cancel Order**: The `Order` service consumes the `OrderRefunded` event and updates the order's status to `Canceled`.

### Setup and Running Instructions
1. Clone the Repository
  First, clone the project from GitHub to your local machine.

  ```
  https://github.com/ArshdevSinghji/order-bill-ship-microservice.git
  ```

2. Navigate and Run API Gateway
   
  ```
  cd order-bill-ship-microservice/api-gateway
  node main.js
  ```

3. Start the Microservices
  The individual services (`order`, `billing`, and `shipping`) are located on separate branches (`order-service`, `billing-service`, `shipping-service`).
  For each service, you need to navigate to its branch and start its Docker containers.

  ```
  # Example for the 'order' service
  git checkout order-service
  cd sales
  docker compose up
  Note: You'll need to repeat this step for the billing and shipping service branches as well.
  ```

4. Run Message Handlers
  The message handlers are the background processes that consume messages from RabbitMQ. Navigate to the directory containing your handler scripts and run them.

  ```
  npm run handle-messages
  ```

5. Start Message Dispatchers

  ```
  npm run dispatch-messages
  ```

### Intention and Personal Learning

This project was created with the primary intention of gaining a **deep, practical understanding of microservices architecture.**
While the theoretical concepts of microservices are widely discussed, this project allowed me to personally experience why this architectural 
pattern exists and the specific problems it solves.

My goal was to move beyond simply building a monolithic application and instead, to learn how to design 
a distributed system that is **resilient, scalable, and maintainable.** By implementing the **Outbox-Inbox Pattern** and **a Message Handler Architecture**, 
I was able to tackle and solve common challenges associated with distributed systems, such as:

- Data consistency across multiple services.

- Preventing data loss when communicating asynchronously.

- Ensuring idempotency (preventing duplicate message processing).

Ultimately, this project served as a hands-on learning exercise to understand the fundamental principles that lead to the creation of a robust microservices system, 
and to build a practical example from the ground up.

















