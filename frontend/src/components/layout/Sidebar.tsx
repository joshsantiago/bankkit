import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isAdmin: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isAdmin }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const linkClass = (path: string) => `
    flex items-center px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded-lg
    ${isActive(path) ? 'bg-primary-50 text-primary-600 font-medium' : ''}
  `;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-1">
        <Link to="/dashboard" className={linkClass('/dashboard')}>
          <span className="mr-3">📊</span>
          Dashboard
        </Link>

        <Link to="/accounts" className={linkClass('/accounts')}>
          <span className="mr-3">💳</span>
          Accounts
        </Link>

        <Link to="/transactions" className={linkClass('/transactions')}>
          <span className="mr-3">💸</span>
          Transactions
        </Link>

        <Link to="/transfer" className={linkClass('/transfer')}>
          <span className="mr-3">🔄</span>
          Transfer Money
        </Link>

        {isAdmin && (
          <>
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Admin
              </p>
            </div>

            <Link to="/admin" className={linkClass('/admin')}>
              <span className="mr-3">⚙️</span>
              Admin Dashboard
            </Link>

            <Link to="/admin/users" className={linkClass('/admin/users')}>
              <span className="mr-3">👥</span>
              User Management
            </Link>

            <Link to="/admin/accounts" className={linkClass('/admin/accounts')}>
              <span className="mr-3">🏦</span>
              All Accounts
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
};
