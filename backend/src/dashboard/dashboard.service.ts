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

  // 2.4 Get Spending Insights
  async getSpendingInsights(userId: string, month?: number, year?: number) {
    const currentDate = new Date();
    const targetMonth = month || currentDate.getMonth();
    const targetYear = year || currentDate.getFullYear();

    const startDate = new Date(targetYear, targetMonth, 1);
    const endDate = new Date(targetYear, targetMonth + 1, 0, 23, 59, 59);

    const transactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.fromAccount', 'fromAccount')
      .leftJoin('transaction.toAccount', 'toAccount')
      .where(
        '(fromAccount.userId = :userId OR toAccount.userId = :userId) AND transaction.amount < 0 AND transaction.createdAt BETWEEN :startDate AND :endDate',
        { userId, startDate, endDate },
      )
      .orderBy('transaction.createdAt', 'DESC')
      .getMany();

    // Group by category
    const categoryTotals: Record<string, number> = {};
    let totalSpending = 0;

    transactions.forEach((tx) => {
      const category = tx.category || 'Other';
      const amount = Math.abs(Number(tx.amount));
      categoryTotals[category] = (categoryTotals[category] || 0) + amount;
      totalSpending += amount;
    });

    const byCategory = Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        category,
        amount: Math.round(amount * 100) / 100,
        percentage: Math.round((amount / totalSpending) * 100),
      }))
      .sort((a, b) => b.amount - a.amount);

    // Monthly comparison
    const prevMonth = targetMonth === 0 ? 11 : targetMonth - 1;
    const prevYear = targetMonth === 0 ? targetYear - 1 : targetYear;
    const prevStartDate = new Date(prevYear, prevMonth, 1);
    const prevEndDate = new Date(prevYear, prevMonth + 1, 0, 23, 59, 59);

    const prevTransactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.fromAccount', 'fromAccount')
      .leftJoin('transaction.toAccount', 'toAccount')
      .where(
        '(fromAccount.userId = :userId OR toAccount.userId = :userId) AND transaction.amount < 0 AND transaction.createdAt BETWEEN :startDate AND :endDate',
        { userId, startDate: prevStartDate, endDate: prevEndDate },
      )
      .getMany();

    const prevTotalSpending = prevTransactions.reduce((sum, tx) => sum + Math.abs(Number(tx.amount)), 0);
    const monthOverMonthChange = prevTotalSpending > 0 
      ? Math.round(((totalSpending - prevTotalSpending) / prevTotalSpending) * 100) 
      : 0;

    return {
      totalSpending: Math.round(totalSpending * 100) / 100,
      transactionCount: transactions.length,
      byCategory,
      monthOverMonthChange,
      period: {
        month: targetMonth,
        year: targetYear,
        monthName: startDate.toLocaleString('default', { month: 'long' }),
      },
    };
  }

  // 2.5 Get Budget Goals
  async getBudgetGoals(userId: string) {
    // Default budgets based on typical spending categories
    const defaultBudgets = [
      { category: 'Food & Dining', limit: 500, color: '#F59E0B' },
      { category: 'Shopping', limit: 300, color: '#8B5CF6' },
      { category: 'Transportation', limit: 200, color: '#3B82F6' },
      { category: 'Entertainment', limit: 150, color: '#EC4899' },
      { category: 'Bills & Utilities', limit: 400, color: '#10B981' },
      { category: 'Health & Fitness', limit: 100, color: '#EF4444' },
    ];

    // Get current month spending
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59);

    const transactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.fromAccount', 'fromAccount')
      .where('fromAccount.userId = :userId AND transaction.amount < 0 AND transaction.createdAt BETWEEN :startDate AND :endDate',
        { userId, startDate, endDate },
      )
      .getMany();

    // Calculate spending by category
    const spendingByCategory: Record<string, number> = {};
    transactions.forEach((tx) => {
      const category = tx.category || 'Other';
      spendingByCategory[category] = (spendingByCategory[category] || 0) + Math.abs(Number(tx.amount));
    });

    // Map budgets with current spending
    const budgets = defaultBudgets.map((budget) => {
      const spent = Math.round((spendingByCategory[budget.category] || 0) * 100) / 100;
      const remaining = Math.max(0, budget.limit - spent);
      const percentage = Math.round((spent / budget.limit) * 100);
      
      return {
        ...budget,
        spent,
        remaining,
        percentage: Math.min(100, percentage),
        status: percentage >= 100 ? 'exceeded' : percentage >= 80 ? 'warning' : 'on-track',
      };
    });

    const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

    return {
      budgets,
      summary: {
        totalBudget,
        totalSpent: Math.round(totalSpent * 100) / 100,
        totalRemaining: Math.max(0, totalBudget - totalSpent),
        overallPercentage: Math.round((totalSpent / totalBudget) * 100),
      },
    };
  }

  // 2.6 Get Upcoming Bills
  async getUpcomingBills(userId: string) {
    // Get recent transactions to identify recurring payments
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentTransactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.fromAccount', 'fromAccount')
      .where('fromAccount.userId = :userId AND transaction.amount < 0 AND transaction.createdAt > :thirtyDaysAgo',
        { userId, thirtyDaysAgo },
      )
      .orderBy('transaction.createdAt', 'DESC')
      .getMany();

    // Group by description to find recurring
    const merchantTransactions: Record<string, { amount: number; count: number; lastDate: Date }> = {};
    recentTransactions.forEach((tx) => {
      const merchant = tx.description || 'Unknown';
      if (!merchantTransactions[merchant]) {
        merchantTransactions[merchant] = { amount: 0, count: 0, lastDate: tx.createdAt };
      }
      merchantTransactions[merchant].amount += Math.abs(Number(tx.amount));
      merchantTransactions[merchant].count += 1;
      if (new Date(tx.createdAt) > new Date(merchantTransactions[merchant].lastDate)) {
        merchantTransactions[merchant].lastDate = tx.createdAt;
      }
    });

    // Filter to likely recurring (appeared 2+ times)
    const recurring = Object.entries(merchantTransactions)
      .filter(([_, data]) => data.count >= 2)
      .map(([merchant, data]) => ({
        merchant,
        amount: Math.round((data.amount / data.count) * 100) / 100,
        averageAmount: Math.round((data.amount / data.count) * 100) / 100,
        lastPaid: data.lastDate,
        frequency: data.count >= 4 ? 'weekly' : data.count >= 2 ? 'monthly' : 'occasional',
      }))
      .sort((a, b) => new Date(a.lastPaid).getTime() - new Date(b.lastPaid).getTime())
      .slice(0, 10);

    // Calculate upcoming (next 7 days estimate)
    const upcomingTotal = recurring.reduce((sum, r) => sum + r.averageAmount, 0);

    return {
      recurring,
      summary: {
        count: recurring.length,
        estimatedMonthly: Math.round(upcomingTotal * 4 * 100) / 100,
      },
    };
  }

  // 2.7 Get Financial Tips
  async getFinancialTips(userId: string) {
    const accounts = await this.accountRepository.find({
      where: { userId },
    });

    const totalBalance = accounts.reduce((sum, acc) => sum + Number(acc.balance), 0);
    const savingsBalance = accounts
      .filter((acc) => acc.accountType === 'savings')
      .reduce((sum, acc) => sum + Number(acc.balance), 0);

    // Get recent spending
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentTransactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.fromAccount', 'fromAccount')
      .where('fromAccount.userId = :userId AND transaction.amount < 0 AND transaction.createdAt > :thirtyDaysAgo',
        { userId, thirtyDaysAgo },
      )
      .getMany();

    const totalSpending = recentTransactions.reduce((sum, tx) => sum + Math.abs(Number(tx.amount)), 0);
    const avgDailySpending = totalSpending / 30;

    const tips = [];

    // Savings tips
    if (savingsBalance < totalBalance * 0.2) {
      tips.push({
        id: 'emergency-fund',
        title: 'Build Your Emergency Fund',
        description: 'Financial experts recommend saving 3-6 months of expenses. You currently have less than 20% in savings.',
        category: 'savings',
        priority: 'high',
        actionUrl: '/accounts?type=savings',
      });
    } else {
      tips.push({
        id: 'great-savings',
        title: 'Great Savings Habit!',
        description: `You've saved ${Math.round((savingsBalance / totalBalance) * 100)}% of your total balance. Keep it up!`,
        category: 'savings',
        priority: 'low',
      });
    }

    // Spending tips
    if (avgDailySpending > 100) {
      tips.push({
        id: 'reduce-spending',
        title: 'Reduce Daily Spending',
        description: `Your average daily spending is $${avgDailySpending.toFixed(2)}. Consider setting a budget to track expenses.`,
        category: 'spending',
        priority: 'medium',
        actionUrl: '/dashboard',
      });
    }

    // Account tips
    if (accounts.length === 1) {
      tips.push({
        id: 'multiple-accounts',
        title: 'Consider Multiple Accounts',
        description: 'Having separate accounts for savings and spending can help you manage your money better.',
        category: 'accounts',
        priority: 'low',
        actionUrl: '/accounts',
      });
    }

    // Add positive tip if doing well
    if (tips.every(t => t.priority !== 'high')) {
      tips.push({
        id: 'financial-health',
        title: 'Your Finances Look Good!',
        description: 'You\'re on track with your financial goals. Keep monitoring your spending and savings.',
        category: 'general',
        priority: 'low',
      });
    }

    return {
      tips: tips.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
      }),
      summary: {
        totalTips: tips.length,
        actionableTips: tips.filter(t => t.actionUrl).length,
      },
    };
  }

  // 2.8 Get Account Statements
  async getAccountStatements(userId: string, accountId?: string) {
    const accounts = await this.accountRepository.find({
      where: accountId ? { id: accountId, userId } : { userId },
    });

    if (accounts.length === 0) {
      return {
        statements: [],
        summary: { count: 0 },
      };
    }

    // Generate monthly statements for the last 6 months
    const statements = [];
    const now = new Date();

    for (let i = 0; i < 6; i++) {
      const statementDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const startDate = new Date(statementDate.getFullYear(), statementDate.getMonth(), 1);
      const endDate = new Date(statementDate.getFullYear(), statementDate.getMonth() + 1, 0, 23, 59, 59);

      for (const account of accounts) {
        const transactions = await this.transactionRepository.find({
          where: {
            accountId: account.id,
            createdAt: MoreThan(startDate),
          },
        });

        const periodTransactions = transactions.filter(
          (tx) => new Date(tx.createdAt) <= endDate
        );

        const credits = periodTransactions
          .filter((tx) => Number(tx.amount) > 0)
          .reduce((sum, tx) => sum + Number(tx.amount), 0);
        const debits = periodTransactions
          .filter((tx) => Number(tx.amount) < 0)
          .reduce((sum, tx) => sum + Math.abs(Number(tx.amount)), 0);

        const startingBalance = Number(account.balance) - credits + debits;

        statements.push({
          id: `stmt-${account.id}-${statementDate.getFullYear()}-${statementDate.getMonth()}`,
          accountId: account.id,
          accountType: account.accountType,
          accountNumber: account.accountNumber,
          period: {
            year: statementDate.getFullYear(),
            month: statementDate.getMonth() + 1,
            monthName: statementDate.toLocaleString('default', { month: 'long' }),
          },
          startingBalance: Math.round(startingBalance * 100) / 100,
          endingBalance: Number(account.balance),
          credits: Math.round(credits * 100) / 100,
          debits: Math.round(debits * 100) / 100,
          transactionCount: periodTransactions.length,
        });
      }
    }

    return {
      statements: statements.sort((a, b) => {
        const dateA = new Date(a.period.year, a.period.month - 1).getTime();
        const dateB = new Date(b.period.year, b.period.month - 1).getTime();
        return dateB - dateA;
      }),
      summary: {
        count: statements.length,
      },
    };
  }
}
