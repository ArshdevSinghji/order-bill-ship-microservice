import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export const dataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/src/domain/**/*entity.js'],
  migrations: ['dist/src/infrastructure/database/migrations/*.js'],
  seeds: ['dist/src/infrastructure/database/seeders/*.js'],
  synchronize: false,
  logging: false,
} as DataSourceOptions;

export const dataSource = new DataSource(dataSourceOptions);
