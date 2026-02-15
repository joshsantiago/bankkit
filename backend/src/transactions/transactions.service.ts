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
}
