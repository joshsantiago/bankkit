import api from './api';

export interface Transaction {
  id: string;
  fromAccountId?: string;
  toAccountId?: string;
  amount: number;
  transactionType: 'transfer' | 'deposit' | 'withdrawal';
  status: 'completed' | 'pending' | 'failed' | 'cancelled';
  description?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateTransferData {
  from_account_id: string;
  to_account_id: string;
  amount: number;
  description?: string;
}

export interface TransactionResponse<T = Transaction> {
  success: boolean;
  data: T;
  message?: string;
}

export const transactionService = {
  /**
   * Get all transactions for the authenticated user
   * Optionally filter by account ID
   */
  async getTransactions(accountId?: string): Promise<Transaction[]> {
    const response = await api.get<TransactionResponse<Transaction[]>>('/transactions', {
      params: accountId ? { account_id: accountId } : {},
    });
    return response.data.data;
  },

  /**
   * Get a specific transaction by ID
   */
  async getTransaction(id: string): Promise<Transaction> {
    const response = await api.get<TransactionResponse>(`/transactions/${id}`);
    return response.data.data;
  },

  /**
   * Create a transfer between two accounts
   */
  async createTransfer(data: CreateTransferData): Promise<TransactionResponse> {
    const response = await api.post<TransactionResponse>('/transactions/transfer', data);
    return response.data;
  },

  /**
   * Get transaction statistics for a date range
   */
  async getTransactionStats(startDate?: string, endDate?: string): Promise<{
    totalCount: number;
    totalAmount: number;
    averageAmount: number;
    depositCount: number;
    withdrawalCount: number;
  }> {
    const transactions = await this.getTransactions();

    let filtered = transactions;
    if (startDate) {
      filtered = filtered.filter(tx => new Date(tx.createdAt) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter(tx => new Date(tx.createdAt) <= new Date(endDate));
    }

    const totalCount = filtered.length;
    const totalAmount = filtered.reduce((sum, tx) => sum + tx.amount, 0);
    const averageAmount = totalCount > 0 ? totalAmount / totalCount : 0;
    const depositCount = filtered.filter(tx => tx.transactionType === 'deposit').length;
    const withdrawalCount = filtered.filter(tx => tx.transactionType === 'withdrawal').length;

    return {
      totalCount,
      totalAmount,
      averageAmount,
      depositCount,
      withdrawalCount,
    };
  },

  /**
   * Filter transactions by type
   */
  filterByType(transactions: Transaction[], type: 'transfer' | 'deposit' | 'withdrawal'): Transaction[] {
    return transactions.filter(tx => tx.transactionType === type);
  },

  /**
   * Filter transactions by status
   */
  filterByStatus(
    transactions: Transaction[],
    status: 'completed' | 'pending' | 'failed' | 'cancelled',
  ): Transaction[] {
    return transactions.filter(tx => tx.status === status);
  },

  /**
   * Sort transactions by date (newest first)
   */
  sortByDate(transactions: Transaction[], descending = true): Transaction[] {
    return [...transactions].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return descending ? dateB - dateA : dateA - dateB;
    });
  },

  /**
   * Get transaction analytics and summary statistics
   */
  async getAnalytics(startDate?: string, endDate?: string): Promise<{
    summary: {
      totalCount: number;
      totalAmount: number;
      averageAmount: number;
    };
    byType: {
      transfers: number;
      deposits: number;
      withdrawals: number;
    };
    amountByType: {
      transfers: number;
      deposits: number;
      withdrawals: number;
    };
    byStatus: {
      completed: number;
      pending: number;
      failed: number;
    };
    dateRange: {
      startDate: string | null;
      endDate: string | null;
    };
  }> {
    const response = await api.get<{
      success: boolean;
      data: any;
    }>('/transactions/analytics/summary', {
      params: { start_date: startDate, end_date: endDate },
    });
    return response.data.data;
  },

  // === NEW FEATURES 4.5-4.10 ===

  /**
   * 4.5 Get Recurring Transactions
   */
  async getRecurringTransactions(): Promise<{
    success: boolean;
    data: Array<{
      id: string;
      fromAccountId: string;
      toAccountId: string;
      amount: number;
      frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
      nextExecutionDate: string;
      description: string;
      category: string;
      active: boolean;
      createdAt: string;
    }>;
  }> {
    const response = await api.get('/transactions/recurring');
    return response.data;
  },

  /**
   * 4.6 Set Up Recurring Transfer
   */
  async createRecurringTransfer(data: {
    from_account_id: string;
    to_account_id: string;
    amount: number;
    frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
    description: string;
    category: string;
  }): Promise<{ success: boolean; data: any; message: string }> {
    const response = await api.post('/transactions/recurring', data);
    return response.data;
  },

  /**
   * 4.7 Cancel Recurring Transfer
   */
  async cancelRecurringTransfer(id: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete(`/transactions/recurring/${id}`);
    return response.data;
  },

  /**
   * 4.8 Get Transaction Categories
   */
  async getCategories(): Promise<{
    success: boolean;
    data: Array<{
      id: string;
      name: string;
      icon: string;
      color: string;
      isCustom: boolean;
    }>;
  }> {
    const response = await api.get('/transactions/categories');
    return response.data;
  },

  /**
   * 4.9 Create Custom Category
   */
  async createCategory(data: { name: string; icon: string; color: string }): Promise<{
    success: boolean;
    data: { id: string; name: string; icon: string; color: string; isCustom: boolean };
    message: string;
  }> {
    const response = await api.post('/transactions/categories', data);
    return response.data;
  },

  /**
   * 4.10 Export Transactions to CSV
   */
  async exportTransactionsCSV(options?: {
    startDate?: string;
    endDate?: string;
    accountId?: string;
  }): Promise<{ csv: string; filename: string; count: number }> {
    const params = new URLSearchParams();
    if (options?.startDate) params.append('start_date', options.startDate);
    if (options?.endDate) params.append('end_date', options.endDate);
    if (options?.accountId) params.append('account_id', options.accountId);
    
    const response = await api.get(`/transactions/export/csv?${params}`, {
      responseType: 'text',
    });
    return {
      csv: response.data,
      filename: `transactions_${new Date().toISOString().split('T')[0]}.csv`,
      count: response.data.split('\n').length - 1,
    };
  },
};
