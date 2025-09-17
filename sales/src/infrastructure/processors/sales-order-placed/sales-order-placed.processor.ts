import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { EventPayload } from '../common/event.interface';
import { SalesOrderPlacedEvent } from './sales-order-placed.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { OrderStatusPlacedService } from 'src/features/order-status/order-status-placed.service';

@Injectable()
export class SalesOrderPlacedProcessor {
  constructor(
    @InjectRepository(InboxMessageRepository)
    private readonly inboxMessageRepository: InboxMessageRepository,
    private readonly handler: OrderStatusPlacedService,
  ) {}

  getHandlerName() {
    return this.constructor.name;
  }

  @Transactional()
  async handleEvent(payload: EventPayload<SalesOrderPlacedEvent>) {
    console.log('Processing Sales Order Placed Event:', payload);
    const { order_id } = payload.body || {};
    await this.handler.handle(order_id);

    await this.inboxMessageRepository.storeInboxMessage({
      message_id: payload.messageId,
      handler_name: this.getHandlerName(),
    });
  }
}
