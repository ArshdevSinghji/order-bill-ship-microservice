import { BillingAccount } from 'src/domain/billing-account/billing-account.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class BillingAccountsSeeders implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(BillingAccount);

    const existingCount = await repository.count();
    if (existingCount > 0) {
      console.log('Billing accounts already seeded, skipping...');
      return;
    }

    const seeder = [
      {
        id: 'c1d7a1b4-6ef3-44a2-b97f-3a7e2f405bd4',
        card_number: '4111111111111111',
        balance: 120.5,
      },
      {
        id: 'a2f89d3c-b671-4fd6-88cd-f8cdb66f09e1',
        card_number: '5500000000000004',
        balance: 250.75,
      },
      {
        id: 'f3e7c5d1-6c82-4a28-bb8e-0d3f78f3ab90',
        card_number: '4111222233334444',
        balance: 89.3,
      },
      {
        id: 'd4b2f843-8e6b-4f57-9b4f-5a4c5a73b512',
        card_number: '5424000000000015',
        balance: 480,
      },
      {
        id: 'e5c6d3a7-7da2-4db8-bc44-3b3b84b2a9f0',
        card_number: '4532015112830366',
        balance: 310.2,
      },
    ];

    await repository.save(seeder);
  }
}
