import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyStatic from '@fastify/static';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('This is API documentation for mini Olx Project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.register(fastifyStatic, {
    root: join(__dirname, '..', 'node_modules', 'swagger-ui-dist'),
    prefix: '/api/docs/',
  });

  await app.listen(process.env.PORT || 4000, '0.0.0.0');
}
bootstrap();
