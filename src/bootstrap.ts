/* istanbul ignore file */
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app.module";

export const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  const logger = new Logger("Bootstrap");
  const port = config.get<number>("app.port") || 3000;

  // CORS
  app.enableCors();

  // Validation for incoming requests
  app.useGlobalPipes(new ValidationPipe());

  // Setup Swagger UI
  const options = new DocumentBuilder()
    .setTitle(config.get("app.title") as string)
    .setDescription(config.get("app.description") as string)
    .setVersion(config.get("app.version") as string)
    .addTag("Companies", "Create, read, update and delete registered companies")
    .addTag("Offers", "Create, read, update and delete registered offers")
    .addTag(
      "SubscriptionPlans",
      "Create, read, update and delete registered subscription plans"
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);

  await app.listen(port, () => {
    logger.log(`App available on http://localhost:${port}`);
    logger.log(`Swagger available on http://localhost:${port}/docs`);
  });
};
