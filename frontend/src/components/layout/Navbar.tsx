import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  } | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">BankKit</span>
            </Link>
          </div>

          {user && (
            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold">
                    {user.first_name[0]}{user.last_name[0]}
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
