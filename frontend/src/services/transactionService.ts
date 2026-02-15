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
};
