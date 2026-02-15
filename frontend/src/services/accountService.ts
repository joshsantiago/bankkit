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

  // === NEW FEATURES 3.5, 3.7-3.12 ===

  /**
   * 3.5 Get Account Statement
   */
  async getAccountStatement(accountId: string, month?: number, year?: number) {
    const params = new URLSearchParams();
    if (month !== undefined) params.append('month', month.toString());
    if (year !== undefined) params.append('year', year.toString());
    const response = await api.get(`/accounts/${accountId}/statement?${params}`);
    return response.data;
  },

  /**
   * 3.7 Set Account Alert
   */
  async setAccountAlert(accountId: string, alertData: { type: string; threshold: number }) {
    const response = await api.post(`/accounts/${accountId}/alerts`, alertData);
    return response.data;
  },

  /**
   * 3.8 Get Account Alerts
   */
  async getAccountAlerts(accountId: string) {
    const response = await api.get(`/accounts/${accountId}/alerts`);
    return response.data;
  },

  /**
   * 3.9 Update Account Alert
   */
  async updateAccountAlert(accountId: string, alertId: string, updateData: { threshold?: number; enabled?: boolean }) {
    const response = await api.patch(`/accounts/${accountId}/alerts/${alertId}`, updateData);
    return response.data;
  },

  /**
   * 3.10 Delete Account Alert
   */
  async deleteAccountAlert(accountId: string, alertId: string) {
    const response = await api.delete(`/accounts/${accountId}/alerts/${alertId}`);
    return response.data;
  },

  /**
   * 3.11 Get Account Beneficiaries
   */
  async getAccountBeneficiaries(accountId: string) {
    const response = await api.get(`/accounts/${accountId}/beneficiaries`);
    return response.data;
  },

  /**
   * 3.12 Add Account Beneficiary
   */
  async addAccountBeneficiary(accountId: string, beneficiaryData: { name: string; email: string; relationship: string }) {
    const response = await api.post(`/accounts/${accountId}/beneficiaries`, beneficiaryData);
    return response.data;
  },
};
