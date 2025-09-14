import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OutboxMessage } from 'src/domain/outbox-message/outbox-message.entity';
import { OutboxMessageRepository } from '../repositories/outbox-message/outbox-message.repository';
import { ProductService } from './rabbitmq/producer/producer.service';

@Injectable()
export class OutboxMessageRelay {
  constructor(
    private readonly producerService: ProductService,
    @InjectRepository(OutboxMessage)
    private readonly outboxMessageRepository: OutboxMessageRepository,
  ) {}

  async dispatchMessages(limit: number): Promise<void> {
    try {
      const messages =
        await this.outboxMessageRepository.getUnsentMessages(limit);

      if (!messages.length) {
        console.log('INFO: No messages pending to dispatch.');
        return;
      }

      await this.producerService.publishMessages(messages);
      console.log(`INFO: Published ${messages.length} messages.`);
    } catch (error) {
      console.log('Error in publishing messages ', error);
    }
  }
}
