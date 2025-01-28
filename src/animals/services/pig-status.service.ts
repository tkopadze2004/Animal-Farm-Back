import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pig } from '../schemas/pig-status';

@Injectable()
export class PigService {
  constructor(@InjectModel('Pig') private readonly pigModel: Model<Pig>) {}

  async getStatus(): Promise<string> {
    const status = await this.pigModel.findOne();
    if (!status) {
      const newStatus = new this.pigModel({ currentStatus: 'start' });

      await newStatus.save();
      return 'start';
    }

    return status.currentStatus;
  }

  async updateStatus(newStatus: string): Promise<string> {
    const status = await this.pigModel.findOne();
    if (!status) {
      const newStatusObj = new this.pigModel({
        currentStatus: newStatus,
      });

      await newStatusObj.save();
      return newStatus;
    }

    status.currentStatus = newStatus;

    await status.save();
    return newStatus;
  }

  async resetStatus(): Promise<string> {
    return this.updateStatus('start');
  }
}
