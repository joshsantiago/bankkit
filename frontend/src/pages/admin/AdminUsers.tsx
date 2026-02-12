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

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getUsers();
      setUsers(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load users');
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
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        <Card>
          <CardHeader>
            <CardTitle>All Users ({users.length})</CardTitle>
          </CardHeader>
          <CardBody>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Role</TableHeader>
                  <TableHeader>Accounts</TableHeader>
                  <TableHeader>Total Balance</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Joined</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>{user.account_count}</TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(user.total_balance)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
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
