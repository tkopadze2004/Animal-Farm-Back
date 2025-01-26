import { Controller, Get, Post, Body } from '@nestjs/common';
import { AnimalsService } from '../services/animals.service';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  async create(@Body() createAnimalDto: any) {
    return this.animalsService.create(createAnimalDto);
  }

  @Get()
  async findAll() {
    return this.animalsService.findAll();
  }
}
