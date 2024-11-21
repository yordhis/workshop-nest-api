import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  /** 
   * Configuración del @perfomace de la app-nest 
   * En este caso se esta usando el motor de @fastify
   * @var nestjs/platform-fastify
   */
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: true }
  );

  /** Se usan los validadores globales PIPE para los parametro enviados por http request */
  app.useGlobalPipes(new ValidationPipe)

  /** Levantamos el puerto 3001 */
  await app.listen(process.env.APP_PORT || 3001, '0.0.0.0');

  /** Mostramos donde esta corriendo la app por consola */
  console.log(`Application is running on: ${await app.getUrl()} - con fastify + prisma`);
}
bootstrap();
