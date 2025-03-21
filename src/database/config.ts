import dotenv from 'dotenv';
import * as process from 'node:process';
dotenv.config({ path: '.env' });

export default {
  development: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  test: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  production: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};
