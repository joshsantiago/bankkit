import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
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

  // 2.4 Get Spending Insights
  @Get('spending-insights')
  async getSpendingInsights(
    @Request() req,
    @Query('month') month?: string,
    @Query('year') year?: string,
  ) {
    const userId = req.user.id;
    const data = await this.dashboardService.getSpendingInsights(
      userId,
      month ? parseInt(month) : undefined,
      year ? parseInt(year) : undefined,
    );
    return {
      success: true,
      data,
    };
  }

  // 2.5 Get Budget Goals
  @Get('budget-goals')
  async getBudgetGoals(@Request() req) {
    const userId = req.user.id;
    const data = await this.dashboardService.getBudgetGoals(userId);
    return {
      success: true,
      data,
    };
  }

  // 2.6 Get Upcoming Bills
  @Get('upcoming-bills')
  async getUpcomingBills(@Request() req) {
    const userId = req.user.id;
    const data = await this.dashboardService.getUpcomingBills(userId);
    return {
      success: true,
      data,
    };
  }

  // 2.7 Get Financial Tips
  @Get('financial-tips')
  async getFinancialTips(@Request() req) {
    const userId = req.user.id;
    const data = await this.dashboardService.getFinancialTips(userId);
    return {
      success: true,
      data,
    };
  }

  // 2.8 Get Account Statements
  @Get('statements')
  async getAccountStatements(
    @Request() req,
    @Query('account_id') accountId?: string,
  ) {
    const userId = req.user.id;
    const data = await this.dashboardService.getAccountStatements(userId, accountId);
    return {
      success: true,
      data,
    };
  }
}
