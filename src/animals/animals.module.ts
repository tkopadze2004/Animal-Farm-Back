import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalsController } from '../animals/controllers/animals.controller';
import { AnimalsService } from '../animals/services/animals.service';
import { AnimalSchema } from './schemas/animal.schema';
import { PigStatusModule } from './pig-status.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Animal', schema: AnimalSchema }]),
    PigStatusModule,
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
