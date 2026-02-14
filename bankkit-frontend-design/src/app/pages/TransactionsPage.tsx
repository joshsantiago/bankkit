import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ChevronRight, 
  X,
  Calendar,
  Wallet,
  ShoppingBag,
  Coffee,
  Smartphone,
  Music,
  Car,
  Utensils,
  CreditCard,
  Receipt,
  AlertCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

// --- Mock Data ---

const ALL_TRANSACTIONS = [
  { id: 1, merchant: 'Apple Store', category: 'Technology', amount: -1299.00, date: 'Feb 14, 2026', time: '14:30', status: 'Completed', type: 'debit', account: 'Checking ••2234', icon: Smartphone, color: 'bg-blue-50 text-blue-500' },
  { id: 2, merchant: 'Starbucks', category: 'Food & Drink', amount: -6.50, date: 'Feb 14, 2026', time: '09:15', status: 'Completed', type: 'debit', account: 'Checking ••2234', icon: Coffee, color: 'bg-orange-50 text-orange-500' },
  { id: 3, merchant: 'Salary Deposit', category: 'Income', amount: 4500.00, date: 'Feb 12, 2026', time: '08:00', status: 'Completed', type: 'credit', account: 'Savings ••3210', icon: Wallet, color: 'bg-emerald-50 text-emerald-500' },
  { id: 4, merchant: 'Netflix', category: 'Entertainment', amount: -15.99, date: 'Feb 10, 2026', time: '20:45', status: 'Completed', type: 'debit', account: 'Checking ••2234', icon: Music, color: 'bg-red-50 text-red-500' },
  { id: 5, merchant: 'Uber', category: 'Transport', amount: -24.50, date: 'Feb 09, 2026', time: '18:20', status: 'Completed', type: 'debit', account: 'Checking ••2234', icon: Car, color: 'bg-gray-50 text-gray-500' },
  { id: 6, merchant: 'Amazon', category: 'Shopping', amount: -89.99, date: 'Feb 08, 2026', time: '11:10', status: 'Pending', type: 'debit', account: 'Checking ••2234', icon: ShoppingBag, color: 'bg-indigo-50 text-indigo-500' },
  { id: 7, merchant: 'Sweetgreen', category: 'Food & Drink', amount: -18.40, date: 'Feb 07, 2026', time: '13:05', status: 'Completed', type: 'debit', account: 'Checking ••2234', icon: Utensils, color: 'bg-green-50 text-green-500' },
  { id: 8, merchant: 'Gym Membership', category: 'Health', amount: -45.00, date: 'Feb 01, 2026', time: '07:00', status: 'Completed', type: 'debit', account: 'Checking ••2234', icon: Smartphone, color: 'bg-pink-50 text-pink-500' },
  { id: 9, merchant: 'Airbnb', category: 'Travel', amount: -450.00, date: 'Jan 28, 2026', time: '15:30', status: 'Completed', type: 'debit', account: 'Checking ••2234', icon: Car, color: 'bg-rose-50 text-rose-500' },
  { id: 10, merchant: 'Dividend', category: 'Investment', amount: 125.50, date: 'Jan 25, 2026', time: '09:00', status: 'Completed', type: 'credit', account: 'Savings ••3210', icon: Wallet, color: 'bg-emerald-50 text-emerald-500' },
];

export function TransactionsPage({ onBack }: { onBack: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedTx, setSelectedTx] = useState<any>(null);

  const filteredTransactions = ALL_TRANSACTIONS.filter(tx => {
    const matchesSearch = tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || 
                       (filterType === 'Income' && tx.type === 'credit') || 
                       (filterType === 'Expenses' && tx.type === 'debit');
    return matchesSearch && matchesType;
  });

  const totalIncome = ALL_TRANSACTIONS.filter(tx => tx.type === 'credit').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = ALL_TRANSACTIONS.filter(tx => tx.type === 'debit').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-[#064E3B] transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-3xl font-black text-[#064E3B]">Transactions</h1>
                <p className="text-sm font-bold text-gray-400">View and manage your spending history</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-white border-2 border-gray-100 px-6 py-3 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all">
                <Calendar size={18} />
                Last 30 Days
                <ChevronDown size={16} />
              </button>
              <button className="bg-[#064E3B] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                <Download size={18} />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Total Balance</p>
            <h3 className="text-3xl font-black text-[#064E3B]">$17,040.50</h3>
            <div className="mt-4 flex items-center gap-2 text-emerald-500 font-bold text-sm">
              <ArrowDownLeft size={16} />
              +2.4% from last month
            </div>
          </div>
          <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm">
            <p className="text-xs font-black text-emerald-600/60 uppercase tracking-widest mb-2">Monthly Inflow</p>
            <h3 className="text-3xl font-black text-emerald-700">${totalIncome.toLocaleString()}</h3>
            <div className="mt-4 text-emerald-600/40 text-xs font-bold uppercase tracking-wider">Salary & Dividends</div>
          </div>
          <div className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100 shadow-sm">
            <p className="text-xs font-black text-red-600/60 uppercase tracking-widest mb-2">Monthly Outflow</p>
            <h3 className="text-3xl font-black text-red-700">${Math.abs(totalExpenses).toLocaleString()}</h3>
            <div className="mt-4 text-red-600/40 text-xs font-bold uppercase tracking-wider">Shopping & Lifestyle</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex bg-white p-1 rounded-2xl border border-gray-100 w-fit">
            {['All', 'Expenses', 'Income'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
                  filterType === type 
                    ? 'bg-[#064E3B] text-white shadow-lg shadow-emerald-900/10' 
                    : 'text-gray-400 hover:text-[#064E3B]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by merchant or category..."
              className="w-full bg-white border-2 border-gray-100 pl-14 pr-6 py-4 rounded-[1.5rem] outline-none font-bold text-[#064E3B] focus:border-emerald-500 transition-all shadow-sm"
            />
          </div>
          
          <button className="flex items-center gap-2 px-6 py-4 bg-white border-2 border-gray-100 rounded-[1.5rem] font-black text-[#064E3B] hover:bg-gray-50 transition-colors">
            <Filter size={20} />
            More Filters
          </button>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-50 text-left">
                  <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Transaction</th>
                  <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">Category</th>
                  <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest hidden lg:table-cell">Account</th>
                  <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Amount</th>
                  <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-6"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredTransactions.map((tx) => (
                  <tr 
                    key={tx.id} 
                    onClick={() => setSelectedTx(tx)}
                    className="group hover:bg-gray-50/50 transition-colors cursor-pointer"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${tx.color}`}>
                          <tx.icon size={22} />
                        </div>
                        <div>
                          <p className="font-black text-[#064E3B] group-hover:text-emerald-700">{tx.merchant}</p>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{tx.date} • {tx.time}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 hidden md:table-cell">
                      <span className="px-4 py-1.5 bg-gray-50 rounded-full text-xs font-black text-gray-500 uppercase tracking-wider">
                        {tx.category}
                      </span>
                    </td>
                    <td className="px-8 py-6 hidden lg:table-cell">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                        <Wallet size={16} />
                        {tx.account}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className={`font-black text-lg ${tx.amount < 0 ? 'text-gray-900' : 'text-emerald-500'}`}>
                        {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        tx.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <ChevronRight className="inline-block text-gray-300 group-hover:text-emerald-500 transition-colors" size={20} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredTransactions.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                <Search size={32} />
              </div>
              <h4 className="text-xl font-black text-[#064E3B]">No transactions found</h4>
              <p className="text-gray-400 font-bold">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Detail Modal */}
      <AnimatePresence>
        {selectedTx && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTx(null)}
              className="absolute inset-0 bg-[#064E3B]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <div className="p-10 space-y-8">
                <div className="flex justify-between items-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    selectedTx.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {selectedTx.status} Transaction
                  </span>
                  <button onClick={() => setSelectedTx(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={24} className="text-gray-400" />
                  </button>
                </div>

                <div className="text-center space-y-4">
                  <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 ${selectedTx.color}`}>
                    <selectedTx.icon size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-[#064E3B]">{selectedTx.merchant}</h3>
                  <p className="text-4xl font-black text-[#064E3B]">
                    {selectedTx.amount < 0 ? '-' : '+'}${Math.abs(selectedTx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-sm font-bold text-gray-400">{selectedTx.date} • {selectedTx.time}</p>
                </div>

                <div className="space-y-4 border-t border-gray-100 pt-8">
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Payment Method</p>
                    <div className="flex items-center gap-2 text-[#064E3B] font-bold">
                      <CreditCard size={16} />
                      {selectedTx.account}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Category</p>
                    <p className="text-[#064E3B] font-bold">{selectedTx.category}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Transaction ID</p>
                    <p className="text-[#064E3B] font-mono font-bold text-xs">TXN-492-0923-BKT</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button className="flex items-center justify-center gap-2 py-4 bg-gray-50 rounded-2xl font-bold text-[#064E3B] hover:bg-gray-100 transition-colors">
                    <Receipt size={18} />
                    View Receipt
                  </button>
                  <button className="flex items-center justify-center gap-2 py-4 bg-gray-50 rounded-2xl font-bold text-red-500 hover:bg-red-100/50 transition-colors">
                    <AlertCircle size={18} />
                    Dispute
                  </button>
                </div>

                <button className="w-full bg-[#064E3B] text-white py-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                  <HelpCircle size={20} />
                  Need help with this?
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
