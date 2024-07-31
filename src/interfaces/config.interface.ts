export interface IConfig {
  environment?: string;
  port?: string | number;
  cors?: string | string[];
  encryptionKey?: string;
}
