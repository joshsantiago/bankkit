import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  Loader,
  Alert,
} from '../../components/ui';
import { adminService } from '../../services/adminService';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const AdminAccounts: React.FC = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAccounts();
      setAccounts(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load accounts');
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

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Account Management</h1>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        <Card>
          <CardHeader>
            <CardTitle>All Accounts ({accounts.length})</CardTitle>
          </CardHeader>
          <CardBody>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Account Number</TableHeader>
                  <TableHeader>Owner</TableHeader>
                  <TableHeader>Type</TableHeader>
                  <TableHeader>Balance</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Created</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-mono text-sm">
                      {account.account_number || account.accountNumber}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {account.first_name} {account.last_name}
                        </p>
                        <p className="text-xs text-gray-500">{account.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize">
                        {account.account_type || account.accountType}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(account.balance)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          account.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {account.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {formatDate(account.created_at || account.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </MainLayout>
  );
};
