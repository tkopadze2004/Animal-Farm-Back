import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PigStatus } from '../schemas/pig-status';

@Injectable()
export class PigService {
  constructor(
    @InjectModel('Pig') private readonly pigModel: Model<PigStatus>,
  ) {}

  async getPigStatus() {
    let status = await this.pigModel.findOne();
    if (!status) {
      console.log(status);

      status = await this.pigModel.create({
        status: 'default',
        musicPlaying: false,
      });
    }
    return status;
  }

  async create(createAnimalDto: Partial<PigStatus>): Promise<PigStatus> {
    const createdAnimal = new this.pigModel(createAnimalDto);
    return createdAnimal.save();
  }

  async findAll(): Promise<PigStatus[]> {
    return this.pigModel.find().exec();
  }

  async updatePigStatus(newStatus: string) {
    return this.pigModel.findOneAndUpdate(
      {},
      { status: newStatus },
      { new: true, upsert: true },
    );
  }

  // Toggle music
  //   async toggleMusic() {
  //     const currentStatus = await this.getPigStatus();
  //     return this.pigModel.findOneAndUpdate(
  //       {},
  //       { musicPlaying: !currentStatus.musicPlaying },
  //       { new: true, upsert: true },
  //     );
  //   }
}
