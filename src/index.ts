import app from "./app";
import { AppDataSource } from "./db/connection";
const PORT = 4500;
const HOST = "192.168.28.74";
async function main() {
  try {
    await AppDataSource.initialize();
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
