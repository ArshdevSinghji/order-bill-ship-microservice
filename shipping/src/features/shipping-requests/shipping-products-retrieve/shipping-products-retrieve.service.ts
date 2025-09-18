import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsRepository } from 'src/infrastructure/repositories/products/products.repository';

@Injectable()
export class ShippingProductsRetrieveService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
  ) {}

  async getAllProducts() {
    return this.productsRepository.getAllProducts();
  }
}
