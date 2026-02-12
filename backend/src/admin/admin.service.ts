import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Account } from '../entities/account.entity';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async getStats() {
    const totalUsers = await this.userRepository.count();
    const totalAccounts = await this.accountRepository.count();
    const totalTransactions = await this.transactionRepository.count();

    const accounts = await this.accountRepository.find();
    const totalBalance = accounts.reduce((sum, acc) => sum + Number(acc.balance), 0);

    const completedTransactions = await this.transactionRepository.find({
      where: { status: 'completed' },
    });
    const totalVolume = completedTransactions.reduce((sum, t) => sum + Number(t.amount), 0);

    const usersByStatus = await this.userRepository
      .createQueryBuilder('user')
      .select('user.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('user.status')
      .getRawMany();

    const accountsByType = await this.accountRepository
      .createQueryBuilder('account')
      .select('account.accountType', 'account_type')
      .addSelect('COUNT(*)', 'count')
      .groupBy('account.accountType')
      .getRawMany();

    return {
      success: true,
      data: {
        users: {
          total: totalUsers,
          by_status: usersByStatus.reduce((acc, row) => {
            acc[row.status] = parseInt(row.count);
            return acc;
          }, {}),
        },
        accounts: {
          total: totalAccounts,
          total_balance: totalBalance,
          by_type: accountsByType.reduce((acc, row) => {
            acc[row.account_type] = parseInt(row.count);
            return acc;
          }, {}),
        },
        transactions: {
          total: totalTransactions,
          total_volume: totalVolume,
        },
      },
    };
  }

  async getUsers() {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.accounts', 'accounts')
      .orderBy('user.createdAt', 'DESC')
      .getMany();

    const usersWithStats = users.map((user) => {
      const { passwordHash, accounts, ...userData } = user;
      const totalBalance = accounts.reduce((sum, acc) => sum + Number(acc.balance), 0);
      return {
        ...userData,
        account_count: accounts.length,
        total_balance: totalBalance,
      };
    });

    return {
      success: true,
      data: usersWithStats,
    };
  }

  async getAccounts() {
    const accounts = await this.accountRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });

    const accountsWithUser = accounts.map((account) => ({
      ...account,
      email: account.user.email,
      first_name: account.user.firstName,
      last_name: account.user.lastName,
    }));

    return {
      success: true,
      data: accountsWithUser,
    };
  }
}
