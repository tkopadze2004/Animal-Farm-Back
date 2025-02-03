import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from '../schemas/animal.schema';
import { Timeout } from '@nestjs/schedule';
import { PigService } from 'src/pig-status/services/pig-status.service';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectModel('Animal') private readonly animalModel: Model<Animal>,
    private readonly pigService: PigService,
  ) {}

  async create(createAnimalDto: Partial<Animal>): Promise<Animal> {
    const createdAnimal = new this.animalModel(createAnimalDto);
    return createdAnimal.save();
  }

  async findAll(): Promise<Animal[]> {
    return this.animalModel.find().exec();
  }

  async feedAnimal(id: string) {
    const animal = await this.animalModel.findById(id);

    if (!animal) {
      throw new NotFoundException('Animal not found');
    }

    animal.thanksCount++;
    await animal.save();

    await this.pigService.updateStatus('happy');

    void this.schedulePigStatusReset();

    return {
      thanksCount: animal.thanksCount,
      pigStatus: await this.pigService.getStatus(),
      message: 'Thank you to our leader!',
    };
  }
  @Timeout(1000)
  async schedulePigStatusReset() {
    await this.pigService.updateStatus('start');
  }
}
