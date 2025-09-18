import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { Transactional } from 'typeorm-transactional';
import type { EventPayload } from '../common/event.interface';
import { OrderStatusBilledService } from 'src/features/order-status/order-status-billed.service';
import { SalesOrderBilledEvent } from './sales-order-billed.interface';

@Injectable()
export class SalesOrderBilledProcessor {
  constructor(
    @InjectRepository(InboxMessageRepository)
    private readonly inboxMessageRepository: InboxMessageRepository,
    private readonly handler: OrderStatusBilledService,
  ) {}

  getHandlerName() {
    return this.constructor.name;
  }

  @Transactional()
  async handleEvent(payload: EventPayload<SalesOrderBilledEvent>) {
    console.log('Processing Sales Order Billed Event:', payload);
    const { order_id } = payload.body.billing_order_billed || {};
    await this.handler.handle(order_id);

    await this.inboxMessageRepository.storeInboxMessage({
      message_id: payload.messageId,
      handler_name: this.getHandlerName(),
    });
  }
}
