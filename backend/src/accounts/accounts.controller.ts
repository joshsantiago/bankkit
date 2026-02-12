import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
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
}
