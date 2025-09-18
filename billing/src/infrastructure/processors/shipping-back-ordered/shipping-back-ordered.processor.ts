import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import type { EventPayload } from '../common/event.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { ShippingBackOrderedEvent } from './shipping-back-ordered.interface';
import { ShippingBackOrderedService } from 'src/features/shipping-back-ordered/shipping-back-ordered.service';

@Injectable()
export class ShippingBackOrderedProcessor {
  constructor(
    @InjectRepository(InboxMessageRepository)
    private readonly inboxMessageRepository: InboxMessageRepository,
    private readonly handler: ShippingBackOrderedService,
  ) {}

  getHandlerName() {
    return this.constructor.name;
  }

  @Transactional()
  async handleEvent(payload: EventPayload<ShippingBackOrderedEvent>) {
    console.log('Processing Shipping Back Ordered Event:', payload);

    await this.handler.handle(payload.body);

    await this.inboxMessageRepository.storeInboxMessage({
      message_id: payload.messageId,
      handler_name: this.getHandlerName(),
    });
  }
}
