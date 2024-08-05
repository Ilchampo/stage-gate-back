import dotenv from 'dotenv';

dotenv.config();

describe('Configuration Module', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should load configuration values from environment variables', () => {
    process.env.ENVIRONMENT = 'test';
    process.env.PORT = '3000';
    process.env.CORS = 'http://localhost:3000';
    process.env.ENCRYPTION_KEY = 'test-encryption-key';

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const config = require('@src/config/config').default;

    expect(config.environment).toBe('test');
    expect(config.port).toBe('3000');
    expect(config.cors).toBe('http://localhost:3000');
    expect(config.encryptionKey).toBe('test-encryption-key');
  });

  it('should use default values if environment variables are not set', () => {
    process.env.ENVIRONMENT = undefined;
    process.env.PORT = undefined;
    process.env.CORS = undefined;
    process.env.ENCRYPTION_KEY = undefined;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const config = require('@src/config/config').default;

    expect(config.environment).toBe('development');
    expect(config.port).toBe(8080);
    expect(config.cors).toBe('*');
    expect(config.encryptionKey).toBe('encryption-key');
  });
});
