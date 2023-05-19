import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Codemania Assessment')
  .setDescription('A simple social media platform')
  .setVersion('2.0')
  .addTag('users')
  .build();

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(helmet())
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const PORT = process.env.port || 3000;
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
