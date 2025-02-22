import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { AnimalsService } from '../services/animals.service';
import { CreateAnimalDto } from '../dto/create-animal.dto';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  async create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.create(createAnimalDto);
  }

  @Get()
  async findAll() {
    return this.animalsService.findAll();
  }

  @Put(':id/feed')
  async feedAnimal(@Param('id') id: string) {
    return this.animalsService.feedAnimal(id);
  }
}
