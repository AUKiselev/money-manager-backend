import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/');
    app.use(cookieParser());
    app.enableCors();

    const config = new DocumentBuilder()
      .setTitle('Money manager')
      .setDescription('Документация REST API')
      .setVersion('0.0.1')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () => {
      console.log(`i am here in port ${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
