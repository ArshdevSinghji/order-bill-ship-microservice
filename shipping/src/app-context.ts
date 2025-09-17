import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { INestApplicationContext } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';

let appInstance: INestApplicationContext | null = null;

export const appInstanceExists = () => Boolean(appInstance);

export const getAppInstance =
  async (): Promise<INestApplicationContext | null> => {
    if (!appInstanceExists()) {
      initializeTransactionalContext();
      appInstance = await NestFactory.createApplicationContext(AppModule);
    }
    return appInstance;
  };

export const closeAppInstance = async () => {
  if (appInstanceExists()) {
    await appInstance!.close();
    appInstance = null;
  }
};
