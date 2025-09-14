import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from '../rabbitmq.interface';
import * as RabbitMQ from 'amqplib';

@Injectable()
export class RabbitmqConfigService {
  private maxReconnectTries: number = 3;
  private reconnectPolicy = true;
  private config: ConfigType;

  constructor(private configService: ConfigService) {
    this.config = {
      username: this.configService.get<string>('RABBITMQ_USERNAME') ?? '',
      password: this.configService.get<string>('RABBITMQ_PASSWORD') ?? '',
      appName: this.configService.get<string>('APP_NAME') ?? '',
      fanoutExchange:
        this.configService.get<string>('RABBITMQ_FANOUT_EXCHANGE') ?? '',
      heartbeatInterval:
        this.configService.get<number>('RABBITMQ_HEARTBEAT_INTERVAL') ?? 30,
      dsn: this.configService.get<string>('RABBITMQ_DSN') ?? '',
      directExchange:
        this.configService.get<string>('RABBITMQ_DIRECT_EXCHANGE') ?? '',
      primaryQueue:
        this.configService.get<string>('RABBITMQ_PRIMARY_QUEUE') ?? '',
      retryQueue: this.configService.get<string>('RABBITMQ_RETRY_QUEUE') ?? '',
      retryBindingKey:
        this.configService.get<string>('RABBITMQ_RETRY_BINDING_KEY') ?? '',
      errorBindingKey:
        this.configService.get<string>('RABBITMQ_ERROR_BINDING_KEY') ?? '',
      delayedRetriesNumber: parseInt(
        this.configService.get<string>('FAILED_MESSAGE_DELAYED_RETRIES') ?? '0',
      ),
      immediateRetriesNumber: parseInt(
        this.configService.get<string>('FAILED_MESSAGE_IMMEDIATE_RETRIES') ??
          '0',
      ),
      retryQueueMessageTtl: parseInt(
        this.configService.get<string>('RETRY_QUEUE_MESSAGE_TTL') ?? '0',
      ),
      consumeMessageLimit: parseInt(
        this.configService.get<string>('CONSUME_MESSAGE_LIMIT') ?? '0',
      ),
      dispatchMessageLimit: parseInt(
        this.configService.get<string>('DISPATCH_MESSAGE_LIMIT') ?? '0',
      ),
    };
  }

  async validateConfig() {
    const requiredVariables = [
      'username',
      'password',
      'appName',
      'fanoutExchange',
      'directExchange',
      'primaryQueue',
      'retryQueue',
      'retryBindingKey',
      'errorBindingKey',
      'delayedRetriesNumber',
      'immediateRetriesNumber',
      'retryQueueMessageTtl',
      'dsn',
      'heartbeatInterval',
    ];

    const missingVariables = requiredVariables.filter(
      (variable) => !this.config[variable],
    );

    if (missingVariables.length === 0)
      console.log('All prerequisites are met for RabbitMQ.');
    else {
      missingVariables.forEach((variable) => {
        console.log(`Missing required environment variable: ${variable}`);
      });
      process.exit(1);
    }
  }

  getConfig() {
    return this.config;
  }

  getConnectionString() {
    return this.config.dsn;
  }

  getConnectionParams() {
    return {
      credentials: RabbitMQ.credentials.plain(
        this.config.username,
        this.config.password,
      ),
      heartbeat: this.config.heartbeatInterval || 30,
    };
  }

  getMaxReconnectTrialsData() {
    return {
      maxReconnectTries: this.maxReconnectTries,
      reconnectPolicy: this.reconnectPolicy,
    };
  }
}
