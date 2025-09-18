import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './infrastructure/database/type-orm';
import { BillingProcessModule } from './features/billing-requests/billing-process/billing-process.module';
import { BillingRetrieveModule } from './features/billing-requests/billing-retrieve/billing-retrieve.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule,
    BillingProcessModule,
    BillingRetrieveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
