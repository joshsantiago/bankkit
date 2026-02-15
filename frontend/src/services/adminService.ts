import api from './api';

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  phone?: string;
  avatarUrl?: string;
  twoFactorEnabled?: boolean;
  account_count: number;
  total_balance: number;
  createdAt: string;
}

export interface AdminAccount {
  id: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  status: string;
  currency: string;
  userId: string;
  email: string;
  first_name: string;
  last_name: string;
  createdAt: string;
}

export interface AdminStats {
  users: {
    total: number;
    by_status: Record<string, number>;
  };
  accounts: {
    total: number;
    total_balance: number;
    by_type: Record<string, number>;
  };
  transactions: {
    total: number;
    total_volume: number;
  };
}

export interface AdminTransaction {
  id: string;
  fromAccountId?: string;
  fromAccountNumber?: string;
  fromUserEmail?: string;
  toAccountId?: string;
  toAccountNumber?: string;
  toUserEmail?: string;
  amount: number;
  transactionType: string;
  status: string;
  description?: string;
  createdAt: string;
}

export interface AdminResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export const adminService = {
  /**
   * Get system-wide dashboard statistics
   */
  async getStats(): Promise<AdminStats> {
    const response = await api.get<AdminResponse<AdminStats>>('/admin/stats');
    return response.data.data;
  },

  /**
   * Get list of all users
   */
  async getUsers(): Promise<AdminUser[]> {
    const response = await api.get<AdminResponse<AdminUser[]>>('/admin/users');
    return response.data.data || [];
  },

  /**
   * Get list of all accounts
   */
  async getAccounts(): Promise<AdminAccount[]> {
    const response = await api.get<AdminResponse<AdminAccount[]>>('/admin/accounts');
    return response.data.data || [];
  },

  /**
   * Get a single user by ID
   */
  async getUserById(id: string): Promise<AdminUser> {
    const response = await api.get<AdminResponse<AdminUser>>(`/admin/users/${id}`);
    return response.data.data;
  },

  /**
   * Update user status
   */
  async updateUserStatus(id: string, status: string): Promise<{ id: string; status: string }> {
    const response = await api.patch<AdminResponse<{ id: string; status: string }>>(
      `/admin/users/${id}/status`,
      { status }
    );
    return response.data.data;
  },

  /**
   * Update user role
   */
  async updateUserRole(id: string, role: string): Promise<{ id: string; role: string }> {
    const response = await api.patch<AdminResponse<{ id: string; role: string }>>(
      `/admin/users/${id}/role`,
      { role }
    );
    return response.data.data;
  },

  /**
   * Update account status
   */
  async updateAccountStatus(id: string, status: string): Promise<{ id: string; status: string }> {
    const response = await api.patch<AdminResponse<{ id: string; status: string }>>(
      `/admin/accounts/${id}/status`,
      { status }
    );
    return response.data.data;
  },

  /**
   * Get all transactions system-wide
   */
  async getAllTransactions(limit = 50): Promise<AdminTransaction[]> {
    const response = await api.get<AdminResponse<AdminTransaction[]>>('/admin/transactions', {
      params: { limit },
    });
    return response.data.data || [];
  },

  /**
   * Helper: Get role color for display
   */
  getRoleColor(role: string): string {
    const colors: Record<string, string> = {
      admin: 'text-red-600 bg-red-50',
      user: 'text-blue-600 bg-blue-50',
    };
    return colors[role] || 'text-gray-600 bg-gray-50';
  },

  /**
   * Helper: Get status color for display
   */
  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      active: 'text-green-600 bg-green-50',
      suspended: 'text-red-600 bg-red-50',
      inactive: 'text-gray-600 bg-gray-50',
      frozen: 'text-orange-600 bg-orange-50',
      closed: 'text-red-600 bg-red-50',
    };
    return colors[status] || 'text-gray-600 bg-gray-50';
  },

  /**
   * Helper: Get transaction status color
   */
  getTransactionStatusColor(status: string): string {
    const colors: Record<string, string> = {
      completed: 'text-green-600',
      pending: 'text-yellow-600',
      failed: 'text-red-600',
    };
    return colors[status] || 'text-gray-600';
  },

  /**
   * Helper: Format currency
   */
  formatBalance(balance: number): string {
    return `$${(balance / 100).toFixed(2)}`;
  },

  /**
   * Helper: Format date
   */
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  /**
   * Helper: Get user display name
   */
  getUserDisplayName(user: AdminUser): string {
    return `${user.firstName} ${user.lastName}`;
  },

  /**
   * Helper: Get account display name
   */
  getAccountDisplayName(account: AdminAccount): string {
    return `${account.accountType} (${account.accountNumber.slice(-4)})`;
  },

  /**
   * Helper: Check if user can be demoted
   */
  canDemoteUser(user: AdminUser, allUsers: AdminUser[]): boolean {
    if (user.role !== 'admin') return true;
    const adminCount = allUsers.filter(u => u.role === 'admin').length;
    return adminCount > 1;
  },
};
