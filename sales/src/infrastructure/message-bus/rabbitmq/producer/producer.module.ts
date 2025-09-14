import { Module } from '@nestjs/common';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';
import { RabbitmqModule } from 'src/infrastructure/message-bus/rabbitmq/config/rabbitmq.module';
import { OutboxMessageRelay } from 'src/infrastructure/message-bus/outbox-message-relay.service';
import { ProducerService } from './producer.service';
import { DispatchMessages } from '../../cli-commands/dispatch-messages';

@Module({
  imports: [RabbitmqModule],
  providers: [
    DispatchMessages,
    ProducerService,
    OutboxMessageRepository,
    OutboxMessageRelay,
  ],
})
export class ProducerModule {}
