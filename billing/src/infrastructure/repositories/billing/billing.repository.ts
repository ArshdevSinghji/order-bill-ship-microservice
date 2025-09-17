import { Injectable } from '@nestjs/common';
import { Billing } from 'src/domain/billing/billing.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BillingRepository extends Repository<Billing> {
  constructor(dataSource: DataSource) {
    super(Billing, dataSource.createEntityManager());
  }

  async createBilling(payload: Partial<Billing>) {
    const billing = this.create(payload);
    return await this.save(billing);
  }

  async getBillingDetails(id: string) {
    return await this.findOne({
      where: [{ id: id }, { order_id: id }],
    });
  }
}
