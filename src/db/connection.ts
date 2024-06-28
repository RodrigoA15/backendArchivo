import { DataSource } from "typeorm";
import { HOSTNAME, PASSWORD, SERVICE_NAME, USER } from "../config";
import oracledb from "oracledb";
export const AppDataSource = new DataSource({
  type: "oracle",
  username: USER,
  password: PASSWORD,
  host: HOSTNAME,
  port: 1573,
  serviceName: SERVICE_NAME,
  logging: true,
});

export const Connection = async () => {
  try {
    const connection = await oracledb.getConnection({
      user: USER,
      password: PASSWORD,
      connectString: `${HOSTNAME}:1573/${SERVICE_NAME}`,
    });
    console.log("Conexión exitosa a Oracle");
    return connection;
  } catch (error) {
    console.error("Error al conectar a Oracle:", error);
    throw error;
  }
};
