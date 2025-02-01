import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://animal-farm-456c4.web.app',
      'https://animal-farm-456c4.firebaseapp.com',
    ],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: true,
  });
  const PORT = process.env.PORT || 3000;

  await app.listen(PORT, '0.0.0.0');
}
void bootstrap();
