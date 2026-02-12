import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async getDashboard(userId: string) {
    const accounts = await this.accountRepository.find({ where: { userId } });

    const totalBalance = accounts.reduce((sum, acc) => sum + Number(acc.balance), 0);

    const accountSummary = {
      total: accounts.length,
      checking: accounts.filter((a) => a.accountType === 'checking').length,
      savings: accounts.filter((a) => a.accountType === 'savings').length,
      active: accounts.filter((a) => a.status === 'active').length,
    };

    const recentTransactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.fromAccount', 'fromAccount')
      .leftJoin('transaction.toAccount', 'toAccount')
      .where('fromAccount.userId = :userId OR toAccount.userId = :userId', { userId })
      .orderBy('transaction.createdAt', 'DESC')
      .limit(10)
      .getMany();

    return {
      success: true,
      data: {
        total_balance: totalBalance,
        account_summary: accountSummary,
        accounts,
        recent_transactions: recentTransactions,
      },
    };
  }
}
