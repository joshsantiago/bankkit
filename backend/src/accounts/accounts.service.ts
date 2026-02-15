import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, LessThan, Between } from 'typeorm';
import { Account } from '../entities/account.entity';
import { Transaction } from '../entities/transaction.entity';
import { CreateAccountDto } from './dto/create-account.dto';

export interface AccountAlert {
  id: string;
  accountId: string;
  type: 'low_balance' | 'large_transaction' | 'deposit' | 'withdrawal';
  threshold: number;
  enabled: boolean;
  createdAt: Date;
}

export interface Beneficiary {
  id: string;
  accountId: string;
  name: string;
  email: string;
  relationship: string;
  createdAt: Date;
}

// In-memory storage for alerts and beneficiaries (would use database in production)
const alertsStore: Map<string, AccountAlert[]> = new Map();
const beneficiariesStore: Map<string, Beneficiary[]> = new Map();

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

  // 3.5 Get Account Statement
  async getAccountStatement(accountId: string, userId: string, month?: number, year?: number) {
    const account = await this.accountRepository.findOne({ where: { id: accountId, userId } });
    
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const currentDate = new Date();
    const targetMonth = month || currentDate.getMonth();
    const targetYear = year || currentDate.getFullYear();

    const startDate = new Date(targetYear, targetMonth, 1);
    const endDate = new Date(targetYear, targetMonth + 1, 0, 23, 59, 59);

    const transactions = await this.transactionRepository.find({
      where: {
        accountId,
        createdAt: Between(startDate, endDate),
      },
      order: { createdAt: 'DESC' },
    });

    const credits = transactions
      .filter((tx) => Number(tx.amount) > 0)
      .reduce((sum, tx) => sum + Number(tx.amount), 0);
    const debits = transactions
      .filter((tx) => Number(tx.amount) < 0)
      .reduce((sum, tx) => sum + Math.abs(Number(tx.amount)), 0);

    return {
      success: true,
      data: {
        account: {
          id: account.id,
          accountNumber: account.accountNumber,
          accountType: account.accountType,
        },
        period: {
          month: targetMonth + 1,
          year: targetYear,
          monthName: startDate.toLocaleString('default', { month: 'long' }),
        },
        transactions: transactions.map((tx) => ({
          id: tx.id,
          date: tx.createdAt,
          description: tx.description,
          amount: Number(tx.amount),
          type: Number(tx.amount) >= 0 ? 'credit' : 'debit',
          status: tx.status,
        })),
        summary: {
          startingBalance: Number(account.balance) - credits + debits,
          endingBalance: Number(account.balance),
          totalCredits: credits,
          totalDebits: debits,
          transactionCount: transactions.length,
        },
      },
    };
  }

  // 3.7 Set Account Alert
  async setAccountAlert(accountId: string, userId: string, alertData: { type: string; threshold: number }) {
    const account = await this.accountRepository.findOne({ where: { id: accountId, userId } });
    
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const validTypes = ['low_balance', 'large_transaction', 'deposit', 'withdrawal'];
    if (!validTypes.includes(alertData.type)) {
      throw new BadRequestException('Invalid alert type');
    }

    const alerts = alertsStore.get(accountId) || [];
    const newAlert: AccountAlert = {
      id: `alert-${Date.now()}`,
      accountId,
      type: alertData.type as AccountAlert['type'],
      threshold: alertData.threshold,
      enabled: true,
      createdAt: new Date(),
    };
    
    alerts.push(newAlert);
    alertsStore.set(accountId, alerts);

    return {
      success: true,
      data: newAlert,
      message: 'Alert created successfully',
    };
  }

  // 3.8 Get Account Alerts
  async getAccountAlerts(accountId: string, userId: string) {
    const account = await this.accountRepository.findOne({ where: { id: accountId, userId } });
    
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const alerts = alertsStore.get(accountId) || [];

    return {
      success: true,
      data: alerts,
    };
  }

  // 3.9 Update Account Alert
  async updateAccountAlert(alertId: string, accountId: string, userId: string, updateData: { threshold?: number; enabled?: boolean }) {
    const account = await this.accountRepository.findOne({ where: { id: accountId, userId } });
    
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const alerts = alertsStore.get(accountId) || [];
    const alertIndex = alerts.findIndex((a) => a.id === alertId);

    if (alertIndex === -1) {
      throw new NotFoundException('Alert not found');
    }

    if (updateData.threshold !== undefined) {
      alerts[alertIndex].threshold = updateData.threshold;
    }
    if (updateData.enabled !== undefined) {
      alerts[alertIndex].enabled = updateData.enabled;
    }

    alertsStore.set(accountId, alerts);

    return {
      success: true,
      data: alerts[alertIndex],
      message: 'Alert updated successfully',
    };
  }

  // 3.10 Delete Account Alert
  async deleteAccountAlert(alertId: string, accountId: string, userId: string) {
    const account = await this.accountRepository.findOne({ where: { id: accountId, userId } });
    
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const alerts = alertsStore.get(accountId) || [];
    const filteredAlerts = alerts.filter((a) => a.id !== alertId);

    if (filteredAlerts.length === alerts.length) {
      throw new NotFoundException('Alert not found');
    }

    alertsStore.set(accountId, filteredAlerts);

    return {
      success: true,
      message: 'Alert deleted successfully',
    };
  }

  // 3.11 Get Account Beneficiaries
  async getAccountBeneficiaries(accountId: string, userId: string) {
    const account = await this.accountRepository.findOne({ where: { id: accountId, userId } });
    
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const beneficiaries = beneficiariesStore.get(accountId) || [];

    return {
      success: true,
      data: beneficiaries,
    };
  }

  // 3.12 Add Account Beneficiary
  async addAccountBeneficiary(accountId: string, userId: string, beneficiaryData: { name: string; email: string; relationship: string }) {
    const account = await this.accountRepository.findOne({ where: { id: accountId, userId } });
    
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (!beneficiaryData.name || !beneficiaryData.email) {
      throw new BadRequestException('Name and email are required');
    }

    const beneficiaries = beneficiariesStore.get(accountId) || [];
    
    // Check for duplicate email
    if (beneficiaries.some((b) => b.email === beneficiaryData.email)) {
      throw new BadRequestException('Beneficiary with this email already exists');
    }

    const newBeneficiary: Beneficiary = {
      id: `ben-${Date.now()}`,
      accountId,
      name: beneficiaryData.name,
      email: beneficiaryData.email,
      relationship: beneficiaryData.relationship || 'Other',
      createdAt: new Date(),
    };

    beneficiaries.push(newBeneficiary);
    beneficiariesStore.set(accountId, beneficiaries);

    return {
      success: true,
      data: newBeneficiary,
      message: 'Beneficiary added successfully',
    };
  }
}
