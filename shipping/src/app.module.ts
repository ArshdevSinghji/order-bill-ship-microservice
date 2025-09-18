import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './infrastructure/database/type-orm';
import { ShippingOrderModule } from './features/shipping-requests/shipping-order/shipping-order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule,
    ShippingOrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
