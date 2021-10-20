import { connectWithDatabase } from './database/database';
import { server } from './server';


const port = 3322;

const start = async () => {
  try {
    connectWithDatabase();
  } catch (error) {
    console.error(`We have an error with the DB: ${error}`);
  }

  server.listen(port, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server started at ${address}`);
  });
};

start();
