import api from './api';

export interface Account {
  id: string;
  accountType: 'checking' | 'savings';
  accountNumber: string;
  balance: number;
  currency: string;
  status: string;
  apy?: string;
}

export interface Transaction {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  date: string;
  status: string;
  type: 'credit' | 'debit';
}

export interface ProfileCompletionTask {
  id: string;
  title: string;
  description: string;
  points: number;
}

export interface ProfileCompletion {
  percentage: number;
  completedTasks: string[];
  pendingTasks: ProfileCompletionTask[];
  totalSteps: number;
  completedCount: number;
}

export interface QuickStats {
  totalBalance: number;
  accountCount: number;
  checkingBalance: number;
  savingsBalance: number;
  recentActivity: {
    lastTransactionDate: string | null;
    transactionCount7Days: number;
  };
}

export interface DashboardData {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  accounts: Account[];
  totalBalance: number;
  recentTransactions: Transaction[];
  weeklySpending: Array<{ day: string; amount: number }>;
  profileCompletion: {
    percentage: number;
    completedTasks: string[];
    pendingTasks: ProfileCompletionTask[];
  };
}

export const dashboardService = {
  /**
   * Get complete dashboard data including accounts, balance, and recent activity
   */
  async getDashboard(): Promise<{ success: boolean; data: DashboardData }> {
    const response = await api.get('/dashboard');
    return response.data;
  },

  /**
   * Get profile completion status and tasks
   */
  async getProfileCompletion(): Promise<{ success: boolean; data: ProfileCompletion }> {
    const response = await api.get('/dashboard/profile-completion');
    return response.data;
  },

  /**
   * Get quick account and transaction statistics
   */
  async getQuickStats(): Promise<{ success: boolean; data: QuickStats }> {
    const response = await api.get('/dashboard/quick-stats');
    return response.data;
  },

  /**
   * Helper: Calculate profile completion percentage for display
   */
  getCompletionPercentageColor(percentage: number): string {
    if (percentage < 33) return 'text-red-600';
    if (percentage < 66) return 'text-yellow-600';
    return 'text-green-600';
  },

  /**
   * Helper: Get profile completion status text
   */
  getCompletionStatus(percentage: number): string {
    if (percentage === 100) return 'Complete';
    if (percentage >= 75) return 'Almost Done';
    if (percentage >= 50) return 'Halfway There';
    if (percentage > 0) return 'Just Started';
    return 'Not Started';
  },

  /**
   * Helper: Format balance for display
   */
  formatBalance(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  },

  /**
   * Helper: Calculate balance change percentage
   */
  calculateBalanceChange(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  },
};
