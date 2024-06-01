import { DataSource } from "typeorm";
import { HOSTNAME, PASSWORD, SERVICE_NAME, USER } from "../config";

export const AppDataSource = new DataSource({
  type: "oracle",
  username: USER,
  password: PASSWORD,
  host: HOSTNAME,
  port: 1573,
  serviceName: SERVICE_NAME,
  logging: true,
});
