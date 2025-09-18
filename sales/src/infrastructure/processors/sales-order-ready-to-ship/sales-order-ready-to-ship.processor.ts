import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InboxMessageRepository } from 'src/infrastructure/repositories/inbox-message/inbox-message.repository';
import { Transactional } from 'typeorm-transactional';
import type { EventPayload } from '../common/event.interface';
import { SalesOrderReadyToShipEvent } from './sales-order-ready-to-ship.interface';
import { OrderStatusReadyToShipService } from 'src/features/order-status/order-status-ready-to-ship.service';

@Injectable()
export class SalesOrderReadyToShipProcessor {
  constructor(
    @InjectRepository(InboxMessageRepository)
    private readonly inboxMessageRepository: InboxMessageRepository,
    private readonly handler: OrderStatusReadyToShipService,
  ) {}

  getHandlerName() {
    return this.constructor.name;
  }

  @Transactional()
  async handleEvent(payload: EventPayload<SalesOrderReadyToShipEvent>) {
    console.log('Processing Sales Order Ready To Ship Event:', payload);
    const { order_id } = payload.body.shipping_label_created || {};

    await this.handler.handle(order_id);

    await this.inboxMessageRepository.storeInboxMessage({
      message_id: payload.messageId,
      handler_name: this.getHandlerName(),
    });
  }
}
