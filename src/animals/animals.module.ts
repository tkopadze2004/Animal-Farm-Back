import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalsController } from '../animals/controllers/animals.controller';
import { AnimalsService } from '../animals/services/animals.service';
import { AnimalSchema } from './schemas/animal.schema';
import { PigService } from './services/pig-status.service';
import { PigSchema } from './schemas/pig-status';
import { pigModule } from './pig-status.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Animal', schema: AnimalSchema },
      {
        name: 'Pig',
        schema: PigSchema,
      },
    ]),
    pigModule,
  ],

  controllers: [AnimalsController],
  providers: [AnimalsService, PigService],
})
export class AnimalsModule {}
