import { Products } from 'src/domain/product/product.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class ProductsSeeders implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(Products);

    const existingCount = await repository.count();
    if (existingCount > 0) {
      console.log('Products already seeded, skipping...');
      return;
    }

    const seeder = [
      {
        id: 'b17f77ae-5d5d-4183-a1f5-979c45a5f57f',
        quantity_on_hand: 15,
      },
      {
        id: '2b8a7b36-fb21-4ad8-a124-25d607c3e55c',
        quantity_on_hand: 25,
      },
      {
        id: '7c91f4b0-8d42-47f1-98c4-b3f975be3a41',
        quantity_on_hand: 10,
      },
      {
        id: 'e7a23cbb-4c59-4233-8d38-f2b82c3f949e',
        quantity_on_hand: 50,
      },
      {
        id: '9f3e1a65-5af7-4d1a-a08b-6d7c78d8a19e',
        quantity_on_hand: 7,
      },
    ];

    await repository.save(seeder);
  }
}
