import type React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Card, CardBody, Button, Loader, Alert, Modal } from '../components/ui';
import { accountService } from '../services/accountService';
import { formatCurrency } from '../utils/formatters';

export const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [accountType, setAccountType] = useState<'checking' | 'savings'>('checking');

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const response = await accountService.getAccounts();
      setAccounts(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    try {
      setCreating(true);
      await accountService.createAccount(accountType);
      setShowNewModal(false);
      loadAccounts();
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to create account');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Loader size="lg" />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
          <Button onClick={() => setShowNewModal(true)}>+ New Account</Button>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        {accounts.length === 0 ? (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-500 mb-4">You don't have any accounts yet</p>
              <Button onClick={() => setShowNewModal(true)}>Create Your First Account</Button>
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map((account) => (
              <Link key={account.id} to={`/accounts/${account.id}`}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardBody>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 capitalize">
                          {account.account_type} Account
                        </h3>
                        <p className="text-xs text-gray-500 font-mono mt-1">
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

                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Balance</p>
                      <p className="text-3xl font-bold text-gray-900">
                        {formatCurrency(account.balance)}
                      </p>
                    </div>

                    <div className="text-sm text-gray-500">
                      <p>Currency: {account.currency}</p>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* New Account Modal */}
        <Modal
          isOpen={showNewModal}
          onClose={() => setShowNewModal(false)}
          title="Create New Account"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setAccountType('checking')}
                  className={`p-4 border-2 rounded-lg text-center ${
                    accountType === 'checking'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="text-2xl mb-2">💳</p>
                  <p className="font-medium">Checking</p>
                  <p className="text-xs text-gray-500">For daily transactions</p>
                </button>
                <button
                  onClick={() => setAccountType('savings')}
                  className={`p-4 border-2 rounded-lg text-center ${
                    accountType === 'savings'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="text-2xl mb-2">💰</p>
                  <p className="font-medium">Savings</p>
                  <p className="text-xs text-gray-500">For saving money</p>
                </button>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="secondary" onClick={() => setShowNewModal(false)} fullWidth>
                Cancel
              </Button>
              <Button onClick={handleCreateAccount} disabled={creating} fullWidth>
                {creating ? 'Creating...' : 'Create Account'}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </MainLayout>
  );
};
