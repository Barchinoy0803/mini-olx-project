import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  const config = new DocumentBuilder()
    .setTitle("My API")
    .setDescription("This is API documentation for mini Olx Project")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document, {
    customSiteTitle: "My API Docs",
    customCssUrl: "/swagger/swagger-ui.css",
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
