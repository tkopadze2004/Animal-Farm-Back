import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PigStatusSchema } from './schemas/pig-status';
import { PigController } from './controllers/pig-status.controler';
import { PigService } from './services/pig-status.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Pig',
        schema: PigStatusSchema,
      },
    ]),
  ],
  controllers: [PigController],
  providers: [PigService],
  exports: [PigService],
})
export class PigStatusModule {}
