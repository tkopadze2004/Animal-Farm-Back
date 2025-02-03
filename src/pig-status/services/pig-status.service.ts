import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pig } from '../schemas/pig-status.schema';

@Injectable()
export class PigService {
  constructor(@InjectModel('Pig') private readonly pigModel: Model<Pig>) {}

  async getStatus(): Promise<string> {
    const status = await this.pigModel.findOne();
    if (!status) {
      const newStatus = new this.pigModel({ pigStatus: 'start' });

      await newStatus.save();
      return 'start';
    }

    return status.pigStatus;
  }

  async updateStatus(newStatus: string): Promise<string> {
    const status = await this.pigModel.findOne();
    if (!status) {
      const newStatusObj = new this.pigModel({
        pigStatus: newStatus,
      });
      await newStatusObj.save();
      return newStatus;
    }

    status.pigStatus = newStatus;
    await status.save();
    return newStatus;
  }
}
