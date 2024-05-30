import { config } from "dotenv";

config();

export const USER = process.env.USER;
export const PASSWORD = process.env.PASSWORD;
export const HOSTNAME = process.env.HOSTNAME;
export const SERVICE_NAME = process.env.SERVICE_NAME;
