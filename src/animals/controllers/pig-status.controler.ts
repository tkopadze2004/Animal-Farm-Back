import { Controller, Get, Post, Body } from '@nestjs/common';
import { PigService } from '../services/pig-status.service';

@Controller('bidzina')
export class PigController {
  constructor(private readonly pigStatusService: PigService) {}

  @Get('status')
  async getStatus() {
    return { currentStatus: await this.pigStatusService.getStatus() };
  }
  @Post('update')
  async updateStatus(@Body('status') status: string) {
    const updatedStatus = await this.pigStatusService.updateStatus(status);
    return { currentStatus: updatedStatus };
  }
}
