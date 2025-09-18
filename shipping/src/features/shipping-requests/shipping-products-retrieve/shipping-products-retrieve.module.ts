import { Module } from '@nestjs/common';
import { ProductsRepository } from 'src/infrastructure/repositories/products/products.repository';
import { ShippingProductsRetrieveService } from './shipping-products-retrieve.service';
import { ShippingProductsRetrieveController } from './shipping-products-retrieve.controller';

@Module({
  controllers: [ShippingProductsRetrieveController],
  providers: [ProductsRepository, ShippingProductsRetrieveService],
  exports: [],
})
export class ShippingProductsRetrieveModule {}
