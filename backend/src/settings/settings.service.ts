import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Account } from '../entities/account.entity';
import { Transaction } from '../entities/transaction.entity';
import { UpdateNotificationsDto } from './dto/update-notifications.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { SubmitTicketDto } from './dto/submit-ticket.dto';

export interface NotificationSettings {
  security: { email: boolean; push: boolean };
  transactions: { email: boolean; push: boolean };
  reminders: { email: boolean; push: boolean };
  features: { email: boolean; push: boolean };
}

export interface AppPreferences {
  theme: string;
  language: string;
  currency: string;
}

@Injectable()
export class SettingsService {
  private readonly DEFAULT_NOTIFICATIONS: NotificationSettings = {
    security: { email: true, push: true },
    transactions: { email: false, push: true },
    reminders: { email: true, push: true },
    features: { email: true, push: false },
  };

  private readonly DEFAULT_PREFERENCES: AppPreferences = {
    theme: 'light',
    language: 'en-US',
    currency: 'USD',
  };

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  /**
   * Get notification preferences for user
   */
  async getNotifications(userId: string): Promise<NotificationSettings> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.notificationSettings || this.DEFAULT_NOTIFICATIONS;
  }

  /**
   * Update notification preferences for user
   */
  async updateNotifications(
    userId: string,
    updateNotificationsDto: UpdateNotificationsDto,
  ): Promise<NotificationSettings> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Deep merge: start with existing or defaults
    const current = user.notificationSettings || { ...this.DEFAULT_NOTIFICATIONS };

    // Merge updated values
    const updated: NotificationSettings = {
      security: { ...current.security, ...updateNotificationsDto.security },
      transactions: { ...current.transactions, ...updateNotificationsDto.transactions },
      reminders: { ...current.reminders, ...updateNotificationsDto.reminders },
      features: { ...current.features, ...updateNotificationsDto.features },
    };

    user.notificationSettings = updated;
    await this.userRepository.save(user);

    return updated;
  }

  /**
   * Get app preferences for user
   */
  async getPreferences(userId: string): Promise<AppPreferences> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.appPreferences || this.DEFAULT_PREFERENCES;
  }

  /**
   * Update app preferences for user
   */
  async updatePreferences(
    userId: string,
    updatePreferencesDto: UpdatePreferencesDto,
  ): Promise<AppPreferences> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Merge with existing preferences
    const current = user.appPreferences || { ...this.DEFAULT_PREFERENCES };
    const updated: AppPreferences = {
      theme: updatePreferencesDto.theme !== undefined ? updatePreferencesDto.theme : current.theme,
      language:
        updatePreferencesDto.language !== undefined ? updatePreferencesDto.language : current.language,
      currency:
        updatePreferencesDto.currency !== undefined ? updatePreferencesDto.currency : current.currency,
    };

    user.appPreferences = updated;
    await this.userRepository.save(user);

    return updated;
  }

  /**
   * Export user data (profile, accounts, transactions)
   */
  async exportData(userId: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const accounts = await this.accountRepository.find({ where: { userId } });
    const transactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .innerJoin('transaction.account', 'account')
      .where('account.userId = :userId', { userId })
      .getMany();

    const { passwordHash, ...userSafe } = user;

    return {
      user: userSafe,
      accounts,
      transactions,
      exportDate: new Date().toISOString(),
    };
  }

  /**
   * Toggle account freeze status
   */
  async freezeAccount(userId: string): Promise<{ success: boolean; status: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.status === 'inactive') {
      throw new BadRequestException('Cannot freeze an inactive account');
    }

    // Toggle between active and suspended
    user.status = user.status === 'active' ? 'suspended' : 'active';
    await this.userRepository.save(user);

    return {
      success: true,
      status: user.status,
    };
  }

  /**
   * Close account (soft delete)
   */
  async closeAccount(userId: string): Promise<{ success: boolean; message: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.status === 'inactive') {
      throw new BadRequestException('Account is already closed');
    }

    // Soft delete: mark as inactive
    user.status = 'inactive';
    await this.userRepository.save(user);

    return {
      success: true,
      message: 'Account closed successfully. Your data will be retained for 30 days.',
    };
  }

  /**
   * Get referral code for user
   */
  async getReferralCode(userId: string): Promise<{ code: string; link: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate deterministic referral code based on userId
    // Format: First 3 chars of name + last 8 chars of userId
    const namePrefix = (user.firstName || 'user').substring(0, 3).toUpperCase();
    const userSuffix = userId.substring(userId.length - 8).toUpperCase();
    const code = `${namePrefix}${userSuffix}`;
    const link = `https://bankkit.app/join?ref=${code}`;

    return {
      code,
      link,
    };
  }

  /**
   * Submit support ticket
   */
  async submitTicket(userId: string, submitTicketDto: SubmitTicketDto): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate ticket ID
    const ticketId = `TKT-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    // In production, this would be saved to a database
    // For now, just log it
    console.log('Support Ticket Created:', {
      ticketId,
      userId,
      userName: `${user.firstName} ${user.lastName}`,
      userEmail: user.email,
      subject: submitTicketDto.subject,
      description: submitTicketDto.description,
      category: submitTicketDto.category || 'general',
      createdAt: new Date().toISOString(),
    });

    return {
      success: true,
      ticketId,
      message: 'Support ticket submitted successfully. We will respond within 24 hours.',
      createdAt: new Date().toISOString(),
    };
  }
}
