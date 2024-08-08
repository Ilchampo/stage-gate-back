import { PrismaClient } from '@prisma/client';

class PrismaSingleton {
  private static instance: PrismaClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient();
      process.on('SIGINT', async () => {
        await PrismaSingleton.instance.$disconnect();
        process.exit(0);
      });
      process.on('SIGTERM', async () => {
        await PrismaSingleton.instance.$disconnect();
        process.exit(0);
      });
    }
    return PrismaSingleton.instance;
  }
}

export default PrismaSingleton.getInstance();
