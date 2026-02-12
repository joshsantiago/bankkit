import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { Transaction } from '../entities/transaction.entity';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  generateAccountNumber(accountType: string): string {
    const prefix = accountType === 'checking' ? 'CHK' : 'SAV';
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  }

  async findAll(userId: string, isAdmin: boolean) {
    if (isAdmin) {
      const accounts = await this.accountRepository.find({
        relations: ['user'],
        order: { createdAt: 'DESC' },
      });
      return { success: true, data: accounts };
    }

    const accounts = await this.accountRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
    return { success: true, data: accounts };
  }

  async findOne(id: string, userId: string, isAdmin: boolean) {
    const account = await this.accountRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (!isAdmin && account.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    const transactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .where('transaction.fromAccountId = :id OR transaction.toAccountId = :id', { id })
      .orderBy('transaction.createdAt', 'DESC')
      .limit(10)
      .getMany();

    return {
      success: true,
      data: { ...account, recent_transactions: transactions },
    };
  }

  async create(userId: string, createAccountDto: CreateAccountDto) {
    let accountNumber = this.generateAccountNumber(createAccountDto.account_type);

    // Ensure uniqueness
    for (let i = 0; i < 5; i++) {
      const existing = await this.accountRepository.findOne({
        where: { accountNumber },
      });
      if (!existing) break;
      accountNumber = this.generateAccountNumber(createAccountDto.account_type);
    }

    const account = this.accountRepository.create({
      userId,
      accountNumber,
      accountType: createAccountDto.account_type,
      balance: 0,
    });

    await this.accountRepository.save(account);

    return {
      success: true,
      data: account,
      message: 'Account created successfully',
    };
  }

  async updateStatus(id: string, status: string, userId: string, isAdmin: boolean) {
    const account = await this.accountRepository.findOne({ where: { id } });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (!isAdmin && account.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    account.status = status;
    await this.accountRepository.save(account);

    return {
      success: true,
      data: account,
      message: 'Account status updated successfully',
    };
  }
}
