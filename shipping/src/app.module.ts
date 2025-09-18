import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './infrastructure/database/type-orm';
import { ShippingOrderModule } from './features/shipping-requests/shipping-order/shipping-order.module';
import { ShippingProductsRetrieveModule } from './features/shipping-requests/shipping-products-retrieve/shipping-products-retrieve.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule,
    ShippingOrderModule,
    ShippingProductsRetrieveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
