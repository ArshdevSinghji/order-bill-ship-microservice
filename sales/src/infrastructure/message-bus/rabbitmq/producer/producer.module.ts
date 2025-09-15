import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutboxMessage } from 'src/domain/outbox-message/outbox-message.entity';
import { OutboxMessageRepository } from 'src/infrastructure/repositories/outbox-message/outbox-message.repository';
import { RabbitmqModule } from 'src/infrastructure/message-bus/rabbitmq/config/rabbitmq.module';
import { OutboxMessageRelay } from 'src/infrastructure/message-bus/outbox-message-relay.service';
import { ProducerService } from './producer.service';
import { DispatchMessages } from '../../cli-commands/dispatch-messages';

@Module({
  imports: [RabbitmqModule, TypeOrmModule.forFeature([OutboxMessage])],
  providers: [
    DispatchMessages,
    ProducerService,
    OutboxMessageRepository,
    OutboxMessageRelay,
  ],
  exports: [ProducerService, OutboxMessageRelay],
})
export class ProducerModule {}
