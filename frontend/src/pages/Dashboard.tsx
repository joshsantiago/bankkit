import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardBody, Loader, Alert } from '../components/ui';
import { dashboardService } from '../services/dashboardService';
import { formatCurrency, formatDateTime } from '../utils/formatters';

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getDashboard();
      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load dashboard');
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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="space-x-3">
            <Link
              to="/accounts/new"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              + New Account
            </Link>
            <Link
              to="/transfer"
              className="inline-flex items-center px-4 py-2 bg-success-500 text-white rounded-lg hover:bg-success-600"
            >
              Transfer Money
            </Link>
          </div>
        </div>

        {/* Total Balance Card */}
        <Card className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <CardBody>
            <p className="text-primary-100 text-sm font-medium mb-2">Total Balance</p>
            <p className="text-4xl font-bold">{formatCurrency(data.total_balance)}</p>
            <div className="mt-4 flex items-center space-x-6 text-sm">
              <div>
                <span className="text-primary-100">Accounts: </span>
                <span className="font-semibold">{data.account_summary.total}</span>
              </div>
              <div>
                <span className="text-primary-100">Active: </span>
                <span className="font-semibold">{data.account_summary.active}</span>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Accounts Grid */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.accounts.map((account: any) => (
              <Link key={account.id} to={`/accounts/${account.id}`}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardBody>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm text-gray-500">
                          {account.account_type === 'checking' ? '💳 Checking' : '💰 Savings'}
                        </p>
                        <p className="text-xs text-gray-400 font-mono mt-1">
                          {account.account_number}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          account.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {account.status}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(account.balance)}
                    </p>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Link
                to="/transactions"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                View All →
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            {data.recent_transactions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No transactions yet</p>
            ) : (
              <div className="space-y-3">
                {data.recent_transactions.map((transaction: any) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.transaction_type === 'transfer'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-green-100 text-green-600'
                        }`}
                      >
                        {transaction.transaction_type === 'transfer' ? '🔄' : '💵'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {transaction.description || 'Transaction'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatDateTime(transaction.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{transaction.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </MainLayout>
  );
};
