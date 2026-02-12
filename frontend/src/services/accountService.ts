import api from './api';

export const accountService = {
  async getAccounts() {
    const response = await api.get('/accounts');
    return response.data;
  },

  async getAccountById(id: string) {
    const response = await api.get(`/accounts/${id}`);
    return response.data;
  },

  async createAccount(accountType: 'checking' | 'savings') {
    const response = await api.post('/accounts', { account_type: accountType });
    return response.data;
  },

  async updateAccountStatus(id: string, status: string) {
    const response = await api.patch(`/accounts/${id}/status`, { status });
    return response.data;
  },
};
