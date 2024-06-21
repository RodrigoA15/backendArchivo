import app from "./app";
import { HOSTNAME, PASSWORD, SERVICE_NAME, USER } from "./config";
import Connection from "./db/connection";
import oracledb from "oracledb";
const PORT = 4500;

async function main() {
  try {
    const connection = await Connection();
    if (connection) {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

main();
