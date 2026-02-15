import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  getDashboard(@Request() req) {
    return this.dashboardService.getDashboard(req.user.id);
  }

  @Get('profile-completion')
  async getProfileCompletion(@Request() req) {
    const userId = req.user.id;
    const data = await this.dashboardService.getProfileCompletion(userId);
    return {
      success: true,
      data,
    };
  }

  @Get('quick-stats')
  async getQuickStats(@Request() req) {
    const userId = req.user.id;
    const data = await this.dashboardService.getQuickStats(userId);
    return {
      success: true,
      data,
    };
  }
}
