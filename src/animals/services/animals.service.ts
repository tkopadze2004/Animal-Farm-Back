import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from '../schemas/animal.schema';
import { Timeout } from '@nestjs/schedule';
import { PigService } from 'src/pig-status/services/pig-status.service';
import { CreateAnimalDto } from '../dto/create-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectModel('Animal') private readonly animalModel: Model<Animal>,
    private readonly pigService: PigService,
  ) {}

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    try {
      const createdAnimal = new this.animalModel(createAnimalDto);
      return await createdAnimal.save();
    } catch (error) {
      throw new BadRequestException('Error creating animal');
    }
  }

  async findAll(): Promise<Animal[]> {
    try {
      return await this.animalModel.find().exec();
    } catch (error) {
      throw new BadRequestException('Failed to fetch animals');
    }
  }

  async feedAnimal(id: string) {
    try {
      const animal = await this.animalModel.findById(id);
      if (!animal) {
        throw new NotFoundException(`Animal with ID ${id} not found`);
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
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;  
      }
      throw new BadRequestException('Failed to feed animal');
    }
  }

  @Timeout(1000)
  async schedulePigStatusReset() {
    try {
      await this.pigService.updateStatus('start');
    } catch (error) {
      throw new BadRequestException('Error resetting pig status');
    }
  }
}
