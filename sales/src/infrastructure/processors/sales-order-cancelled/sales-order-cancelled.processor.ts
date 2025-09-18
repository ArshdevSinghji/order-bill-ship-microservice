import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { Transactional } from 'typeorm-transactional';
import type { EventPayload } from '../common/event.interface';
import { OrderStatusCancelledService } from 'src/features/order-status/order-status-cancelled.service';
import { SalesOrderCancelledEvent } from './sales-order-cancelled.interface';

@Injectable()
export class SalesOrderCancelledProcessor {
  constructor(
    @InjectRepository(InboxMessageRepository)
    private readonly inboxMessageRepository: InboxMessageRepository,
    private readonly handler: OrderStatusCancelledService,
  ) {}

  getHandlerName() {
    return this.constructor.name;
  }

  @Transactional()
  async handleEvent(payload: EventPayload<SalesOrderCancelledEvent>) {
    console.log('Processing Sales Order Cancelled Event:', payload);
    const { order_id } = payload.body.billing_order_refunded || {};

    await this.handler.handle(order_id);

    await this.inboxMessageRepository.storeInboxMessage({
      message_id: payload.messageId,
      handler_name: this.getHandlerName(),
    });
  }
}
