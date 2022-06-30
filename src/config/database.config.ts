import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

export const DatabaseConfig = (): TypeOrmModuleOptions => ({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "waw",
  entities: [join(__dirname, "../", "**/*.entity.ts")],
  migrations: [join(__dirname, "../", "database/migrations/**/*.ts")],
  logging: process.env.DB_LOGGING === "true",
  synchronize: process.env.DB_SYNCHRONIZE === "true",
  dropSchema: process.env.DB_DROP_SCHEMA === "true",
  migrationsRun: process.env.DB_MIGRATIONS_RUN === "true",
});
