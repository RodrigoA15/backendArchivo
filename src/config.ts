import { config } from "dotenv";

config();

export const USER = process.env.USER;
export const PASSWORD = process.env.PASSWORD;
export const HOSTNAME = process.env.HOSTNAME;
export const SERVICE_NAME = process.env.SERVICE_NAME;
export const MONGODB_URI = process.env.MONGODB_URI;
//SAMBA OPTIONS
export const ADDRES = process.env.ADDRESS;
export const DOMAIN = process.env.DOMAIN;
export const MAX_PROTOCOL = process.env.MAX_PROTOCOL;
export const MASK_CMD = process.env.MASK_CMD;
