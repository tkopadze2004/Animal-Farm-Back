import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalsController } from '../animals/controllers/animals.controller';
import { AnimalsService } from '../animals/services/animals.service';
import { AnimalSchema } from './schemas/animal.schema';
import { PigService } from './services/pig-status.service';
import { pigModel } from './pig-status.module';
import { PigSchema } from './schemas/pig-status';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Animal', schema: AnimalSchema },
      {
        name: 'Pig',
        schema: PigSchema,
      },
    ]),
    pigModel,
  ],

  controllers: [AnimalsController],
  providers: [AnimalsService, PigService],
})
export class AnimalsModule {}
