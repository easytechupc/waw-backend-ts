import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>("PORT") || 3000;

  await app.listen(port, () => {
    const logger = new Logger("NestApplication");
    logger.log(`App available on http://localhost:${port}`);
  });
};

bootstrap();
