import { Controller, Get, Post, Body } from '@nestjs/common';
import { PigService } from '../services/pig-status.service';
import { UpdateStatusDto } from '../dto/update-status.dto';

@Controller('bidzina')
export class PigController {
  constructor(private readonly pigStatusService: PigService) {}

  @Get('status')
  async getStatus() {
    return { pigStatus: await this.pigStatusService.getStatus() };
  }

  @Post('update')
  async updateStatus(@Body() updateStatusDto: UpdateStatusDto) {
    return { pigStatus: await this.pigStatusService.updateStatus(updateStatusDto.status) };
  }  
}
