import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: 'http://localhost:4200',
    allowedHeaders: 'Content-Type, Accept',
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
