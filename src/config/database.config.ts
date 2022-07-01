import { DataSourceOptions } from "typeorm";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { resolve } from "path";

const env = (key: string) => process.env[key];

export const DatabaseConfig = (): DataSourceOptions => {
  const base = {
    entities: [resolve(__dirname, "../", "**/*.entity.{js,ts}")],
    migrations: [resolve(__dirname, "../", "database/migrations/**/*.{js,ts}")],
    logger: "advanced-console",
    logging: ["warn", "error"],
    synchronize: env("DB_SYNCHRONIZE") === "true",
    dropSchema: env("DB_DROP_SCHEMA") === "true",
    migrationsRun: env("DB_MIGRATIONS_RUN") === "true",
  } as DataSourceOptions;

  if (process.env.NODE_ENV === "test") {
    return {
      ...(base as SqliteConnectionOptions),
      type: "sqlite",
      database: env("DB_NAME") || ":memory:",
      logging: env("DB_LOGGING") === "true",
    };
  }

  if (process.env.DB_SOCKET_PATH) {
    return {
      ...(base as MysqlConnectionOptions),
      type: "mysql",
      database: env("DB_NAME") || "wawts",
      host: env("DB_SOCKET_PATH"),
      extra: {
        socketPath: env("DB_SOCKET_PATH"),
      },
      username: env("DB_USER") || "root",
      password: env("DB_PASSWORD") || "root",
    };
  }

  return {
    ...(base as MysqlConnectionOptions),
    type: "mysql",
    database: env("DB_NAME") || "wawts",
    host: env("DB_HOST") || "127.0.0.1",
    port: Number(env("DB_PORT")) || 3306,
    username: env("DB_USER") || "root",
    password: env("DB_PASSWORD") || "root",
  };
};
