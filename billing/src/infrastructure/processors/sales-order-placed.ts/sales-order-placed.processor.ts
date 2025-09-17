import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { SalesOrderPlacedEvent } from './sales-order-placed.interface';

import type { EventPayload } from '../common/event.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { OrderBilledService } from 'src/features/order/order-billed/order-billed.service';

@Injectable()
export class SalesOrderPlacedProcessor {
  constructor(
    @InjectRepository(InboxMessageRepository)
    private readonly inboxMessageRepository: InboxMessageRepository,
    private readonly handler: OrderBilledService,
  ) {}

  getHandlerName() {
    return this.constructor.name;
  }

  @Transactional()
  async handleEvent(payload: EventPayload<SalesOrderPlacedEvent>) {
    console.log('Processing Sales Order Placed Event:', payload);

    await this.handler.handle(payload.body);

    await this.inboxMessageRepository.storeInboxMessage({
      message_id: payload.messageId,
      handler_name: this.getHandlerName(),
    });
  }
}
