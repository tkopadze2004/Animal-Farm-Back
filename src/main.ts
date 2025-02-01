import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS configuration - allow requests from localhost and other necessary domains
  app.enableCors({
    // origin: [
    //   'http://localhost:4200',
    //   'https://animal-farm-456c4.web.app',
    // ],
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const PORT = process.env.PORT || 3000; // Use the port from environment or 3000 by default
  await app.listen(PORT, '0.0.0.0'); // Listen on all interfaces
  console.log(`Server running on port ${PORT}`);
}

void bootstrap();
