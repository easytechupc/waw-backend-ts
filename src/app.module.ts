import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ormConfigFactory } from "./config/ormconfig";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfigFactory,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
