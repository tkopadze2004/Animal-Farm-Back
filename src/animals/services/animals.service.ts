import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from '../schemas/animal.schema';
import { PigService } from './pig-status.service';

@Injectable()
export class AnimalsService implements OnModuleInit {
  constructor(
    @InjectModel('Animal') private readonly animalModel: Model<Animal>,
    private readonly pigService: PigService, // Correct service name
  ) {}

  onModuleInit() {
    // const initialObj = {
    //   name: 'start',
    //   type: 'start',
    //   thanksCount: 0,
    // };
    // void this.create(initialObj).then();
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

    // Increment the thanks count
    animal.thanksCount += 1;
    await animal.save();

    await this.pigService.updateStatus('happy');

    // Revert the status to "start" after a delay
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setTimeout(async () => {
      await this.pigService.updateStatus('start');
    }, 1000); // 5000ms = 5 seconds (you can adjust this as needed)

    return {
      thanksCount: animal.thanksCount,
      pigStatus: await this.pigService.getStatus(),
    };
  }
}
