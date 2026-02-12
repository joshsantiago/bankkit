import api from './api';

export const adminService = {
  async getStats() {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  async getUsers() {
    const response = await api.get('/admin/users');
    return response.data;
  },

  async getAccounts() {
    const response = await api.get('/admin/accounts');
    return response.data;
  },
};
