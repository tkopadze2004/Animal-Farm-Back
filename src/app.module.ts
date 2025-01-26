import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalsModule } from './animals/animals.module';
import { PigStatusModule } from './animals/pig-status.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/animal-farm'),
    AnimalsModule,
    PigStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
