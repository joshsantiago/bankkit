import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Account } from '../entities/account.entity';
import { Transaction } from '../entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Transaction])],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
