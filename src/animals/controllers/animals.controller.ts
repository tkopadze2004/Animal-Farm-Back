import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AnimalsService } from '../services/animals.service';
import { Animal } from '../schemas/animal.schema';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  async create(@Body() createAnimalDto: Animal) {
    return this.animalsService.create(createAnimalDto);
  }

  @Get()
  async findAll() {
    return this.animalsService.findAll();
  }

  @Post(':id/feed')
  async feedAnimal(@Param('id') id: string) {
    return this.animalsService.feedAnimal(id);
  }
}
