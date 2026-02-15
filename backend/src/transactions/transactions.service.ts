import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { Account } from '../entities/account.entity';
import { CreateTransferDto } from './dto/create-transfer.dto';

interface FindAllOptions {
  accountId?: string;
  type?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
}

interface RecurringTransaction {
  id: string;
  userId: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  nextExecutionDate: Date;
  description: string;
  category: string;
  active: boolean;
  createdAt: Date;
}

interface TransactionCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  isCustom: boolean;
  userId?: string;
}

// In-memory storage for recurring transactions and custom categories
const recurringTransactions: Map<string, RecurringTransaction[]> = new Map();
const customCategories: Map<string, TransactionCategory[]> = new Map();

// Default categories
const defaultCategories: TransactionCategory[] = [
  { id: 'cat-1', name: 'Food & Dining', icon: 'utensils', color: '#F59E0B', isCustom: false },
  { id: 'cat-2', name: 'Shopping', icon: 'shopping-bag', color: '#8B5CF6', isCustom: false },
  { id: 'cat-3', name: 'Transportation', icon: 'car', color: '#3B82F6', isCustom: false },
  { id: 'cat-4', name: 'Entertainment', icon: 'film', color: '#EC4899', isCustom: false },
  { id: 'cat-5', name: 'Bills & Utilities', icon: 'zap', color: '#10B981', isCustom: false },
  { id: 'cat-6', name: 'Health & Fitness', icon: 'heart', color: '#EF4444', isCustom: false },
  { id: 'cat-7', name: 'Travel', icon: 'plane', color: '#06B6D4', isCustom: false },
  { id: 'cat-8', name: 'Income', icon: 'dollar-sign', color: '#22C55E', isCustom: false },
  { id: 'cat-9', name: 'Transfer', icon: 'repeat', color: '#6366F1', isCustom: false },
  { id: 'cat-10', name: 'Other', icon: 'more-horizontal', color: '#64748B', isCustom: false },
];

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private dataSource: DataSource,
  ) {}

  async findAll(userId: string, isAdmin: boolean, options: FindAllOptions = {}) {
    let query = this.transactionRepository.createQueryBuilder('transaction');

    if (options.accountId) {
      // Verify ownership if not admin
      if (!isAdmin) {
        const account = await this.accountRepository.findOne({ where: { id: options.accountId } });
        if (!account || account.userId !== userId) {
          throw new ForbiddenException('Access denied');
        }
      }

      query = query.where(
        'transaction.fromAccountId = :accountId OR transaction.toAccountId = :accountId',
        { accountId: options.accountId },
      );
    } else if (!isAdmin) {
      // For non-admin users, filter by their accounts
      query = query
        .leftJoin('transaction.fromAccount', 'fromAccount')
        .leftJoin('transaction.toAccount', 'toAccount')
        .where('fromAccount.userId = :userId OR toAccount.userId = :userId', { userId });
    }

    // Apply type filter
    if (options.type) {
      query = query.andWhere('transaction.transactionType = :type', { type: options.type });
    }

    // Apply status filter
    if (options.status) {
      query = query.andWhere('transaction.status = :status', { status: options.status });
    }

    // Apply date range filters
    if (options.startDate) {
      query = query.andWhere('transaction.createdAt >= :startDate', { startDate: new Date(options.startDate) });
    }

    if (options.endDate) {
      query = query.andWhere('transaction.createdAt <= :endDate', { endDate: new Date(options.endDate) });
    }

    const transactions = await query
      .orderBy('transaction.createdAt', 'DESC')
      .limit(options.limit || 20)
      .getMany();

    return { success: true, data: transactions };
  }

  async findOne(id: string, userId: string, isAdmin: boolean) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['fromAccount', 'toAccount'],
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    // Check access rights
    if (!isAdmin) {
      const hasAccess =
        (transaction.fromAccount && transaction.fromAccount.userId === userId) ||
        (transaction.toAccount && transaction.toAccount.userId === userId);

      if (!hasAccess) {
        throw new ForbiddenException('Access denied');
      }
    }

    return { success: true, data: transaction };
  }

  async getAnalytics(userId: string, isAdmin: boolean, startDate?: string, endDate?: string) {
    let query = this.transactionRepository.createQueryBuilder('transaction');

    if (!isAdmin) {
      // For non-admin users, filter by their accounts
      query = query
        .leftJoin('transaction.fromAccount', 'fromAccount')
        .leftJoin('transaction.toAccount', 'toAccount')
        .where('fromAccount.userId = :userId OR toAccount.userId = :userId', { userId });
    }

    // Apply date range filters
    if (startDate) {
      query = query.andWhere('transaction.createdAt >= :startDate', { startDate: new Date(startDate) });
    }

    if (endDate) {
      query = query.andWhere('transaction.createdAt <= :endDate', { endDate: new Date(endDate) });
    }

    const transactions = await query.getMany();

    // Calculate analytics
    const totalCount = transactions.length;
    const totalAmount = transactions.reduce((sum, tx) => sum + Number(tx.amount), 0);
    const averageAmount = totalCount > 0 ? totalAmount / totalCount : 0;

    const transfers = transactions.filter(tx => tx.transactionType === 'transfer').length;
    const deposits = transactions.filter(tx => tx.transactionType === 'deposit').length;
    const withdrawals = transactions.filter(tx => tx.transactionType === 'withdrawal').length;

    const completed = transactions.filter(tx => tx.status === 'completed').length;
    const pending = transactions.filter(tx => tx.status === 'pending').length;
    const failed = transactions.filter(tx => tx.status === 'failed').length;

    // Group by type for amount breakdown
    const amountByType = {
      transfers: transactions
        .filter(tx => tx.transactionType === 'transfer')
        .reduce((sum, tx) => sum + Number(tx.amount), 0),
      deposits: transactions
        .filter(tx => tx.transactionType === 'deposit')
        .reduce((sum, tx) => sum + Number(tx.amount), 0),
      withdrawals: transactions
        .filter(tx => tx.transactionType === 'withdrawal')
        .reduce((sum, tx) => sum + Number(tx.amount), 0),
    };

    return {
      success: true,
      data: {
        summary: {
          totalCount,
          totalAmount: Math.round(totalAmount * 100) / 100,
          averageAmount: Math.round(averageAmount * 100) / 100,
        },
        byType: {
          transfers,
          deposits,
          withdrawals,
        },
        amountByType,
        byStatus: {
          completed,
          pending,
          failed,
        },
        dateRange: {
          startDate: startDate ? new Date(startDate) : null,
          endDate: endDate ? new Date(endDate) : null,
        },
      },
    };
  }

  async createTransfer(userId: string, isAdmin: boolean, createTransferDto: CreateTransferDto) {
    const { from_account_id, to_account_id, amount, description } = createTransferDto;

    if (amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero');
    }

    if (from_account_id === to_account_id) {
      throw new BadRequestException('Cannot transfer to the same account');
    }

    // Use database transaction for atomicity
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Lock and fetch accounts
      const fromAccount = await queryRunner.manager.findOne(Account, {
        where: { id: from_account_id },
        lock: { mode: 'pessimistic_write' },
      });

      const toAccount = await queryRunner.manager.findOne(Account, {
        where: { id: to_account_id },
        lock: { mode: 'pessimistic_write' },
      });

      // Validations
      if (!fromAccount) {
        throw new BadRequestException('Source account not found');
      }

      if (!toAccount) {
        throw new BadRequestException('Destination account not found');
      }

      if (!isAdmin && fromAccount.userId !== userId) {
        throw new ForbiddenException('You do not own the source account');
      }

      if (fromAccount.status !== 'active') {
        throw new BadRequestException('Source account is not active');
      }

      if (toAccount.status !== 'active') {
        throw new BadRequestException('Destination account is not active');
      }

      if (Number(fromAccount.balance) < amount) {
        throw new BadRequestException('Insufficient funds');
      }

      // Update balances
      fromAccount.balance = Number(fromAccount.balance) - amount;
      toAccount.balance = Number(toAccount.balance) + amount;

      await queryRunner.manager.save(fromAccount);
      await queryRunner.manager.save(toAccount);

      // Create transaction record
      const transaction = queryRunner.manager.create(Transaction, {
        fromAccountId: from_account_id,
        toAccountId: to_account_id,
        amount,
        transactionType: 'transfer',
        status: 'completed',
        description,
      });

      await queryRunner.manager.save(transaction);

      await queryRunner.commitTransaction();

      return {
        success: true,
        data: transaction,
        message: 'Transfer completed successfully',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // 4.5 Get Recurring Transactions
  async getRecurringTransactions(userId: string) {
    const userRecurring = recurringTransactions.get(userId) || [];
    
    return {
      success: true,
      data: userRecurring,
    };
  }

  // 4.6 Set Up Recurring Transfer
  async createRecurringTransfer(
    userId: string,
    data: {
      from_account_id: string;
      to_account_id: string;
      amount: number;
      frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
      description: string;
      category: string;
    },
  ) {
    // Verify accounts belong to user
    const fromAccount = await this.accountRepository.findOne({
      where: { id: data.from_account_id, userId },
    });
    
    if (!fromAccount) {
      throw new NotFoundException('Source account not found');
    }

    const toAccount = await this.accountRepository.findOne({
      where: { id: data.to_account_id },
    });
    
    if (!toAccount) {
      throw new NotFoundException('Destination account not found');
    }

    const userRecurring = recurringTransactions.get(userId) || [];
    
    const nextDate = new Date();
    switch (data.frequency) {
      case 'daily':
        nextDate.setDate(nextDate.getDate() + 1);
        break;
      case 'weekly':
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case 'biweekly':
        nextDate.setDate(nextDate.getDate() + 14);
        break;
      case 'monthly':
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
    }

    const newRecurring: RecurringTransaction = {
      id: `rec-${Date.now()}`,
      userId,
      fromAccountId: data.from_account_id,
      toAccountId: data.to_account_id,
      amount: data.amount,
      frequency: data.frequency,
      nextExecutionDate: nextDate,
      description: data.description,
      category: data.category || 'Transfer',
      active: true,
      createdAt: new Date(),
    };

    userRecurring.push(newRecurring);
    recurringTransactions.set(userId, userRecurring);

    return {
      success: true,
      data: newRecurring,
      message: 'Recurring transfer created successfully',
    };
  }

  // 4.7 Cancel Recurring Transfer
  async cancelRecurringTransfer(userId: string, recurringId: string) {
    const userRecurring = recurringTransactions.get(userId) || [];
    const recurringIndex = userRecurring.findIndex((r) => r.id === recurringId);

    if (recurringIndex === -1) {
      throw new NotFoundException('Recurring transfer not found');
    }

    userRecurring[recurringIndex].active = false;
    recurringTransactions.set(userId, userRecurring);

    return {
      success: true,
      message: 'Recurring transfer cancelled successfully',
    };
  }

  // 4.8 Get Transaction Categories
  async getCategories(userId: string) {
    const userCategories = customCategories.get(userId) || [];
    
    return {
      success: true,
      data: [...defaultCategories, ...userCategories],
    };
  }

  // 4.9 Create Custom Category
  async createCategory(
    userId: string,
    data: { name: string; icon: string; color: string },
  ) {
    if (!data.name || !data.icon || !data.color) {
      throw new BadRequestException('Name, icon, and color are required');
    }

    const userCategories = customCategories.get(userId) || [];
    
    // Check for duplicate name
    if (userCategories.some((c) => c.name.toLowerCase() === data.name.toLowerCase())) {
      throw new BadRequestException('Category with this name already exists');
    }

    const newCategory: TransactionCategory = {
      id: `cat-custom-${Date.now()}`,
      name: data.name,
      icon: data.icon,
      color: data.color,
      isCustom: true,
      userId,
    };

    userCategories.push(newCategory);
    customCategories.set(userId, userCategories);

    return {
      success: true,
      data: newCategory,
      message: 'Category created successfully',
    };
  }

  // 4.10 Export Transactions to CSV
  async exportTransactions(
    userId: string,
    options: { startDate?: string; endDate?: string; accountId?: string },
  ) {
    const transactions = await this.findAll(userId, false, {
      ...options,
      limit: 10000,
    });

    const csvRows = [
      ['Date', 'Description', 'Category', 'Type', 'Amount', 'Status'].join(','),
    ];

    transactions.data.forEach((tx) => {
      const row = [
        new Date(tx.createdAt).toISOString(),
        `"${(tx.description || '').replace(/"/g, '""')}"`,
        tx.category || 'Other',
        tx.transactionType,
        tx.amount,
        tx.status,
      ];
      csvRows.push(row.join(','));
    });

    const csv = csvRows.join('\n');

    return {
      success: true,
      data: {
        csv,
        filename: `transactions_${new Date().toISOString().split('T')[0]}.csv`,
        count: transactions.data.length,
      },
    };
  }
}
