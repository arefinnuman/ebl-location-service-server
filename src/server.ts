import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/config';

const databaseUrl = config.database_url as string;
const usingPort = config.port;

process.on('uncaughtException', error => {
  console.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(databaseUrl);
    console.log(`Database Connected`);

    server = app.listen(usingPort, () => {
      console.log(`Ebl location tracking service running ${usingPort}`);
    });
  } catch (error) {
    console.error(`Failed to connect`, error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
bootstrap();

process.on(`SIGTERM`, () => {
  console.log(`SIGTERM is received`);
  if (server) {
    server.close();
  }
});
