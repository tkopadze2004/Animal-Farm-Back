import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from '../schemas/animal.schema';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectModel('Animal') private readonly animalModel: Model<Animal>,
  ) {}

  async create(createAnimalDto: any): Promise<Animal> {
    const createdAnimal = new this.animalModel(createAnimalDto);
    console.log(createAnimalDto);

    return createdAnimal.save();
  }

  async findAll(): Promise<Animal[]> {
    return this.animalModel.find().exec();
  }
}
