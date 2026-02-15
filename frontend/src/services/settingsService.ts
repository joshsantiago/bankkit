import api from './api';

export interface NotificationPreferences {
  security: { email: boolean; push: boolean };
  transactions: { email: boolean; push: boolean };
  reminders: { email: boolean; push: boolean };
  features: { email: boolean; push: boolean };
}

export interface AppPreferences {
  theme: 'light' | 'dark';
  language: string;
  currency: string;
}

export interface ExportedData {
  user: any;
  accounts: any[];
  transactions: any[];
  exportDate: string;
}

export interface ReferralCode {
  code: string;
  link: string;
}

export interface SupportTicket {
  success: boolean;
  ticketId: string;
  message: string;
  createdAt: string;
}

export interface SettingsResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export const settingsService = {
  /**
   * Get user's notification preferences
   */
  async getNotifications(): Promise<NotificationPreferences> {
    const response = await api.get<SettingsResponse<NotificationPreferences>>('/settings/notifications');
    return response.data.data || {
      security: { email: true, push: true },
      transactions: { email: false, push: true },
      reminders: { email: true, push: true },
      features: { email: true, push: false },
    };
  },

  /**
   * Update notification preferences
   */
  async updateNotifications(data: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
    const response = await api.patch<SettingsResponse<NotificationPreferences>>(
      '/settings/notifications',
      data,
    );
    return response.data.data;
  },

  /**
   * Get user's app preferences (theme, language, currency)
   */
  async getPreferences(): Promise<AppPreferences> {
    const response = await api.get<SettingsResponse<AppPreferences>>('/settings/preferences');
    return response.data.data || {
      theme: 'light',
      language: 'en-US',
      currency: 'USD',
    };
  },

  /**
   * Update app preferences
   */
  async updatePreferences(data: Partial<AppPreferences>): Promise<AppPreferences> {
    const response = await api.patch<SettingsResponse<AppPreferences>>('/settings/preferences', data);
    return response.data.data;
  },

  /**
   * Export user data (profile, accounts, transactions)
   */
  async exportData(): Promise<ExportedData> {
    const response = await api.post<SettingsResponse<ExportedData>>('/settings/export-data', {});
    return response.data.data;
  },

  /**
   * Download exported data as JSON file
   */
  async downloadExportedData(): Promise<void> {
    const data = await this.exportData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bankkit-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  /**
   * Toggle account freeze status
   */
  async freezeAccount(): Promise<{ status: string }> {
    const response = await api.patch<SettingsResponse<{ status: string }>>(
      '/settings/freeze-account',
      {},
    );
    return response.data.data;
  },

  /**
   * Close account (soft delete)
   */
  async closeAccount(): Promise<{ message: string }> {
    const response = await api.delete<SettingsResponse>('/settings/account');
    return { message: response.data.message || 'Account closed successfully' };
  },

  /**
   * Get referral code and link
   */
  async getReferralCode(): Promise<ReferralCode> {
    const response = await api.get<SettingsResponse<ReferralCode>>('/settings/referral');
    return response.data.data;
  },

  /**
   * Copy referral link to clipboard
   */
  async copyReferralLink(): Promise<boolean> {
    try {
      const referral = await this.getReferralCode();
      await navigator.clipboard.writeText(referral.link);
      return true;
    } catch (error) {
      console.error('Failed to copy referral link:', error);
      return false;
    }
  },

  /**
   * Submit support ticket
   */
  async submitSupportTicket(data: {
    subject: string;
    description: string;
    category?: string;
  }): Promise<SupportTicket> {
    const response = await api.post<SettingsResponse<SupportTicket>>('/settings/support/ticket', data);
    return response.data.data;
  },

  /**
   * Helper: Check if notification is enabled
   */
  isNotificationEnabled(
    preferences: NotificationPreferences,
    category: keyof NotificationPreferences,
    channel: 'email' | 'push',
  ): boolean {
    const cat = preferences[category];
    if (!cat) return false;
    return cat[channel] || false;
  },

  /**
   * Helper: Get theme name for display
   */
  getThemeLabel(theme: string): string {
    const labels: Record<string, string> = {
      light: 'Light Mode',
      dark: 'Dark Mode',
    };
    return labels[theme] || theme;
  },

  /**
   * Helper: Get language name for display
   */
  getLanguageLabel(language: string): string {
    const labels: Record<string, string> = {
      'en-US': 'English (US)',
      'es-ES': 'Español',
      'fr-FR': 'Français',
      'de-DE': 'Deutsch',
      'it-IT': 'Italiano',
      'pt-BR': 'Português (Brasil)',
    };
    return labels[language] || language;
  },

  /**
   * Helper: Get currency symbol
   */
  getCurrencySymbol(currency: string): string {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      INR: '₹',
      CAD: 'C$',
      AUD: 'A$',
    };
    return symbols[currency] || currency;
  },

  /**
   * Helper: Format account status
   */
  formatAccountStatus(status: 'active' | 'suspended' | 'inactive'): string {
    const labels: Record<string, string> = {
      active: 'Active',
      suspended: 'Frozen',
      inactive: 'Closed',
    };
    return labels[status] || status;
  },

  /**
   * Helper: Get account status color for UI
   */
  getStatusColor(status: 'active' | 'suspended' | 'inactive'): string {
    const colors: Record<string, string> = {
      active: 'text-green-600',
      suspended: 'text-blue-600',
      inactive: 'text-red-600',
    };
    return colors[status] || 'text-gray-600';
  },
};
