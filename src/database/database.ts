import * as Mongoose from "mongoose";
import { TrashItemModel } from './trashItem/trashItem.model';

let database: Mongoose.Connection;

const mongo_uri = process.env['MONGO_URI'];

export const connectWithDatabase = () => {
  // add your own uri below
  const uri = mongo_uri;

  if (database) {
    return;
  }

  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  database = Mongoose.connection;

  database.once("open", async () => {
    console.log("Connected to database!");
  });

  database.on("error", (error) => {
    console.log(`Error connecting to database: ${error}`);
  });

  return {
    TrashItemModel,
  };
};

export const disconnect = () => {
  if (!database) {
    return;
  }

  Mongoose.disconnect();
};
