import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Wailand LLC, Aviator Republic backend')
    .setDescription('Wailand LLC, Aviator Republic backend API description')
    .setVersion('0.1')
    .addTag('Auth')
    .addTag('User')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'api/v',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
