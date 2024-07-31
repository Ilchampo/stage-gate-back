import type { IConfig } from '@src/interfaces/config.interface';
import dotenv from 'dotenv';

dotenv.config();

const config: IConfig = {
  environment: process.env.ENVIRONMENT,
  port: process.env.PORT,
  cors: process.env.CORS,
  encryptionKey: process.env.ENCRYPTION_KEY,
};

export default config;
