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
    return { currentStatus: await this.pigStatusService.updateStatus(status) };
  }

  @Post('reset')
  async resetStatus() {
    return { currentStatus: await this.pigStatusService.resetStatus() };
  }
}
