import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Account } from '../entities/account.entity';
import { Transaction } from '../entities/transaction.entity';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UpdateAccountStatusDto } from './dto/update-account-status.dto';

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

  /**
   * Get a single user by ID with accounts
   */
  async getUserById(id: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['accounts'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { passwordHash, ...userData } = user;
    const totalBalance = user.accounts.reduce((sum, acc) => sum + Number(acc.balance), 0);

    return {
      success: true,
      data: {
        ...userData,
        account_count: user.accounts.length,
        total_balance: totalBalance,
      },
    };
  }

  /**
   * Update user status (active, suspended, inactive)
   */
  async updateUserStatus(id: string, updateUserStatusDto: UpdateUserStatusDto): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.status = updateUserStatusDto.status;
    await this.userRepository.save(user);

    return {
      success: true,
      message: `User status updated to ${updateUserStatusDto.status}`,
      data: { id: user.id, status: user.status },
    };
  }

  /**
   * Update user role (user, admin)
   */
  async updateUserRole(id: string, updateUserRoleDto: UpdateUserRoleDto): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Prevent demoting last admin
    if (user.role === 'admin' && updateUserRoleDto.role === 'user') {
      const adminCount = await this.userRepository.count({ where: { role: 'admin' } });
      if (adminCount === 1) {
        throw new BadRequestException('Cannot demote the last admin user');
      }
    }

    user.role = updateUserRoleDto.role;
    await this.userRepository.save(user);

    return {
      success: true,
      message: `User role updated to ${updateUserRoleDto.role}`,
      data: { id: user.id, role: user.role },
    };
  }

  /**
   * Update account status (active, frozen, closed)
   */
  async updateAccountStatus(id: string, updateAccountStatusDto: UpdateAccountStatusDto): Promise<any> {
    const account = await this.accountRepository.findOne({ where: { id } });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    account.status = updateAccountStatusDto.status;
    await this.accountRepository.save(account);

    return {
      success: true,
      message: `Account status updated to ${updateAccountStatusDto.status}`,
      data: { id: account.id, status: account.status },
    };
  }

  /**
   * Get all transactions system-wide
   */
  async getAllTransactions(limit = 50): Promise<any> {
    const transactions = await this.transactionRepository.find({
      relations: ['fromAccount', 'toAccount', 'fromAccount.user', 'toAccount.user'],
      order: { createdAt: 'DESC' },
      take: limit,
    });

    const transactionsWithDetails = transactions.map((t) => ({
      id: t.id,
      fromAccountId: t.fromAccount?.id,
      fromAccountNumber: t.fromAccount?.accountNumber,
      fromUserEmail: t.fromAccount?.user?.email,
      toAccountId: t.toAccount?.id,
      toAccountNumber: t.toAccount?.accountNumber,
      toUserEmail: t.toAccount?.user?.email,
      amount: t.amount,
      transactionType: t.transactionType,
      status: t.status,
      description: t.description,
      createdAt: t.createdAt,
    }));

    return {
      success: true,
      data: transactionsWithDetails,
    };
  }
}
