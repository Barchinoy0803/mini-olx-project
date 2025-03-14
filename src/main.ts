import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
        .setTitle("My API")
        .setDescription("This is API documentation for my project")
        .setVersion("1.0")
        .addTag("regions") 
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/docs", app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
