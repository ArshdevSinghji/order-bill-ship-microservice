import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { SalesOrderPlacedEvent } from './sales-order-placed.interface';

import type { EventPayload } from '../common/event.interface';

@Injectable()
export class SalesOrderPlacedProcessor {
  constructor() {}

  getHandlerName() {
    return this.constructor.name;
  }

  @Transactional()
  async handleEvent(payload: EventPayload<SalesOrderPlacedEvent>) {
    console.log('Processing Sales Order Placed Event:', payload);
  }
}
