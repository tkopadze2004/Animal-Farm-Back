import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from '../schemas/animal.schema';

@Injectable()
export class AnimalsService implements OnModuleInit {
  constructor(
    @InjectModel('Animal') private readonly animalModel: Model<Animal>,
  ) {}
  onModuleInit() {
    const initialObj = {
      name: 'start',
      type: 'start',
      thanksCount: 0,
    };
    void this.create(initialObj).then();
  }

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

    animal.thanksCount += 1;

    await animal.save();

    return {
      thanksCount: animal.thanksCount,
    };
  }
}
