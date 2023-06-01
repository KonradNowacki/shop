import {Logger, ValidationPipe} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app/app.module";
import cookieParser from "cookie-parser";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {RolesGuard} from "../../../libs/api/src/lib/auth/guards/roles.guard";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser())

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({
    origin: 'http://localhost:4200', // TODO KN Address for angualr
  })

  const config = new DocumentBuilder()
    .setTitle('Shop')
    .setDescription('Shop API')
    .setVersion('1.0')
    .addTag('shop')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/`
  );
}

bootstrap();
