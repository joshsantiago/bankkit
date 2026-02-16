import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { Account } from '../entities/account.entity';
import { Card } from '../entities/card.entity';
import { UserSession } from '../entities/user-session.entity';
import { SecurityLog } from '../entities/security-log.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    @InjectRepository(UserSession)
    private sessionRepository: Repository<UserSession>,
    @InjectRepository(SecurityLog)
    private securityLogRepository: Repository<SecurityLog>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existing = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existing) {
      throw new BadRequestException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    const user = this.userRepository.create({
      email: registerDto.email,
      passwordHash,
      firstName: registerDto.first_name,
      lastName: registerDto.last_name,
      phone: registerDto.phone,
      dateOfBirth: registerDto.dateOfBirth ? new Date(registerDto.dateOfBirth) : undefined,
    });

    await this.userRepository.save(user);

    // Create initial accounts based on accountType selection
    if (registerDto.accountType) {
      const accountTypes = registerDto.accountType === 'both'
        ? ['checking', 'savings']
        : [registerDto.accountType];

      for (const type of accountTypes) {
        const accountNumber = this.generateAccountNumber();
        const account = this.accountRepository.create({
          userId: user.id,
          accountNumber,
          accountType: type,
          balance: 0,
          currency: 'USD',
          status: 'active',
        });
        await this.accountRepository.save(account);

        // Auto-create a debit card for checking accounts
        if (type === 'checking') {
          const cardNumber = this.generateVirtualCardNumber();
          const card = this.cardRepository.create({
            userId: user.id,
            accountId: account.id,
            name: 'BankKit Debit Card',
            cardNumber,
            expiry: this.generateExpiryDate(),
            cvv: this.generateCVV(),
            brand: 'Visa',
            cardType: 'Debit',
            isVirtual: false,
            status: 'Active',
            dailyLimit: 5000,
            monthlyLimit: 20000,
            currentSpending: 0,
          });
          await this.cardRepository.save(card);
        }
      }
    }

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          first_name: user.firstName,
          last_name: user.lastName,
          role: user.role,
        },
      },
      message: 'User registered successfully',
    };
  }

  private generateAccountNumber(): string {
    // Generate a 12-digit account number
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  }

  private generateVirtualCardNumber(): string {
    // Generate a 16-digit Visa card number (4242424242424242 format)
    const prefix = '4242'; // Visa prefix
    const randomDigits = Math.floor(Math.random() * 100000000000000)
      .toString()
      .padStart(12, '0');
    return prefix + randomDigits;
  }

  private generateExpiryDate(): string {
    // Generate expiry date 4 years from now
    const now = new Date();
    const year = (now.getFullYear() + 4) % 100; // Last 2 digits of year
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${month}/${year}`;
  }

  private generateCVV(): string {
    // Generate a random 3-digit CVV
    return String(Math.floor(100 + Math.random() * 900));
  }

  async login(loginDto: LoginDto, ipAddress?: string, userAgent?: string) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.status !== 'active') {
      throw new UnauthorizedException('Account is not active');
    }

    const isValid = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Create session and log security event
    await this.createSession(user.id, ipAddress, userAgent);
    await this.logSecurityEvent(user.id, 'login', 'success', 'Successful login', ipAddress);

    return {
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          first_name: user.firstName,
          last_name: user.lastName,
          role: user.role,
        },
      },
      message: 'Login successful',
    };
  }

  async getMe(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        role: user.role,
        status: user.status,
        created_at: user.createdAt,
      },
    };
  }

  /**
   * Create a session for user (called on login)
   */
  private async createSession(
    userId: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<void> {
    // Mark other sessions as not current
    await this.sessionRepository.update({ userId }, { isCurrent: false });

    // Parse user agent
    const deviceInfo = this.parseUserAgent(userAgent);

    const session = this.sessionRepository.create({
      userId,
      deviceName: deviceInfo.deviceName,
      deviceType: deviceInfo.deviceType,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      ipAddress,
      location: 'San Francisco, CA', // Dummy location
      isActive: true,
      isCurrent: true,
    });

    await this.sessionRepository.save(session);
  }

  /**
   * Log a security event
   */
  private async logSecurityEvent(
    userId: string,
    event: string,
    status: 'success' | 'warning' | 'danger' = 'success',
    description?: string,
    ipAddress?: string,
  ): Promise<void> {
    const log = this.securityLogRepository.create({
      userId,
      event,
      status,
      description,
      ipAddress,
    });

    await this.securityLogRepository.save(log);
  }

  /**
   * Parse user agent string to extract device info
   */
  private parseUserAgent(userAgent?: string): any {
    if (!userAgent) {
      return {
        deviceName: 'Unknown Device',
        deviceType: 'desktop',
        browser: 'Unknown',
        os: 'Unknown',
      };
    }

    // Simple parsing - in production use a library like ua-parser-js
    let browser = 'Unknown';
    let os = 'Unknown';
    let deviceType = 'desktop';

    if (userAgent.includes('Chrome')) {
      browser = 'Chrome';
    } else if (userAgent.includes('Safari')) {
      browser = 'Safari';
    } else if (userAgent.includes('Firefox')) {
      browser = 'Firefox';
    } else if (userAgent.includes('Edge')) {
      browser = 'Edge';
    }

    if (userAgent.includes('Windows')) {
      os = 'Windows';
    } else if (userAgent.includes('Mac')) {
      os = 'macOS';
    } else if (userAgent.includes('Linux')) {
      os = 'Linux';
    } else if (userAgent.includes('iPhone')) {
      os = 'iOS';
      deviceType = 'mobile';
    } else if (userAgent.includes('iPad')) {
      os = 'iOS';
      deviceType = 'tablet';
    } else if (userAgent.includes('Android')) {
      os = 'Android';
      deviceType = 'mobile';
    }

    const deviceName = `${browser} on ${os}`;

    return {
      deviceName,
      deviceType,
      browser,
      os,
    };
  }
}
