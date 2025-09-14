import { Injectable } from '@nestjs/common';
import { RabbitmqConnectionService } from '../config/rabbitmq-connection.service';
import { ConfigType, RabbitMQPublishMessage } from '../rabbitmq.interface';
import { RabbitmqConfigurerService } from '../config/rabbitmq-configurer.service';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';
import { OutboxMessage } from 'src/domain/outbox-message/outbox-message.entity';
import { OrderStatus } from 'src/domain/order/enum/order-status.enum';
import { OrderRepository } from 'src/infrastructure/repositories/order/order.repository';

@Injectable()
export class ProducerService {
  private connection: RabbitmqConnectionService;
  private config: ConfigType;

  constructor(
    private readonly rabbitmqConfigurerService: RabbitmqConfigurerService,
    private readonly rabbitmqConnectionService: RabbitmqConnectionService,
    private readonly outboxMessageRepository: OutboxMessageRepository,
    private readonly orderRepository: OrderRepository,
  ) {
    this.connection = rabbitmqConnectionService;
    this.config = this.connection.getConnectionConfiguration();
  }

  async publishMessages(messages: OutboxMessage[]) {
    await this.connect();

    for (const message of messages) {
      await this.publisher(message);
    }

    await this.close();
  }

  private async connect() {
    await this.connection.connect();
    await this.rabbitmqConfigurerService.configure();
  }

  private async close() {
    await this.connection.closeChannel();
  }

  private async publisher(outboxMessage: OutboxMessage) {
    try {
      const message = outboxMessage.getBody();
      const properties = outboxMessage.getProperties();
      const messageToPublish: RabbitMQPublishMessage = {
        exchange: this.config.fanoutExchange,
        bindingKey: '',
        content: JSON.stringify(message),
        properties: { ...properties, persistent: true },
      };

      const isPublished = await this.connection.publish(messageToPublish);
      if (!isPublished) throw new Error('Message could not be published.');

      outboxMessage.markAsSent();
      const eventBody = outboxMessage.getBody();
      const orderId = eventBody.order_id;

      if (orderId) {
        const order = await this.orderRepository.getOrder(orderId);
        if (order) {
          order.markStatus(OrderStatus.PLACED);
          await this.orderRepository.save(order);
        }
      }

      await this.outboxMessageRepository.save(outboxMessage);
    } catch (error) {
      console.log(
        `Error while publishing message ${outboxMessage.type} with id ${outboxMessage.message_id}`,
        error,
      );
    }
  }
}
