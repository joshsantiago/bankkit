import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards, Request, Res } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';

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

  // 4.5 Get Recurring Transactions
  @Get('recurring')
  getRecurringTransactions(@Request() req) {
    return this.transactionsService.getRecurringTransactions(req.user.id);
  }

  // 4.6 Set Up Recurring Transfer
  @Post('recurring')
  createRecurringTransfer(
    @Request() req,
    @Body() data: {
      from_account_id: string;
      to_account_id: string;
      amount: number;
      frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
      description: string;
      category: string;
    },
  ) {
    return this.transactionsService.createRecurringTransfer(req.user.id, data);
  }

  // 4.7 Cancel Recurring Transfer
  @Delete('recurring/:id')
  cancelRecurringTransfer(@Param('id') id: string, @Request() req) {
    return this.transactionsService.cancelRecurringTransfer(req.user.id, id);
  }

  // 4.8 Get Transaction Categories
  @Get('categories')
  getCategories(@Request() req) {
    return this.transactionsService.getCategories(req.user.id);
  }

  // 4.9 Create Custom Category
  @Post('categories')
  createCategory(
    @Request() req,
    @Body() data: { name: string; icon: string; color: string },
  ) {
    return this.transactionsService.createCategory(req.user.id, data);
  }

  // 4.10 Export Transactions to CSV
  @Get('export/csv')
  async exportTransactions(
    @Request() req,
    @Query('start_date') startDate?: string,
    @Query('end_date') endDate?: string,
    @Query('account_id') accountId?: string,
    @Res() res?: Response,
  ) {
    const result = await this.transactionsService.exportTransactions(req.user.id, {
      startDate,
      endDate,
      accountId,
    });

    if (res) {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${result.data.filename}"`);
      return res.send(result.data.csv);
    }

    return result;
  }
}
