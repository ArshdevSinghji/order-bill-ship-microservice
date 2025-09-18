import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import type { EventPayload } from '../common/event.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { BillingOrderBilledEvent } from './billing-order-billed.interface';
import { OrderBilledService } from 'src/features/order-billed/order-billed.service';

@Injectable()
export class BillingOrderBilledProcessor {
  constructor(
    @InjectRepository(InboxMessageRepository)
    private readonly inboxMessageRepository: InboxMessageRepository,
    private readonly handler: OrderBilledService,
  ) {}

  getHandlerName() {
    return this.constructor.name;
  }

  @Transactional()
  async handleEvent(payload: EventPayload<BillingOrderBilledEvent>) {
    console.log('Processing Billing Order Billed Event:', payload);

    await this.handler.handle(payload.body);

    await this.inboxMessageRepository.storeInboxMessage({
      message_id: payload.messageId,
      handler_name: this.getHandlerName(),
    });
  }
}
