import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  const config = app.get(ConfigService);
  const port = config.get<number>('API_PORT');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('TG-API')
    .setDescription('This API refers to my test task...')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(port || 3001, () => {
    console.log(`App started on port: ${port}`);
  });
}
bootstrap();
