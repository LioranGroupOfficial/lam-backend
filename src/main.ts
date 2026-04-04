import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5000',
      'https://lam-frontend.vercel.app',
    ],
    credentials: true,
  });

  app.use(bodyParser.raw({ type: 'application/json' }));
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(express.json({ limit: '100kb' }));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
