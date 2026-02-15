import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get()
  findAll(
    @Request() req,
    @Query('account_id') accountId?: string,
    @Query('type') type?: string,
    @Query('status') status?: string,
    @Query('start_date') startDate?: string,
    @Query('end_date') endDate?: string,
    @Query('limit') limit?: number,
  ) {
    return this.transactionsService.findAll(
      req.user.id,
      req.user.role === 'admin',
      {
        accountId,
        type,
        status,
        startDate,
        endDate,
        limit: limit || 20,
      },
    );
  }

  @Get('analytics/summary')
  getAnalytics(@Request() req, @Query('start_date') startDate?: string, @Query('end_date') endDate?: string) {
    return this.transactionsService.getAnalytics(req.user.id, req.user.role === 'admin', startDate, endDate);
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
