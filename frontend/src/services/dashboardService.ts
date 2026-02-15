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

  // === NEW FEATURES 2.4-2.8 ===

  /**
   * 2.4 Get Spending Insights
   */
  async getSpendingInsights(month?: number, year?: number): Promise<{
    success: boolean;
    data: {
      totalSpending: number;
      transactionCount: number;
      byCategory: Array<{ category: string; amount: number; percentage: number }>;
      monthOverMonthChange: number;
      period: { month: number; year: number; monthName: string };
    };
  }> {
    const params = new URLSearchParams();
    if (month !== undefined) params.append('month', month.toString());
    if (year !== undefined) params.append('year', year.toString());
    const response = await api.get(`/dashboard/spending-insights?${params}`);
    return response.data;
  },

  /**
   * 2.5 Get Budget Goals
   */
  async getBudgetGoals(): Promise<{
    success: boolean;
    data: {
      budgets: Array<{
        category: string;
        limit: number;
        color: string;
        spent: number;
        remaining: number;
        percentage: number;
        status: 'on-track' | 'warning' | 'exceeded';
      }>;
      summary: {
        totalBudget: number;
        totalSpent: number;
        totalRemaining: number;
        overallPercentage: number;
      };
    };
  }> {
    const response = await api.get('/dashboard/budget-goals');
    return response.data;
  },

  /**
   * 2.6 Get Upcoming Bills
   */
  async getUpcomingBills(): Promise<{
    success: boolean;
    data: {
      recurring: Array<{
        merchant: string;
        amount: number;
        averageAmount: number;
        lastPaid: string;
        frequency: string;
      }>;
      summary: { count: number; estimatedMonthly: number };
    };
  }> {
    const response = await api.get('/dashboard/upcoming-bills');
    return response.data;
  },

  /**
   * 2.7 Get Financial Tips
   */
  async getFinancialTips(): Promise<{
    success: boolean;
    data: {
      tips: Array<{
        id: string;
        title: string;
        description: string;
        category: string;
        priority: 'high' | 'medium' | 'low';
        actionUrl?: string;
      }>;
      summary: { totalTips: number; actionableTips: number };
    };
  }> {
    const response = await api.get('/dashboard/financial-tips');
    return response.data;
  },

  /**
   * 2.8 Get Account Statements
   */
  async getAccountStatements(accountId?: string): Promise<{
    success: boolean;
    data: {
      statements: Array<{
        id: string;
        accountId: string;
        accountType: string;
        accountNumber: string;
        period: { year: number; month: number; monthName: string };
        startingBalance: number;
        endingBalance: number;
        credits: number;
        debits: number;
        transactionCount: number;
      }>;
      summary: { count: number };
    };
  }> {
    const params = accountId ? `?account_id=${accountId}` : '';
    const response = await api.get(`/dashboard/statements${params}`);
    return response.data;
  },
};
