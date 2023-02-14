import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT) ?? 5432,
  username: process.env.POSTGRES_USER ?? 'admin',
  password: process.env.POSTGRES_PASSWORD ?? 'admin',
  database: process.env.POSTGRES_DB ?? 'postgres',
  synchronize: false,
  subscribers: [],
  migrations: ['dist/**/migration/*.js'],
  migrationsRun: true,
  autoLoadEntities: true,
} as DataSourceOptions;
