import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PigSchema } from './schemas/pig-status';
import { PigService } from './services/pig-status.service';
import { PigController } from './controllers/pig-status.controler';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Pig',
        schema: PigSchema,
      },
    ]),
  ],
  controllers: [PigController],
  providers: [PigService],
  exports: [PigService],
})
export class pigModule {}
