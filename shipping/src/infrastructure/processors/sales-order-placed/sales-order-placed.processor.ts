import { Injectable } from '@nestjs/common';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { Transactional } from 'typeorm-transactional';
import type { EventPayload } from '../common/event.interface';
import { SalesOrderPlacedEvent } from './sales-order-placed.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderPlacedHandler } from 'src/features/order-placed/order-placed.handler';

@Injectable()
export class SalesOrderPlacedProcessor {
  constructor(
    @InjectRepository(InboxMessageRepository)
    private readonly inboxMessageRepository: InboxMessageRepository,
    private readonly handler: OrderPlacedHandler,
  ) {}

  getHandlerName() {
    return this.constructor.name;
  }

  @Transactional()
  async handleEvent(payload: EventPayload<SalesOrderPlacedEvent>) {
    console.log('Processing Billing Order Billed Event:', payload);

    await this.handler.handle(payload.body);

    await this.inboxMessageRepository.storeInboxMessage({
      message_id: payload.messageId,
      handler_name: this.getHandlerName(),
    });
  }
}
