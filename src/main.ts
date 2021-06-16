import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('E commerce application')
  .setDescription('The Ecommerce rest API description')
  .setVersion('1.0')
  .addBearerAuth({type: 'apiKey', description: 'Jwt token'})
  .build()
  
  
  
  const document = SwaggerModule.createDocument(app, config, {deepScanRoutes: true});
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
