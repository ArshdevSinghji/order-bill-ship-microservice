import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from './infrastructure/database/type-orm';
import { OrderCreatedModule } from './features/sales-requests/order-created/order-created.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule,
    OrderCreatedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
