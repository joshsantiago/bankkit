import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserSession } from '../entities/user-session.entity';
import { SecurityLog } from '../entities/security-log.entity';
import { UpdatePrivacyDto } from './dto/update-privacy.dto';

export interface PrivacySettings {
  dataSharing: boolean;
  locationAccess: boolean;
  marketingEmails: boolean;
  publicProfile: boolean;
}

interface SecurityChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  points: number;
}

@Injectable()
export class SecurityService {
  private readonly DEFAULT_PRIVACY_SETTINGS: PrivacySettings = {
    dataSharing: false,
    locationAccess: true,
    marketingEmails: true,
    publicProfile: false,
  };

  private readonly SECURITY_FEATURES = [
    {
      icon: 'Fingerprint',
      title: 'Biometric Login',
      description: 'Use FaceID or TouchID to access your account instantly and securely.',
      status: 'Enabled',
    },
    {
      icon: 'Key',
      title: 'Two-Factor Auth',
      description: 'Verify every sign-in with a secondary code sent to your trusted device.',
      status: 'Enabled',
    },
    {
      icon: 'ShieldAlert',
      title: 'Fraud Monitoring',
      description: 'AI-powered detection watches for suspicious activity 24/7.',
      status: 'Active',
    },
    {
      icon: 'Globe',
      title: 'Encryption',
      description: 'Your data is protected with military-grade 256-bit AES encryption.',
      status: 'Active',
    },
  ];

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserSession)
    private sessionRepository: Repository<UserSession>,
    @InjectRepository(SecurityLog)
    private securityLogRepository: Repository<SecurityLog>,
  ) {}

  /**
   * Get security overview with features, checklist, and recent activity
   */
  async getOverview(userId: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Get recent activity
    const recentActivity = await this.securityLogRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: 5,
    });

    // Build checklist
    const checklist = this.buildSecurityChecklist(user);
    const completedItems = checklist.filter(item => item.completed).length;
    const securityScore = Math.round((completedItems / checklist.length) * 100);

    return {
      success: true,
      data: {
        features: this.SECURITY_FEATURES,
        securityScore,
        recentActivity: recentActivity.map(log => ({
          id: log.id,
          event: log.event,
          description: log.description,
          date: log.createdAt,
          status: log.status,
        })),
        checklist: checklist.map(item => ({
          label: item.title,
          done: item.completed,
        })),
      },
    };
  }

  /**
   * Get full security activity log
   */
  async getActivityLog(userId: string, limit = 20): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const logs = await this.securityLogRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
    });

    return {
      success: true,
      data: logs.map(log => ({
        id: log.id,
        event: log.event,
        description: log.description,
        date: log.createdAt,
        status: log.status,
        ipAddress: log.ipAddress,
      })),
    };
  }

  /**
   * Get all active sessions for user
   */
  async getSessions(userId: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const sessions = await this.sessionRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    return {
      success: true,
      data: sessions.map(session => ({
        id: session.id,
        device: session.deviceName,
        deviceType: session.deviceType,
        browser: session.browser,
        os: session.os,
        location: session.location,
        ipAddress: session.ipAddress,
        isActive: session.isActive,
        isCurrent: session.isCurrent,
        lastActiveAt: session.lastActiveAt,
        createdAt: session.createdAt,
      })),
    };
  }

  /**
   * Revoke a specific session
   */
  async revokeSession(userId: string, sessionId: string): Promise<any> {
    const session = await this.sessionRepository.findOne({ where: { id: sessionId } });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.userId !== userId) {
      throw new ForbiddenException('Cannot revoke other user sessions');
    }

    session.isActive = false;
    await this.sessionRepository.save(session);

    return {
      success: true,
      message: 'Session logged out successfully',
    };
  }

  /**
   * Revoke all sessions except current
   */
  async revokeAllSessions(userId: string, currentSessionId?: string): Promise<any> {
    const sessions = await this.sessionRepository.find({
      where: { userId },
    });

    for (const session of sessions) {
      if (session.id !== currentSessionId) {
        session.isActive = false;
        await this.sessionRepository.save(session);
      }
    }

    return {
      success: true,
      message: 'All other sessions logged out successfully',
    };
  }

  /**
   * Get privacy settings
   */
  async getPrivacySettings(userId: string): Promise<PrivacySettings> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.privacySettings || this.DEFAULT_PRIVACY_SETTINGS;
  }

  /**
   * Update privacy settings
   */
  async updatePrivacySettings(userId: string, updatePrivacyDto: UpdatePrivacyDto): Promise<PrivacySettings> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const current = user.privacySettings || { ...this.DEFAULT_PRIVACY_SETTINGS };

    const updated: PrivacySettings = {
      dataSharing: updatePrivacyDto.dataSharing !== undefined ? updatePrivacyDto.dataSharing : current.dataSharing,
      locationAccess:
        updatePrivacyDto.locationAccess !== undefined ? updatePrivacyDto.locationAccess : current.locationAccess,
      marketingEmails:
        updatePrivacyDto.marketingEmails !== undefined ? updatePrivacyDto.marketingEmails : current.marketingEmails,
      publicProfile: updatePrivacyDto.publicProfile !== undefined ? updatePrivacyDto.publicProfile : current.publicProfile,
    };

    user.privacySettings = updated;
    await this.userRepository.save(user);

    return updated;
  }

  /**
   * Toggle 2FA status
   */
  async toggle2FA(userId: string): Promise<{ enabled: boolean }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.twoFactorEnabled = !user.twoFactorEnabled;
    await this.userRepository.save(user);

    // Log the security event
    await this.logSecurityEvent(userId, user.twoFactorEnabled ? '2fa_enabled' : '2fa_disabled', 'success');

    return {
      enabled: user.twoFactorEnabled,
    };
  }

  /**
   * Log a security event
   */
  async logSecurityEvent(
    userId: string,
    event: string,
    status: 'success' | 'warning' | 'danger' = 'success',
    description?: string,
    ipAddress?: string,
  ): Promise<SecurityLog> {
    const log = this.securityLogRepository.create({
      userId,
      event,
      status,
      description,
      ipAddress,
    });

    return this.securityLogRepository.save(log);
  }

  /**
   * Create a session for user (called on login)
   */
  async createSession(
    userId: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<UserSession> {
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

    return this.sessionRepository.save(session);
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

  /**
   * Build security checklist based on user profile
   */
  private buildSecurityChecklist(user: User): SecurityChecklistItem[] {
    return [
      {
        id: 'verified-phone',
        title: 'Verified Phone Number',
        completed: !!user.phone,
        points: 25,
      },
      {
        id: '2fa-enabled',
        title: 'Set Up 2FA Verification',
        completed: user.twoFactorEnabled,
        points: 25,
      },
      {
        id: 'emergency-contact',
        title: 'Emergency Contact Added',
        completed: false, // Would need separate entity
        points: 25,
      },
      {
        id: 'privacy-reviewed',
        title: 'Privacy Policy Reviewed',
        completed: !!user.privacySettings, // If they've accessed privacy settings
        points: 25,
      },
    ];
  }
}
