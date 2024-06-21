import { DataSource } from "typeorm";
import { HOSTNAME, PASSWORD, SERVICE_NAME, USER } from "../config";
import oracledb from "oracledb";

const Connection = async () => {
  try {
    const connection = await oracledb.getConnection({
      user: USER,
      password: PASSWORD,
      connectString: `${HOSTNAME}/${SERVICE_NAME}`,
    });
    console.log("Conexión exitosa a Oracle");
    return connection;
  } catch (error) {
    console.error("Error al conectar a Oracle:", error);
    throw error;
  }
};

export default Connection;
