import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true,
    forbidNonWhitelisted: true, 
   }));

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
  await app.listen(process.env.PORT || 3000);
}
void bootstrap();
