import api from './api';

export const transactionService = {
  async getTransactions(params?: { page?: number; limit?: number; account_id?: string }) {
    const response = await api.get('/transactions', { params });
    return response.data;
  },

  async getTransactionById(id: string) {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },

  async createTransfer(data: {
    from_account_id: string;
    to_account_id: string;
    amount: number;
    description?: string;
  }) {
    const response = await api.post('/transactions/transfer', data);
    return response.data;
  },
};
