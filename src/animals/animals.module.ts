import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalsController } from '../animals/controllers/animals.controller';
import { AnimalsService } from '../animals/services/animals.service';
import { AnimalSchema } from './schemas/animal.schema';
import { PigModule } from 'src/pig-status/pig-status.module';
import { PigSchema } from 'src/pig-status/schemas/pig-status.schema';
import { PigService } from 'src/pig-status/services/pig-status.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Animal', schema: AnimalSchema },
      {
        name: 'Pig',
        schema: PigSchema,
      },
    ]),
    PigModule,
  ],

  controllers: [AnimalsController],
  providers: [AnimalsService, PigService],
})
export class AnimalsModule {}
