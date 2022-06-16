/* istanbul ignore file */
import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";

export const dataSource: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: "all",
  entities: ["./src/**/*.entity.ts"],
};

export default new DataSource(dataSource);
