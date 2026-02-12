import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  findAll(@Request() req, @Query('account_id') accountId?: string) {
    return this.transactionsService.findAll(
      req.user.id,
      req.user.role === 'admin',
      accountId,
    );
  }

  @Post('transfer')
  createTransfer(@Request() req, @Body() createTransferDto: CreateTransferDto) {
    return this.transactionsService.createTransfer(
      req.user.id,
      req.user.role === 'admin',
      createTransferDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.transactionsService.findOne(id, req.user.id, req.user.role === 'admin');
  }
}
