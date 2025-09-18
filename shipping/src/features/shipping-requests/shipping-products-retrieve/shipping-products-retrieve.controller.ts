import { Controller, Get } from '@nestjs/common';
import { ShippingProductsRetrieveService } from './shipping-products-retrieve.service';

@Controller('shipping')
export class ShippingProductsRetrieveController {
  constructor(
    private readonly shippingProductsRetrieveService: ShippingProductsRetrieveService,
  ) {}

  @Get('products')
  async getAllProducts() {
    return this.shippingProductsRetrieveService.getAllProducts();
  }
}
