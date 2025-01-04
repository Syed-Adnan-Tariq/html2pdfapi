import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as handlebars from 'handlebars'

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));

  const config = new DocumentBuilder()
    .setTitle('PDF conversions')
    .setDescription('PDF conversions API description')
    .setVersion('1.0')
    .addTag('pdf-conversions')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
  app.use(bodyParser.json({ limit: '50mb' }));
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
