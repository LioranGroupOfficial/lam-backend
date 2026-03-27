import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { Reflector } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      "http://localhost:5000",
      "http://localhost:3000",
      "https://lam-frontend.vercel.app",
    ],
    // credentials: true,
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
