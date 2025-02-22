import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pig } from '../schemas/pig-status.schema';

@Injectable()
export class PigService {
  constructor(@InjectModel('Pig') private readonly pigModel: Model<Pig>) {}

  async getStatus(): Promise<string> {
    try {
      let status = await this.pigModel.findOne();
      
      if (!status) {
        status = new this.pigModel({ pigStatus: 'start' });
        await status.save();
      }

      return status.pigStatus;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get pig status');
    }
  }

  async updateStatus(newStatus: string): Promise<string> {
    try {
      let status = await this.pigModel.findOne();

      if (!status) {
        status = new this.pigModel({ pigStatus: newStatus });
      } else {
        status.pigStatus = newStatus;
      }

      await status.save();
      return newStatus;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update pig status');
    }
  }
}
