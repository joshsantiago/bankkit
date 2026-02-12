import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardBody, Loader, Alert } from '../../components/ui';
import { adminService } from '../../services/adminService';
import { formatCurrency } from '../../utils/formatters';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await adminService.getStats();
      setStats(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Loader size="lg" />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Alert type="error" message={error} />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardBody>
              <p className="text-sm text-gray-500 mb-1">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.users.total}</p>
              <div className="mt-2 text-xs text-gray-500">
                <p>Active: {stats.users.by_status.active || 0}</p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <p className="text-sm text-gray-500 mb-1">Total Accounts</p>
              <p className="text-3xl font-bold text-gray-900">{stats.accounts.total}</p>
              <div className="mt-2 text-xs text-gray-500">
                <p>Checking: {stats.accounts.by_type.checking || 0}</p>
                <p>Savings: {stats.accounts.by_type.savings || 0}</p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <p className="text-sm text-gray-500 mb-1">Total Balance</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(stats.accounts.total_balance)}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <p className="text-sm text-gray-500 mb-1">Total Transactions</p>
              <p className="text-3xl font-bold text-gray-900">{stats.transactions.total}</p>
              <div className="mt-2 text-xs text-gray-500">
                <p>Volume: {formatCurrency(stats.transactions.total_volume)}</p>
              </div>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Users by Status</h3>
                <div className="space-y-2">
                  {Object.entries(stats.users.by_status).map(([status, count]: [string, any]) => (
                    <div key={status} className="flex items-center justify-between">
                      <span className="capitalize text-gray-600">{status}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Accounts by Type</h3>
                <div className="space-y-2">
                  {Object.entries(stats.accounts.by_type).map(
                    ([type, count]: [string, any]) => (
                      <div key={type} className="flex items-center justify-between">
                        <span className="capitalize text-gray-600">{type}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </MainLayout>
  );
};
