import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Account } from '../entities/account.entity';
import { Transaction } from '../entities/transaction.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async getDashboard(userId: string) {
    // 1. Get user info
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'firstName', 'lastName', 'email', 'phone', 'dateOfBirth'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 2. Get all user accounts
    const accounts = await this.accountRepository.find({
      where: { userId },
      order: { accountType: 'ASC' },
    });

    // 3. Calculate total balance
    const totalBalance = accounts.reduce((sum, account) => {
      return sum + Number(account.balance);
    }, 0);

    // 4. Get recent transactions (last 10 across all accounts)
    const recentTransactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.fromAccount', 'fromAccount')
      .leftJoin('transaction.toAccount', 'toAccount')
      .where('fromAccount.userId = :userId OR toAccount.userId = :userId', { userId })
      .orderBy('transaction.createdAt', 'DESC')
      .limit(10)
      .getMany();

    // 5. Get weekly spending (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const weeklyTransactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.fromAccount', 'fromAccount')
      .leftJoin('transaction.toAccount', 'toAccount')
      .where(
        '(fromAccount.userId = :userId OR toAccount.userId = :userId) AND transaction.createdAt > :sevenDaysAgo AND transaction.transactionType = :type',
        { userId, sevenDaysAgo, type: 'transfer' },
      )
      .orderBy('transaction.createdAt', 'ASC')
      .getMany();

    // Group by day of week
    const weeklySpending = this.calculateWeeklySpending(weeklyTransactions);

    // 6. Calculate profile completion
    const profileCompletion = this.calculateProfileCompletion(user);

    // 7. Return combined data
    return {
      success: true,
      data: {
        user: {
          id: user.id,
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
        },
        accounts: accounts.map((account) => ({
          id: account.id,
          accountType: account.accountType,
          accountNumber: account.accountNumber,
          balance: Number(account.balance),
          currency: account.currency,
          status: account.status,
          apy: account.accountType === 'savings' ? '4.50' : null,
        })),
        totalBalance: Math.round(totalBalance * 100) / 100,
        recentTransactions: recentTransactions.map((tx) => ({
          id: tx.id,
          merchant: tx.description || 'Unknown',
          category: 'Other',
          amount: Number(tx.amount),
          date: tx.createdAt,
          status: tx.status,
          type: Number(tx.amount) < 0 ? 'debit' : 'credit',
        })),
        weeklySpending,
        profileCompletion,
      },
    };
  }

  private calculateWeeklySpending(transactions: Transaction[]) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const spendingByDay = {
      Sun: 0,
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
    };

    transactions.forEach((tx) => {
      const dayName = days[new Date(tx.createdAt).getDay()];
      spendingByDay[dayName] += Math.abs(Number(tx.amount));
    });

    return [
      { day: 'Mon', amount: spendingByDay.Mon },
      { day: 'Tue', amount: spendingByDay.Tue },
      { day: 'Wed', amount: spendingByDay.Wed },
      { day: 'Thu', amount: spendingByDay.Thu },
      { day: 'Fri', amount: spendingByDay.Fri },
      { day: 'Sat', amount: spendingByDay.Sat },
      { day: 'Sun', amount: spendingByDay.Sun },
    ];
  }

  private calculateProfileCompletion(user: User) {
    const tasks = [
      {
        id: 'verify-id',
        title: 'Verify Identity',
        description: 'SSN & ID upload',
        points: 25,
        completed: !!user.phone && !!user.dateOfBirth,
      },
      {
        id: 'confirm-address',
        title: 'Confirm Address',
        description: 'Verify residency',
        points: 15,
        completed: false,
      },
      {
        id: 'link-bank',
        title: 'Link External Bank',
        description: 'For easy transfers',
        points: 30,
        completed: false,
      },
      {
        id: 'enable-2fa',
        title: 'Enable 2FA',
        description: 'Secure your account',
        points: 10,
        completed: false,
      },
    ];

    const completedTasks = tasks.filter((t) => t.completed).map((t) => t.id);
    const pendingTasks = tasks
      .filter((t) => !t.completed)
      .map((t) => ({
        id: t.id,
        title: t.title,
        description: t.description,
        points: t.points,
      }));

    const totalPoints = tasks.reduce((sum, t) => sum + t.points, 0);
    const earnedPoints = tasks
      .filter((t) => t.completed)
      .reduce((sum, t) => sum + t.points, 0);
    const percentage = Math.round((earnedPoints / totalPoints) * 100);

    return {
      percentage,
      completedTasks,
      pendingTasks,
    };
  }

  async getProfileCompletion(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'firstName', 'lastName', 'email', 'phone', 'dateOfBirth'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tasks = [
      {
        id: 'basic-info',
        title: 'Basic Information',
        description: 'First and last name',
        points: 10,
        completed: !!user.firstName && !!user.lastName,
      },
      {
        id: 'email-verified',
        title: 'Email Verified',
        description: 'Your email address',
        points: 10,
        completed: !!user.email,
      },
      {
        id: 'phone-added',
        title: 'Phone Number',
        description: 'Add your phone number',
        points: 15,
        completed: !!user.phone,
      },
      {
        id: 'dob-added',
        title: 'Date of Birth',
        description: 'Your date of birth',
        points: 10,
        completed: !!user.dateOfBirth,
      },
      {
        id: 'verify-id',
        title: 'Verify Identity',
        description: 'ID verification',
        points: 25,
        completed: false, // TODO: Check if user has verified ID
      },
      {
        id: 'avatar-uploaded',
        title: 'Profile Picture',
        description: 'Upload a profile photo',
        points: 10,
        completed: !!user.avatarUrl,
      },
      {
        id: 'confirm-address',
        title: 'Confirm Address',
        description: 'Verify your address',
        points: 15,
        completed: false, // TODO: Check if user confirmed address
      },
      {
        id: 'enable-2fa',
        title: 'Enable 2FA',
        description: 'Two-factor authentication',
        points: 20,
        completed: false, // TODO: Check if 2FA is enabled
      },
    ];

    const completedTasks = tasks.filter((t) => t.completed).map((t) => t.id);
    const pendingTasks = tasks
      .filter((t) => !t.completed)
      .map((t) => ({
        id: t.id,
        title: t.title,
        description: t.description,
        points: t.points,
      }));

    const totalPoints = tasks.reduce((sum, t) => sum + t.points, 0);
    const earnedPoints = tasks
      .filter((t) => t.completed)
      .reduce((sum, t) => sum + t.points, 0);
    const percentage = Math.round((earnedPoints / totalPoints) * 100);

    return {
      percentage,
      completedTasks,
      pendingTasks,
      totalSteps: tasks.length,
      completedCount: completedTasks.length,
    };
  }

  async getQuickStats(userId: string) {
    const accounts = await this.accountRepository.find({
      where: { userId, status: 'active' },
    });

    const totalBalance = accounts.reduce((sum, account) => sum + Number(account.balance), 0);
    const accountCount = accounts.length;

    const checkingBalance = accounts
      .filter((acc) => acc.accountType === 'checking')
      .reduce((sum, acc) => sum + Number(acc.balance), 0);

    const savingsBalance = accounts
      .filter((acc) => acc.accountType === 'savings')
      .reduce((sum, acc) => sum + Number(acc.balance), 0);

    // Get recent transactions
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentTransactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.fromAccount', 'fromAccount')
      .leftJoin('transaction.toAccount', 'toAccount')
      .where(
        '(fromAccount.userId = :userId OR toAccount.userId = :userId) AND transaction.createdAt > :sevenDaysAgo',
        { userId, sevenDaysAgo },
      )
      .orderBy('transaction.createdAt', 'DESC')
      .getMany();

    const lastTransactionDate = recentTransactions.length > 0 ? recentTransactions[0].createdAt : null;
    const transactionCount7Days = recentTransactions.length;

    return {
      totalBalance: Math.round(totalBalance * 100) / 100,
      accountCount,
      checkingBalance: Math.round(checkingBalance * 100) / 100,
      savingsBalance: Math.round(savingsBalance * 100) / 100,
      recentActivity: {
        lastTransactionDate,
        transactionCount7Days,
      },
    };
  }
}
