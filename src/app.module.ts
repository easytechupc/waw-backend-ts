import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ormConfigFactory } from "./config/ormconfig";
import { EmployersModule } from "./employers/employers.module";
import { JobsModule } from "./jobs/jobs.module";
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

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
    EmployersModule,
    JobsModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
