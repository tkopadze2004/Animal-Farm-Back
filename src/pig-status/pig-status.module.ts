import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PigController } from './controllers/pig-status.controller';
import { PigSchema } from './schemas/pig-status.schema';
import { PigService } from './services/pig-status.service';

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
export class PigModule {}
