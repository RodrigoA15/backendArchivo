import { connect } from "mongoose";
import { MONGODB_URI } from "../config";

export const ConnectionMongo = async () => {
  try {
    await connect(`${process.env.MONGODB_URI}`, {
      dbName: "archivo",
    })
      .then(() => console.log("Connected to MongoDB"))
      .catch((error) => console.error(`error connecting to MongoDB: ${error}`));
  } catch (error) {
    console.error(`error connecting to MongoDB: ${error}`);
  }
};
