import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from "@nestjs/typeorm";

export type ORMConfigFactory = TypeOrmModuleAsyncOptions["useFactory"];

export const ormConfigFactory: ORMConfigFactory = () => {
  const isProd = process.env.NODE_ENV === "production";

  return Promise.resolve<TypeOrmModuleOptions>({
    type: "mysql",
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    logging: isProd ? ["error", "warn"] : "all",
    synchronize: !isProd,
  });
};
