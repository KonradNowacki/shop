import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app/app.module";
import cookieParser from "cookie-parser";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser())

  app.enableCors({
    origin: 'http://localhost:4200', // TODO KN Address for angualr
  })


  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/`
  );
}

bootstrap();
