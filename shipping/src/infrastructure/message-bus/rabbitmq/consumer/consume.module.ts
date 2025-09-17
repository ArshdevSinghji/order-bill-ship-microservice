import { Module } from '@nestjs/common';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { SignatureTypesModule } from 'src/infrastructure/processors/signature-types.module';
import { RabbitmqModule } from 'src/infrastructure/message-bus/rabbitmq/config/rabbitmq.module';
import { InboxMessageHandler } from '../../inbox-message-handler.service';
import { ConsumerService } from './consumer.servie';
import { HandleMessages } from '../../cli-commands/handle-messages';

@Module({
  imports: [SignatureTypesModule, RabbitmqModule],
  providers: [
    HandleMessages,
    ConsumerService,
    InboxMessageHandler,
    InboxMessageRepository,
  ],
})
export class ConsumerModule {}
