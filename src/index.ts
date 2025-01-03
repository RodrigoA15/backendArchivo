import app from "./app";
import { AppDataSource, Connection } from "./db/connection";
import { ConnectionMongo } from "./db/connectionMongo";
const PORT = 4500;
async function main() {
  try {
    await AppDataSource.initialize();
    await Connection();
    await ConnectionMongo();
    console.log("Database initialized");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

main();
