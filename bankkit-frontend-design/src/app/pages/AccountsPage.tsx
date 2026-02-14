import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Plus, 
  Wallet, 
  ShieldCheck, 
  TrendingUp, 
  ChevronRight, 
  Copy, 
  Eye, 
  EyeOff, 
  FileText, 
  Settings, 
  ExternalLink,
  Info,
  CheckCircle2,
  Lock,
  ArrowRight,
  MoreVertical,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';

// --- Mock Data ---

const INTERNAL_ACCOUNTS = [
  { 
    id: 'acc-1', 
    name: 'Main Checking', 
    type: 'Checking', 
    number: '424288129901', 
    routing: '123456789', 
    balance: 2840.50, 
    status: 'Active',
    apy: '0.01%',
    color: 'bg-[#DCFCE7] text-[#064E3B]',
    icon: Wallet
  },
  { 
    id: 'acc-2', 
    name: 'High-Yield Savings', 
    type: 'Savings', 
    number: '987654321098', 
    routing: '123456789', 
    balance: 14200.00, 
    status: 'Active',
    apy: '4.50%',
    color: 'bg-[#064E3B] text-white',
    icon: ShieldCheck
  }
];

const EXTERNAL_ACCOUNTS = [
  { 
    id: 'ext-1', 
    name: 'Chase Checking', 
    bank: 'JPMorgan Chase', 
    last4: '1122', 
    balance: 1250.20,
    icon: ExternalLink
  },
  { 
    id: 'ext-2', 
    name: 'Marcus Savings', 
    bank: 'Goldman Sachs', 
    last4: '8877', 
    balance: 5400.00,
    icon: ExternalLink
  }
];

export function AccountsPage({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('internal');
  const [selectedAccount, setSelectedAccount] = useState(INTERNAL_ACCOUNTS[0]);
  const [showNumbers, setShowNumbers] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

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
                <h1 className="text-3xl font-black text-[#064E3B]">Accounts</h1>
                <p className="text-sm font-bold text-gray-400">Manage your money across all accounts</p>
              </div>
            </div>
            
            <button className="bg-[#064E3B] text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-xl shadow-[#064E3B]/10">
              <Plus size={20} />
              Open New Account
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar / List */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm w-full">
              <button
                onClick={() => setActiveTab('internal')}
                className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${
                  activeTab === 'internal' 
                    ? 'bg-[#064E3B] text-white' 
                    : 'text-gray-400 hover:text-[#064E3B]'
                }`}
              >
                BankKit
              </button>
              <button
                onClick={() => setActiveTab('external')}
                className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${
                  activeTab === 'external' 
                    ? 'bg-[#064E3B] text-white' 
                    : 'text-gray-400 hover:text-[#064E3B]'
                }`}
              >
                External
              </button>
            </div>

            <div className="space-y-4">
              {activeTab === 'internal' ? (
                INTERNAL_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => setSelectedAccount(acc)}
                    className={`w-full text-left p-6 rounded-[2rem] border transition-all ${
                      selectedAccount.id === acc.id 
                        ? 'bg-white border-emerald-500 shadow-lg shadow-emerald-500/5 ring-2 ring-emerald-500/10' 
                        : 'bg-white border-gray-100 hover:border-emerald-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-2xl ${acc.color}`}>
                        <acc.icon size={20} />
                      </div>
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                        acc.type === 'Savings' ? 'bg-[#DCFCE7] text-[#064E3B]' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {acc.type}
                      </span>
                    </div>
                    <p className="font-black text-[#064E3B] text-lg mb-1">{acc.name}</p>
                    <p className="text-3xl font-black text-[#064E3B]">${acc.balance.toLocaleString()}</p>
                  </button>
                ))
              ) : (
                <div className="space-y-4">
                  {EXTERNAL_ACCOUNTS.map((acc) => (
                    <div key={acc.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center justify-between group hover:border-emerald-200 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                          <ExternalLink size={20} />
                        </div>
                        <div>
                          <p className="font-black text-[#064E3B]">{acc.name}</p>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{acc.bank} ••{acc.last4}</p>
                        </div>
                      </div>
                      <p className="font-black text-[#064E3B]">${acc.balance.toLocaleString()}</p>
                    </div>
                  ))}
                  <button className="w-full p-6 rounded-[2rem] border-2 border-dashed border-gray-200 flex items-center justify-center gap-2 text-gray-400 font-bold hover:border-emerald-300 hover:text-emerald-600 transition-all group">
                    <Plus size={20} className="group-hover:scale-110 transition-transform" />
                    Link External Bank
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Account Detail View */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedAccount.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className={`p-10 ${selectedAccount.type === 'Savings' ? 'bg-[#064E3B] text-white' : 'bg-[#DCFCE7] text-[#064E3B]'}`}>
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <selectedAccount.icon size={24} className={selectedAccount.type === 'Savings' ? 'text-emerald-400' : 'text-[#064E3B]'} />
                        <h2 className="text-2xl font-black">{selectedAccount.name}</h2>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          selectedAccount.type === 'Savings' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/40 text-[#064E3B]'
                        }`}>
                          {selectedAccount.status}
                        </span>
                        {selectedAccount.apy && (
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            selectedAccount.type === 'Savings' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/40 text-[#064E3B]'
                          }`}>
                            {selectedAccount.apy} APY
                          </span>
                        )}
                      </div>
                    </div>
                    <button className={`p-4 rounded-2xl ${selectedAccount.type === 'Savings' ? 'bg-white/10 hover:bg-white/20' : 'bg-white/40 hover:bg-white/60'} transition-colors`}>
                      <Settings size={24} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className={`text-xs font-black uppercase tracking-widest ${selectedAccount.type === 'Savings' ? 'text-emerald-400/60' : 'text-[#064E3B]/40'}`}>
                      Available Balance
                    </p>
                    <h3 className="text-6xl font-black tracking-tight">${selectedAccount.balance.toLocaleString()}</h3>
                  </div>
                </div>

                <div className="p-10 space-y-10">
                  {/* Account Numbers Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center px-1">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Routing Number</p>
                        <button 
                          onClick={() => handleCopy(selectedAccount.routing)}
                          className="text-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                      <div className="p-6 bg-gray-50 rounded-2xl font-mono font-bold text-[#064E3B] tracking-[0.2em]">
                        {selectedAccount.routing}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center px-1">
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Account Number</p>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setShowNumbers(!showNumbers)}
                            className="text-gray-400 hover:text-[#064E3B] transition-colors"
                          >
                            {showNumbers ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                          <button 
                            onClick={() => handleCopy(selectedAccount.number)}
                            className="text-emerald-600 hover:text-emerald-700 transition-colors"
                          >
                            <Copy size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="p-6 bg-gray-50 rounded-2xl font-mono font-bold text-[#064E3B] tracking-[0.2em]">
                        {showNumbers ? selectedAccount.number : '•••• •••• ' + selectedAccount.number.slice(-4)}
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { icon: ArrowUpRight, label: 'Transfer', color: 'bg-emerald-50 text-emerald-600' },
                      { icon: FileText, label: 'Statements', color: 'bg-blue-50 text-blue-600' },
                      { icon: TrendingUp, label: 'Statistics', color: 'bg-orange-50 text-orange-600' },
                      { icon: MoreVertical, label: 'More', color: 'bg-gray-50 text-gray-600' },
                    ].map((action) => (
                      <button 
                        key={action.label}
                        className="flex flex-col items-center gap-3 p-6 rounded-3xl border border-transparent hover:border-gray-100 hover:shadow-sm transition-all group"
                      >
                        <div className={`p-4 rounded-2xl ${action.color} group-hover:scale-110 transition-transform`}>
                          <action.icon size={24} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-gray-500">{action.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Insights Section */}
                  <div className="bg-gray-50 rounded-[2.5rem] p-8 space-y-6">
                    <div className="flex items-center gap-3 text-[#064E3B]">
                      <Info size={24} />
                      <h4 className="text-lg font-black">Account Insights</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-2xl border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Monthly Yield</p>
                        <p className="text-xl font-black text-emerald-600">+$54.20 <span className="text-xs font-bold text-gray-400 uppercase">earned</span></p>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Transfer Limit</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-end">
                            <p className="text-sm font-bold text-[#064E3B]">$12,400 / $50,000</p>
                            <p className="text-[10px] font-black text-gray-400">25% Used</p>
                          </div>
                          <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-1/4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Features */}
                  <div className="border-t border-gray-100 pt-10">
                    <h4 className="text-lg font-black text-[#064E3B] mb-6">Security & Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-6 bg-white rounded-3xl border border-gray-100 hover:border-emerald-200 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                            <ShieldCheck size={24} />
                          </div>
                          <div>
                            <p className="font-black text-[#064E3B]">Account Protection</p>
                            <p className="text-xs font-bold text-gray-400">Real-time fraud monitoring is active</p>
                          </div>
                        </div>
                        <CheckCircle2 className="text-emerald-500" size={20} />
                      </div>
                      <div className="flex items-center justify-between p-6 bg-white rounded-3xl border border-gray-100 hover:border-emerald-200 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center">
                            <Lock size={24} />
                          </div>
                          <div>
                            <p className="font-black text-[#064E3B]">Freeze Account</p>
                            <p className="text-xs font-bold text-gray-400">Instantly block all outgoing transfers</p>
                          </div>
                        </div>
                        <ArrowRight className="text-gray-300 group-hover:text-emerald-500 transition-transform group-hover:translate-x-1" size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Copy Notification */}
      <AnimatePresence>
        {isCopying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#064E3B] text-white px-8 py-4 rounded-full font-black text-sm shadow-2xl flex items-center gap-3 z-[100]"
          >
            <CheckCircle2 className="text-emerald-400" size={18} />
            Copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
