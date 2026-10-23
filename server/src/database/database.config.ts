import type { DataSourceOptions } from 'typeorm';
import { entities } from './entities/index.js';

export function databaseOptions(
  env: NodeJS.ProcessEnv = process.env,
): DataSourceOptions {
  return {
    type: 'postgres',
    host: env.DB_HOST ?? 'localhost',
    port: Number(env.DB_PORT ?? 5432),
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    entities,
    migrations: ['dist/database/migrations/*.js'],
    synchronize: false,
  };
}
