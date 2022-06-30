/* istanbul ignore file */
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

export const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  const port = config.get<number>("app.port") || 3000;

  const logger = new Logger("Bootstrap");

  await app.listen(port, () => {
    logger.log(`App available on http://localhost:${port}`);
  });
};
