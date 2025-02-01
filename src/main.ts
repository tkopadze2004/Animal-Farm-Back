import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // CORS configuration - allow requests from specific domains
  app.enableCors({
    // origin: [
    //   'http://localhost:4200', // Local Angular app
    //   'https://animal-farm-456c4.web.app', // Deployed Angular app
    // ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
}

void bootstrap();
