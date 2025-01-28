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
    methods: 'GET,POST,PUT,DELETE', // Include all methods you're using
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'], // Add 'Authorization' if needed
    credentials: true, // Allow credentials (cookies or auth headers)
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
