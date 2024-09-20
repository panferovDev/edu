import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_URL],
      queue: process.env.ACCOUNT_QUEUE,
      queueOptions: { durable: false },
    },
  });
  await app.listen();
  Logger.log(`🚀 Application account is running`);
}

bootstrap();
