import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalsModule } from './animals/animals.module';
import { pigModule } from './animals/pig-status.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017/animal-farm'),
    MongooseModule.forRoot(
      'mongodb+srv://owner:smthSDnHa@cluster0.moyze.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0',
    ),

    AnimalsModule,
    pigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
