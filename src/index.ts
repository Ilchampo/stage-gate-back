import app from './app';
import prisma from './config/database';

const server = app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(`Initializing app at port ${app.get('port')}`);
});

const shutdownServer = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    server.close(() => {
      // eslint-disable-next-line no-console
      console.log('Closing server...');
      process.exit(0);
    });
  } catch (error) {
    throw new Error(error as string);
  }
};

process.on('SIGINT', shutdownServer);
process.on('SIGTERM', shutdownServer);
