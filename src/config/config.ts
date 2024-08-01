import type { IConfig } from '@src/interfaces/config.interface';
import dotenv from 'dotenv';

dotenv.config();

const config: IConfig = {
  environment: process.env.ENVIRONMENT ?? 'development',
  port: process.env.PORT ?? 8080,
  cors: process.env.CORS ?? '*',
  encryptionKey: process.env.ENCRYPTION_KEY ?? 'encryption-key',
};

export default config;
