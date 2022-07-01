/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const envConfig = require("dotenv").config({
  path: path.resolve(
    __dirname,
    `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`
  ),
});

const env = key => envConfig.parsed[key] || process.env[key];

const baseConfig = {
  type: process.env.NODE_ENV === "test" ? "sqlite" : "mysql",
  database: env("DB_DATABASE"),
  entities: [path.resolve(__dirname, "src/**/*.entity.{js,ts}")],
  migrations: [path.resolve(__dirname, "src/database/migrations/**/*.ts")],
  logger: "advanced-console",
  logging: ["warn", "error"],
  cli: {
    migrationsDir: path.resolve(__dirname, "src/database/migrations"),
  },
};

if (process.env.NODE_ENV !== "test") {
  module.exports = {
    host: env("DB_SOCKET_PATH") ? env("DB_SOCKET_PATH") : env("DB_HOST"),
    extra: env("DB_SOCKET_PATH")
      ? {
          socketPath: env("DB_SOCKET_PATH"),
        }
      : undefined,
    port: env("DB_PORT"),
    username: env("DB_USER"),
    password: env("DB_PASSWORD"),
    synchronize: false,
    ...baseConfig,
  };
} else {
  module.exports = {
    dropSchema: true,
    synchronize: true,
    ...baseConfig,
  };
}
