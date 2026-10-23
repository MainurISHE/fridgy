import 'reflect-metadata';
import { loadEnvFile } from 'node:process';
import { resolve } from 'node:path';
import { DataSource } from 'typeorm';
import { databaseOptions } from './database.config.js';

loadEnvFile(resolve(process.cwd(), '.env'));

export default new DataSource(databaseOptions());