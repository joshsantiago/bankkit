import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardBody, Input, Button, Alert, AlertDescription, Loader } from '../components/ui';
import { accountService } from '../services/accountService';
import { transactionService } from '../services/transactionService';
import { formatCurrency } from '../utils/formatters';

export const Transfer = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    from_account_id: '',
    to_account_id: '',
    amount: '',
    description: '',
  });

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const response = await accountService.getAccounts();
      setAccounts(response.data.filter((acc: any) => acc.status === 'active'));
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.from_account_id || !formData.to_account_id) {
      setError('Please select both accounts');
      return;
    }

    if (formData.from_account_id === formData.to_account_id) {
      setError('Cannot transfer to the same account');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      setSubmitting(true);
      await transactionService.createTransfer({
        from_account_id: formData.from_account_id,
        to_account_id: formData.to_account_id,
        amount,
        description: formData.description,
      });
      setSuccess('Transfer completed successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Transfer failed');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedFromAccount = accounts.find((acc) => acc.id === formData.from_account_id);

  if (loading) {
    return (
      <MainLayout>
        <Loader size="lg" />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Transfer Money</h1>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {accounts.length < 2 ? (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-500 mb-4">
                You need at least 2 active accounts to make a transfer
              </p>
              <Button onClick={() => navigate('/accounts')}>Go to Accounts</Button>
            </CardBody>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Transfer Details</CardTitle>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Account
                  </label>
                  <select
                    value={formData.from_account_id}
                    onChange={(e) =>
                      setFormData({ ...formData, from_account_id: e.target.value })
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select account</option>
                    {accounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.account_type.toUpperCase()} - {account.account_number} (
                        {formatCurrency(account.balance)})
                      </option>
                    ))}
                  </select>
                  {selectedFromAccount && (
                    <p className="mt-1 text-sm text-gray-500">
                      Available balance: {formatCurrency(selectedFromAccount.balance)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To Account
                  </label>
                  <select
                    value={formData.to_account_id}
                    onChange={(e) => setFormData({ ...formData, to_account_id: e.target.value })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  >
                    <option value="">Select account</option>
                    {accounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.account_type.toUpperCase()} - {account.account_number} (
                        {formatCurrency(account.balance)})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    min="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="What's this transfer for?"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate('/dashboard')}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting} className="flex-1">
                    {submitting ? 'Processing...' : 'Transfer'}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};
