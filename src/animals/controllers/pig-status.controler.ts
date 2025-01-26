import { Controller, Get, Post, Body } from '@nestjs/common';
import { PigService } from '../services/pig-status.service';
import { PigStatus } from '../schemas/pig-status';

@Controller('pig')
export class PigController {
  constructor(private readonly pigService: PigService) {}

  @Get()
  async findAll() {
    return this.pigService.findAll();
  }

  @Post()
  async create(@Body() createAnimalDto: PigStatus) {
    return this.pigService.create(createAnimalDto);
  }

  @Post('status')
  async updatePigStatus(@Body('status') status: string) {
    return this.pigService.updatePigStatus(status);
  }
}
