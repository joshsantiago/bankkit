import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get()
  findAll(@Request() req) {
    return this.accountsService.findAll(req.user.id, req.user.role === 'admin');
  }

  @Post()
  create(@Request() req, @Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(req.user.id, createAccountDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.accountsService.findOne(id, req.user.id, req.user.role === 'admin');
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string, @Request() req) {
    return this.accountsService.updateStatus(id, status, req.user.id, req.user.role === 'admin');
  }

  // 3.5 Get Account Statement
  @Get(':id/statement')
  getAccountStatement(
    @Param('id') id: string,
    @Query('month') month?: string,
    @Query('year') year?: string,
    @Request() req?: any,
  ) {
    const userId = req?.user?.id;
    return this.accountsService.getAccountStatement(
      id,
      userId,
      month ? parseInt(month) : undefined,
      year ? parseInt(year) : undefined,
    );
  }

  // 3.7 Set Account Alert
  @Post(':id/alerts')
  setAccountAlert(
    @Param('id') id: string,
    @Body() alertData: { type: string; threshold: number },
    @Request() req: any,
  ) {
    return this.accountsService.setAccountAlert(id, req.user.id, alertData);
  }

  // 3.8 Get Account Alerts
  @Get(':id/alerts')
  getAccountAlerts(@Param('id') id: string, @Request() req: any) {
    return this.accountsService.getAccountAlerts(id, req.user.id);
  }

  // 3.9 Update Account Alert
  @Patch(':id/alerts/:alertId')
  updateAccountAlert(
    @Param('id') id: string,
    @Param('alertId') alertId: string,
    @Body() updateData: { threshold?: number; enabled?: boolean },
    @Request() req: any,
  ) {
    return this.accountsService.updateAccountAlert(alertId, id, req.user.id, updateData);
  }

  // 3.10 Delete Account Alert
  @Delete(':id/alerts/:alertId')
  deleteAccountAlert(
    @Param('id') id: string,
    @Param('alertId') alertId: string,
    @Request() req: any,
  ) {
    return this.accountsService.deleteAccountAlert(alertId, id, req.user.id);
  }

  // 3.11 Get Account Beneficiaries
  @Get(':id/beneficiaries')
  getAccountBeneficiaries(@Param('id') id: string, @Request() req: any) {
    return this.accountsService.getAccountBeneficiaries(id, req.user.id);
  }

  // 3.12 Add Account Beneficiary
  @Post(':id/beneficiaries')
  addAccountBeneficiary(
    @Param('id') id: string,
    @Body() beneficiaryData: { name: string; email: string; relationship: string },
    @Request() req: any,
  ) {
    return this.accountsService.addAccountBeneficiary(id, req.user.id, beneficiaryData);
  }
}
