import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { Account } from '../entities/account.entity';
import { CreateTransferDto } from './dto/create-transfer.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private dataSource: DataSource,
  ) {}

  async findAll(userId: string, isAdmin: boolean, accountId?: string) {
    let query = this.transactionRepository.createQueryBuilder('transaction');

    if (accountId) {
      // Verify ownership if not admin
      if (!isAdmin) {
        const account = await this.accountRepository.findOne({ where: { id: accountId } });
        if (!account || account.userId !== userId) {
          throw new ForbiddenException('Access denied');
        }
      }

      query = query.where(
        'transaction.fromAccountId = :accountId OR transaction.toAccountId = :accountId',
        { accountId },
      );
    } else if (!isAdmin) {
      // For non-admin users, filter by their accounts
      query = query
        .leftJoin('transaction.fromAccount', 'fromAccount')
        .leftJoin('transaction.toAccount', 'toAccount')
        .where('fromAccount.userId = :userId OR toAccount.userId = :userId', { userId });
    }

    const transactions = await query
      .orderBy('transaction.createdAt', 'DESC')
      .limit(20)
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
