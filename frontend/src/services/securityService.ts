import api from './api';

export interface SecuritySession {
  id: string;
  device: string;
  deviceType: string;
  browser: string;
  os: string;
  location: string;
  ipAddress: string;
  isActive: boolean;
  isCurrent: boolean;
  lastActiveAt: string;
  createdAt: string;
}

export interface SecurityEvent {
  id: string;
  event: string;
  description: string;
  date: string;
  status: 'success' | 'warning' | 'danger';
  ipAddress?: string;
}

export interface SecurityFeature {
  icon: string;
  title: string;
  description: string;
  status: string;
}

export interface SecurityChecklist {
  label: string;
  done: boolean;
}

export interface SecurityOverview {
  features: SecurityFeature[];
  securityScore: number;
  recentActivity: SecurityEvent[];
  checklist: SecurityChecklist[];
}

export interface PrivacySettings {
  dataSharing: boolean;
  locationAccess: boolean;
  marketingEmails: boolean;
  publicProfile: boolean;
}

export interface SecurityResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export const securityService = {
  /**
   * Get security overview (features, checklist, recent activity)
   */
  async getOverview(): Promise<SecurityOverview> {
    const response = await api.get<SecurityResponse<SecurityOverview>>('/security/overview');
    return response.data.data;
  },

  /**
   * Get full security activity log
   */
  async getActivityLog(limit = 20): Promise<SecurityEvent[]> {
    const response = await api.get<SecurityResponse<SecurityEvent[]>>('/security/activity', {
      params: { limit },
    });
    return response.data.data || [];
  },

  /**
   * Get all active sessions
   */
  async getSessions(): Promise<SecuritySession[]> {
    const response = await api.get<SecurityResponse<SecuritySession[]>>('/security/sessions');
    return response.data.data || [];
  },

  /**
   * Revoke a specific session
   */
  async revokeSession(sessionId: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete<{ success: boolean; message: string }>(
      `/security/sessions/${sessionId}`,
    );
    return response.data;
  },

  /**
   * Revoke all other sessions
   */
  async revokeAllSessions(): Promise<{ success: boolean; message: string }> {
    const response = await api.delete<{ success: boolean; message: string }>('/security/sessions');
    return response.data;
  },

  /**
   * Get privacy settings
   */
  async getPrivacySettings(): Promise<PrivacySettings> {
    const response = await api.get<SecurityResponse<PrivacySettings>>('/security/privacy');
    return response.data.data || {
      dataSharing: false,
      locationAccess: true,
      marketingEmails: true,
      publicProfile: false,
    };
  },

  /**
   * Update privacy settings
   */
  async updatePrivacySettings(data: Partial<PrivacySettings>): Promise<PrivacySettings> {
    const response = await api.patch<SecurityResponse<PrivacySettings>>('/security/privacy', data);
    return response.data.data;
  },

  /**
   * Toggle 2FA on/off
   */
  async toggle2FA(): Promise<{ enabled: boolean }> {
    const response = await api.post<SecurityResponse<{ enabled: boolean }>>(
      '/security/2fa/toggle',
      {},
    );
    return response.data.data;
  },

  /**
   * Helper: Get icon class for event type
   */
  getEventIcon(event: string): string {
    const icons: Record<string, string> = {
      login: 'Lock',
      password_change: 'Key',
      card_frozen: 'ShieldAlert',
      card_cancelled: 'X',
      account_frozen: 'Freeze',
      '2fa_enabled': 'Shield',
      '2fa_disabled': 'ShieldOff',
    };
    return icons[event] || 'Info';
  },

  /**
   * Helper: Get status color for display
   */
  getEventStatusColor(status: string): string {
    const colors: Record<string, string> = {
      success: 'text-green-600',
      warning: 'text-orange-600',
      danger: 'text-red-600',
    };
    return colors[status] || 'text-gray-600';
  },

  /**
   * Helper: Format session device for display
   */
  formatSessionDevice(session: SecuritySession): string {
    return `${session.browser} on ${session.os}`;
  },

  /**
   * Helper: Format last active time
   */
  formatLastActive(date: string): string {
    const now = new Date();
    const eventDate = new Date(date);
    const diffMs = now.getTime() - eventDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    // Return formatted date
    return eventDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  /**
   * Helper: Get device type badge
   */
  getDeviceTypeBadge(deviceType: string): string {
    const badges: Record<string, string> = {
      mobile: '📱',
      tablet: '📱',
      desktop: '🖥️',
    };
    return badges[deviceType] || '💻';
  },

  /**
   * Helper: Privacy setting label
   */
  getPrivacySettingLabel(key: string): string {
    const labels: Record<string, string> = {
      dataSharing: 'Data Sharing',
      locationAccess: 'Location Access',
      marketingEmails: 'Marketing Emails',
      publicProfile: 'Public Profile',
    };
    return labels[key] || key;
  },

  /**
   * Helper: Privacy setting description
   */
  getPrivacySettingDescription(key: string): string {
    const descriptions: Record<string, string> = {
      dataSharing: 'Allow BankKit to share anonymized data with partners for better offers.',
      locationAccess: 'Use your location to prevent fraudulent transactions from unexpected places.',
      marketingEmails: 'Receive updates about new features, security tips, and premium offers.',
      publicProfile: 'Allow other BankKit users to find you by your username for quick transfers.',
    };
    return descriptions[key] || '';
  },

  /**
   * Helper: Calculate security score color
   */
  getSecurityScoreColor(score: number): string {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  },

  /**
   * Helper: Get security score label
   */
  getSecurityScoreLabel(score: number): string {
    if (score >= 75) return 'Strong';
    if (score >= 50) return 'Fair';
    return 'Needs Improvement';
  },
};
