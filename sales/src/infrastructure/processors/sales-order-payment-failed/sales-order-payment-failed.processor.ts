import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { Transactional } from 'typeorm-transactional';
import type { EventPayload } from '../common/event.interface';
import { OrderStatusPaymentFailedService } from 'src/features/order-status/order-status-payment-failed.service';
import { SalesOrderPaymentFailedEvent } from './sales-order-payment-failed.interface';

@Injectable()
export class SalesOrderPaymentFailedProcessor {
  constructor(
    @InjectRepository(InboxMessageRepository)
    private readonly inboxMessageRepository: InboxMessageRepository,
    private readonly handler: OrderStatusPaymentFailedService,
  ) {}

  getHandlerName() {
    return this.constructor.name;
  }

  @Transactional()
  async handleEvent(payload: EventPayload<SalesOrderPaymentFailedEvent>) {
    console.log('Processing Sales Order Payment Failed Event:', payload);
    const { order_id } = payload.body || {};

    await this.handler.handle(order_id);

    await this.inboxMessageRepository.storeInboxMessage({
      message_id: payload.messageId,
      handler_name: this.getHandlerName(),
    });
  }
}
