import { Injectable } from '@nestjs/common';
import { Products } from 'src/domain/product/product.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProductsRepository extends Repository<Products> {
  constructor(dataSource: DataSource) {
    super(Products, dataSource.createEntityManager());
  }

  async getProduct(id: string) {
    return await this.findOne({ where: { id } });
  }
}
