import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  Search,
  MoreVertical,
  ChevronRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Building,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  Plus,
  Send,
  Download,
  Link as LinkIcon,
  X,
  AlertCircle,
  Fingerprint,
  UserCheck,
  FileUp,
  Camera,
  Loader2,
  MapPin,
  Building2,
  QrCode,
  Key,
  Target,
  Users
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { AuthContext } from '../context/AuthContext';

// --- Mock Data ---

const SPENDING_DATA = [
  { name: 'Mon', amount: 240 },
  { name: 'Tue', amount: 1398 },
  { name: 'Wed', amount: 9800 },
  { name: 'Thu', amount: 3908 },
  { name: 'Fri', amount: 4800 },
  { name: 'Sat', amount: 3800 },
  { name: 'Sun', amount: 4300 },
];

const TRANSACTIONS = [
  { id: 1, merchant: 'Apple Store', category: 'Technology', amount: -1299.00, date: 'Feb 14, 2026', status: 'Completed', type: 'debit' },
  { id: 2, merchant: 'Starbucks', category: 'Food & Drink', amount: -6.50, date: 'Feb 14, 2026', status: 'Completed', type: 'debit' },
  { id: 3, merchant: 'Salary Deposit', category: 'Income', amount: 4500.00, date: 'Feb 12, 2026', status: 'Completed', type: 'credit' },
  { id: 4, merchant: 'Netflix', category: 'Entertainment', amount: -15.99, date: 'Feb 10, 2026', status: 'Completed', type: 'debit' },
  { id: 5, merchant: 'Uber', category: 'Transport', amount: -24.50, date: 'Feb 09, 2026', status: 'Completed', type: 'debit' },
  { id: 6, merchant: 'Amazon', category: 'Shopping', amount: -89.99, date: 'Feb 08, 2026', status: 'Pending', type: 'debit' },
];

const ONBOARDING_TASKS = [
  { id: 'verify-id', title: 'Verify Identity', desc: 'SSN & ID upload', status: 'Completed', points: 25 },
  { id: 'confirm-address', title: 'Confirm Address', desc: 'Verify residency', status: 'Pending', points: 15 },
  { id: 'link-bank', title: 'Link External Bank', desc: 'For easy transfers', status: 'Pending', points: 30 },
  { id: 'enable-2fa', title: 'Enable 2FA', desc: 'Secure your account', status: 'Pending', points: 10 },
];

// --- Sub-Components ---

const StatCard = ({ title, balance, accNum, type, apy, onClick }: any) => (
  <div className={`p-8 rounded-[2.5rem] border ${type === 'savings' ? 'bg-[#064E3B] text-white' : 'bg-white border-gray-100 shadow-sm'}`}>
    <div className="flex justify-between items-start mb-6">
      <div>
        <p className={`text-xs font-black uppercase tracking-widest mb-1 ${type === 'savings' ? 'text-emerald-400' : 'text-[#064E3B]'}`}>
          {type === 'savings' ? 'Savings Account' : 'Checking Account'}
        </p>
        <p className={`text-sm font-bold ${type === 'savings' ? 'text-white/60' : 'text-gray-400'}`}>•••• {accNum?.slice(-4) || '4242'}</p>
      </div>
      <div className={`p-3 rounded-2xl ${type === 'savings' ? 'bg-white/10' : 'bg-[#DCFCE7] text-[#064E3B]'}`}>
        <Wallet size={24} />
      </div>
    </div>
    <div className="space-y-4">
      <h3 className="text-4xl font-black">${balance.toLocaleString()}</h3>
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${type === 'savings' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#DCFCE7] text-[#064E3B]'}`}>
          Active {apy && `• ${apy} APY`}
        </span>
        <button
          onClick={onClick}
          className={`text-xs font-bold flex items-center gap-1 ${type === 'savings' ? 'text-white/60 hover:text-white' : 'text-gray-400 hover:text-[#064E3B]'}`}
        >
          Details <ChevronRight size={14} />
        </button>
      </div>
    </div>
  </div>
);

// --- Main Page ---

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext) || { logout: () => {} };

  const [user, setUser] = useState<any>({ first_name: 'Alex' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeStep, setUpgradeStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<'metal' | 'black' | 'gold'>('metal');
  const [newStep, setNewStep] = useState(1);
  const [linkStep, setLinkStep] = useState(1);
  const [depositStep, setDepositStep] = useState(1);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositMethod, setDepositMethod] = useState<'bank' | 'check' | null>(null);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationStep, setVerificationStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [ssn, setSsn] = useState('');
  const [showSsn, setShowSsn] = useState(false);
  const [address, setAddress] = useState({ street: '', city: '', state: '', zip: '' });
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const formatSSN = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
  };

  const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatSSN(e.target.value);
    if (formatted.replace(/\D/g, '').length <= 9) {
      setSsn(formatted);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('bankkit_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const profileCompletion = Math.round((ONBOARDING_TASKS.filter(t => t.status === 'Completed').reduce((acc, t) => acc + t.points, 0) / 80) * 100);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans selection:bg-emerald-100">
      {/* Sidebar - Desktop */}
      <aside className="w-80 bg-white border-r border-gray-100 flex flex-col fixed inset-y-0 left-0 hidden lg:flex" aria-label="Main navigation">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#064E3B] rounded-xl flex items-center justify-center text-white" aria-hidden="true">
            <ShieldCheck size={24} />
          </div>
          <span className="text-2xl font-black text-[#064E3B] tracking-tight">BankKit</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2" aria-label="Sidebar navigation">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'accounts', icon: Wallet, label: 'Accounts', onClick: () => navigate('/accounts') },
            { id: 'transactions', icon: Clock, label: 'Transactions', onClick: () => navigate('/transactions') },
            { id: 'cards', icon: CreditCard, label: 'My Cards', onClick: () => navigate('/cards') },
            { id: 'settings', icon: Settings, label: 'Settings', onClick: () => navigate('/settings') },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.onClick) {
                  item.onClick();
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                activeTab === item.id
                  ? 'bg-[#DCFCE7] text-[#064E3B]'
                  : 'text-gray-400 hover:bg-gray-50 hover:text-[#064E3B]'
              }`}
              aria-label={item.label}
              aria-current={activeTab === item.id ? 'page' : undefined}
            >
              <item.icon size={20} aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-[#064E3B] rounded-[2rem] p-6 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/20 rounded-full -mr-10 -mt-10" />
            <h4 className="text-lg font-black mb-2 relative z-10">Premium Card</h4>
            <p className="text-white/60 text-xs font-medium mb-4 relative z-10">Get 5% cashback on all travel bookings.</p>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="w-full bg-white text-[#064E3B] py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform relative z-10"
            >
              Upgrade Now
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 mt-4 text-red-400 font-bold hover:bg-red-50 rounded-2xl transition-all"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-80 pb-24" role="main">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-8 py-6 flex items-center justify-between border-b border-gray-100" role="banner">
          <div>
            <h1 className="text-2xl font-black text-[#064E3B]">Welcome back, {user?.first_name}!</h1>
            <p className="text-sm font-bold text-gray-400">Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                placeholder="Search transactions..."
                className="bg-gray-50 border-none pl-12 pr-6 py-3 rounded-full text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20 w-64"
              />
            </div>
            <button className="relative p-3 bg-gray-50 rounded-full text-gray-400 hover:text-[#064E3B] transition-colors">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
              <div className="w-10 h-10 rounded-full bg-[#064E3B] flex items-center justify-center text-white font-black text-xs">
                {user?.first_name?.[0]}{user?.last_name?.[0] || 'A'}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-black text-[#064E3B]">{user?.first_name} {user?.last_name || 'Rivera'}</p>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Premium User</p>
              </div>
            </div>
          </div>
        </header>


          {/* Profile Completion Banner */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-black text-[#064E3B]">Complete your profile</h3>
                  <span className="text-emerald-600 font-black">{profileCompletion}% Complete</span>
                </div>
                <div className="h-3 bg-gray-50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${profileCompletion}%` }}
                    className="h-full bg-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ONBOARDING_TASKS.map(task => (
                    <div key={task.id} className="flex items-start gap-3">
                      <div className={`mt-1 ${task.status === 'Completed' ? 'text-emerald-500' : 'text-gray-300'}`}>
                        {task.status === 'Completed' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${task.status === 'Completed' ? 'text-gray-900' : 'text-gray-400'}`}>{task.title}</p>
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{task.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setShowVerification(true)}
                className="bg-[#064E3B] text-white px-8 py-5 rounded-2xl font-black whitespace-nowrap hover:scale-105 transition-transform flex items-center gap-2"
              >
                Verify Now <ChevronRight size={18} />
              </button>
            </div>
          </section>

          {/* Quick Actions & Stats */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              {/* Account Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard
                  title="Checking"
                  balance={2840.50}
                  accNum={user?.accountNumber || '1029384756'}
                  type="checking"
                  onClick={() => navigate('/accounts')}
                />
                <StatCard
                  title="Savings"
                  balance={14200.00}
                  accNum="9876543210"
                  type="savings"
                  apy="4.50%"
                  onClick={() => navigate('/accounts')}
                />
              </div>

              {/* Spending Chart */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-black text-[#064E3B]">Weekly Spending</h3>
                    <p className="text-sm font-bold text-gray-400">Spending patterns for the last 7 days</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-[#064E3B]"><Download size={20} /></button>
                    <button className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-[#064E3B]"><MoreVertical size={20} /></button>
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={SPENDING_DATA}>
                      <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#94A3B8' }} dy={10} />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 700 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#10b981"
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#colorAmount)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-[#064E3B]">Recent Transactions</h3>
                  <button onClick={() => navigate('/transactions')} className="text-sm font-black text-emerald-600 hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {TRANSACTIONS.map(tx => (
                    <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tx.amount < 0 ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                          {tx.amount < 0 ? <ArrowUpRight size={24} /> : <ArrowDownLeft size={24} />}
                        </div>
                        <div>
                          <p className="font-black text-[#064E3B] group-hover:text-emerald-700">{tx.merchant}</p>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{tx.category} • {tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-black text-lg ${tx.amount < 0 ? 'text-gray-900' : 'text-emerald-500'}`}>
                          {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                        <p className={`text-[10px] font-black uppercase tracking-wider ${tx.status === 'Completed' ? 'text-emerald-500' : 'text-orange-400'}`}>
                          {tx.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Widgets */}
            <div className="space-y-8">
              {/* Quick Transfer Widget */}
              <div className="bg-[#DCFCE7] p-8 rounded-[2.5rem] space-y-6">
                <h3 className="text-xl font-black text-[#064E3B]">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Send, label: 'Send', color: 'bg-emerald-500' },
                    { icon: Download, label: 'Deposit', color: 'bg-[#064E3B]' },
                    { icon: LinkIcon, label: 'Link', color: 'bg-emerald-600' },
                    { icon: Plus, label: 'New', color: 'bg-emerald-400' },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      onClick={() => {
                        if (btn.label === 'Send') setShowTransferModal(true);
                        if (btn.label === 'Deposit') setShowDepositModal(true);
                        if (btn.label === 'Link') setShowLinkModal(true);
                        if (btn.label === 'New') setShowNewModal(true);
                      }}
                      className={`${btn.color} text-white p-6 rounded-3xl flex flex-col items-center gap-3 hover:scale-105 transition-transform shadow-lg shadow-emerald-900/10`}
                    >
                      <btn.icon size={24} />
                      <span className="text-xs font-black uppercase tracking-widest">{btn.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Management */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-[#064E3B]">Debit Card</h3>
                  <button onClick={() => navigate('/cards')} className="text-emerald-600 font-bold text-sm">Manage</button>
                </div>

                {/* Virtual Card Visual */}
                <div className={`aspect-[1.58/1] rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500 ${isFrozen ? 'grayscale opacity-60' : 'bg-gradient-to-br from-[#064E3B] to-[#10b981] shadow-2xl'}`}>
                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={24} className="text-emerald-400" />
                      <span className="text-white font-black text-sm">BankKit</span>
                    </div>
                    <div className="w-10 h-7 bg-white/20 rounded-md backdrop-blur-sm" />
                  </div>

                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-3">
                      <p className="text-white font-mono text-xl tracking-[0.2em]">
                        {showCardDetails ? '4242 8812 9901 2234' : '•••• •••• •••• 2234'}
                      </p>
                      <button onClick={() => setShowCardDetails(!showCardDetails)} className="text-white/40 hover:text-white transition-colors">
                        {showCardDetails ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[8px] text-white/60 font-black uppercase tracking-widest mb-1">Card Holder</p>
                        <p className="text-sm text-white font-bold uppercase">{user?.first_name} {user?.last_name || 'Rivera'}</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-white/60 font-black uppercase tracking-widest mb-1">Expires</p>
                        <p className="text-sm text-white font-bold">12/28</p>
                      </div>
                    </div>
                  </div>
                  {isFrozen && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-20">
                      <div className="bg-white px-4 py-2 rounded-full flex items-center gap-2">
                        <ShieldCheck size={16} className="text-red-500" />
                        <span className="text-xs font-black text-red-500 uppercase tracking-widest">Frozen</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setIsFrozen(!isFrozen)}
                    className="w-full py-4 rounded-2xl border-2 border-gray-100 font-bold text-[#064E3B] hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    {isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
                  </button>
                  <button className="w-full py-4 rounded-2xl bg-gray-50 font-bold text-gray-400 hover:text-gray-600 transition-all">
                    Replace Card
                  </button>
                </div>
              </div>

              {/* Security Recommendations */}
              <div className="bg-orange-50 p-8 rounded-[2.5rem] border border-orange-100 space-y-4">
                <div className="flex items-center gap-3 text-orange-600">
                  <AlertCircle size={24} />
                  <h3 className="font-black text-lg">Security Alert</h3>
                </div>
                <p className="text-orange-700/80 text-sm font-bold">
                  Your identity verification is almost complete. Finish today to unlock higher transfer limits.
                </p>
                <button className="text-orange-600 font-black text-sm uppercase tracking-widest hover:underline">
                  Fix Now
                </button>
              </div>
            </div>
          </div>
      </main>

      {/* Transfer Modal */}
      <AnimatePresence>
        {showTransferModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTransferModal(false)}
              className="absolute inset-0 bg-[#064E3B]/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] p-10 space-y-8 overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-black text-[#064E3B]">Send Money</h3>
                <button onClick={() => setShowTransferModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} className="text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#064E3B] uppercase tracking-widest px-1">Source Account</label>
                  <div className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50 flex items-center justify-between">
                    <div>
                      <p className="font-black text-[#064E3B]">Checking Account</p>
                      <p className="text-xs font-bold text-gray-400">Balance: $2,840.50</p>
                    </div>
                    <Wallet className="text-[#064E3B]" size={20} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-[#064E3B] uppercase tracking-widest px-1">Recipient</label>
                  <input
                    placeholder="Email, Phone, or Account Number"
                    className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl outline-none font-bold focus:border-emerald-500 transition-all"
                  />
                </div>

                <div className="space-y-2 text-center py-6">
                  <label className="text-xs font-black text-[#064E3B] uppercase tracking-widest mb-4 block">Amount to Send</label>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-black text-[#064E3B]">$</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="text-6xl font-black text-[#064E3B] w-48 text-center outline-none bg-transparent placeholder:text-gray-100"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setShowTransferModal(false)}
                  className="w-full bg-[#064E3B] text-white py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-xl shadow-[#064E3B]/20"
                >
                  Confirm Transfer <ArrowRight size={24} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Link Account Modal */}
      <AnimatePresence>
        {showLinkModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowLinkModal(false);
                setLinkStep(1);
              }}
              className="absolute inset-0 bg-[#064E3B]/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <div className="p-10 space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-3xl font-black text-[#064E3B]">Link Account</h3>
                    <p className="text-sm font-bold text-gray-400">Connect external banks to BankKit</p>
                  </div>
                  <button onClick={() => {
                    setShowLinkModal(false);
                    setLinkStep(1);
                  }} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={24} className="text-gray-400" />
                  </button>
                </div>

                {linkStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                    <div className="bg-[#DCFCE7] p-6 rounded-3xl flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#064E3B]">
                        <ShieldCheck size={24} />
                      </div>
                      <p className="text-sm font-bold text-[#064E3B] leading-relaxed">
                        BankKit uses <span className="font-black">Plaid</span> to securely connect your accounts. Your login credentials are never shared with us.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          placeholder="Search for your bank..."
                          className="w-full bg-gray-50 border-none pl-12 pr-6 py-5 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { name: 'Chase', logo: '🏦' },
                          { name: 'BoA', logo: '🏛️' },
                          { name: 'Wells Fargo', logo: '🐎' },
                          { name: 'Citi', logo: '🌃' },
                          { name: 'US Bank', logo: '🛡️' },
                          { name: 'PNC', logo: '🟠' }
                        ].map((bank) => (
                          <button
                            key={bank.name}
                            onClick={() => setLinkStep(2)}
                            className="p-6 rounded-3xl border-2 border-gray-50 hover:border-emerald-500 hover:bg-emerald-50 transition-all flex flex-col items-center gap-2 group"
                          >
                            <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{bank.logo}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-[#064E3B]">{bank.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setLinkStep(2)}
                      className="w-full py-5 rounded-2xl bg-gray-50 text-gray-400 font-bold hover:text-[#064E3B] hover:bg-gray-100 transition-all text-sm uppercase tracking-widest"
                    >
                      Don't see your bank? Link manually
                    </button>
                  </motion.div>
                )}

                {linkStep === 2 && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 py-4">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-emerald-100 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                        <Building2 size={40} className="text-emerald-600" />
                      </div>
                      <h4 className="text-2xl font-black text-[#064E3B]">Authenticate with Chase</h4>
                      <p className="text-gray-500 font-bold max-w-xs mx-auto">
                        A secure window will open for you to log in to your Chase account.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <p className="text-xs font-bold text-gray-500">Establishing secure connection...</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setLinkStep(1)}
                        className="flex-1 py-5 rounded-2xl border-2 border-gray-100 text-[#064E3B] font-black hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setIsVerifying(true);
                          setTimeout(() => {
                            setIsVerifying(false);
                            setShowLinkModal(false);
                            setLinkStep(1);
                            alert('Account linked successfully! You can now initiate transfers.');
                          }, 2000);
                        }}
                        className="flex-[2] bg-[#064E3B] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-[#064E3B]/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
                      >
                        {isVerifying ? <Loader2 size={24} className="animate-spin" /> : "Continue to Login"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Deposit Modal */}
      <AnimatePresence>
        {showDepositModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDepositModal(false)}
              className="absolute inset-0 bg-[#064E3B]/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <div className="p-10 space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-3xl font-black text-[#064E3B]">Deposit Funds</h3>
                    <p className="text-sm font-bold text-gray-400">Add money to your BankKit accounts</p>
                  </div>
                  <button onClick={() => {
                    setShowDepositModal(false);
                    setDepositStep(1);
                    setDepositMethod(null);
                  }} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={24} className="text-gray-400" />
                  </button>
                </div>

                {depositStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                      <button
                        onClick={() => {
                          setDepositMethod('bank');
                          setDepositStep(2);
                        }}
                        className="p-8 rounded-[2.5rem] border-2 border-gray-50 hover:border-emerald-500 hover:bg-emerald-50 transition-all flex items-center gap-6 text-left group"
                      >
                        <div className="p-4 bg-emerald-100 rounded-2xl group-hover:bg-white transition-colors">
                          <Building2 size={32} className="text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-black text-[#064E3B] text-lg">External Bank Transfer</h4>
                          <p className="text-sm font-bold text-gray-400">Transfer from Chase, BoA, etc.</p>
                        </div>
                        <ChevronRight className="ml-auto text-gray-300 group-hover:text-emerald-500" />
                      </button>

                      <button
                        onClick={() => {
                          setDepositMethod('check');
                          setDepositStep(2);
                        }}
                        className="p-8 rounded-[2.5rem] border-2 border-gray-50 hover:border-emerald-500 hover:bg-emerald-50 transition-all flex items-center gap-6 text-left group"
                      >
                        <div className="p-4 bg-emerald-100 rounded-2xl group-hover:bg-white transition-colors">
                          <Camera size={32} className="text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-black text-[#064E3B] text-lg">Mobile Check Deposit</h4>
                          <p className="text-sm font-bold text-gray-400">Snap a photo of your check</p>
                        </div>
                        <ChevronRight className="ml-auto text-gray-300 group-hover:text-emerald-500" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {depositStep === 2 && depositMethod === 'bank' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-[#064E3B] uppercase tracking-widest px-1">From</label>
                        <div className="p-5 rounded-2xl border-2 border-emerald-500 bg-emerald-50 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Building2 size={24} className="text-emerald-600" />
                            <div>
                              <p className="font-black text-[#064E3B]">Chase Premier Plus</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Linked Account •••• 8812</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-black text-emerald-600 uppercase bg-emerald-100 px-2 py-1 rounded-md">Primary</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-[#064E3B] uppercase tracking-widest px-1">To Account</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50 text-left">
                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Checking</p>
                            <p className="font-bold text-[#064E3B]">$2,840.50</p>
                          </button>
                          <button className="p-4 rounded-2xl border-2 border-gray-100 hover:border-emerald-200 text-left bg-white">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Savings</p>
                            <p className="font-bold text-[#064E3B]">$14,200.00</p>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-center py-6">
                        <label className="text-xs font-black text-[#064E3B] uppercase tracking-widest mb-4 block">Amount to Deposit</label>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-4xl font-black text-[#064E3B]">$</span>
                          <input
                            type="number"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            placeholder="0.00"
                            className="text-6xl font-black text-[#064E3B] w-48 text-center outline-none bg-transparent placeholder:text-gray-100"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setDepositStep(1)}
                        className="flex-1 py-5 rounded-2xl border-2 border-gray-100 text-[#064E3B] font-black hover:bg-gray-50 transition-all"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => {
                          setShowDepositModal(false);
                          setDepositStep(1);
                          setDepositMethod(null);
                          alert('Transfer initiated! Funds will be available in 1-3 business days.');
                        }}
                        className="flex-[2] bg-[#064E3B] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-[#064E3B]/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
                      >
                        Initiate Transfer <ArrowRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {depositStep === 2 && depositMethod === 'check' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 text-center">
                    <p className="text-gray-500 font-bold leading-relaxed max-w-sm mx-auto">
                      Please endorse the back of your check with "For Mobile Deposit Only at BankKit" before capturing.
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                      <button className="aspect-[1.58/1] border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-emerald-500 hover:bg-emerald-50 transition-all group overflow-hidden relative">
                        <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-white transition-colors relative z-10">
                          <Camera size={32} className="text-gray-400 group-hover:text-emerald-500" />
                        </div>
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest relative z-10">Front of Check</span>
                        <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>

                      <button className="aspect-[1.58/1] border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-emerald-500 hover:bg-emerald-50 transition-all group overflow-hidden relative">
                        <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-white transition-colors relative z-10">
                          <Camera size={32} className="text-gray-400 group-hover:text-emerald-500" />
                        </div>
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest relative z-10">Back of Check</span>
                        <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setDepositStep(1)}
                        className="flex-1 py-5 rounded-2xl border-2 border-gray-100 text-[#064E3B] font-black hover:bg-gray-50 transition-all"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => {
                          setShowDepositModal(false);
                          setDepositStep(1);
                          setDepositMethod(null);
                          alert('Check submitted successfully! We are processing your deposit.');
                        }}
                        className="flex-[2] bg-[#064E3B] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-[#064E3B]/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
                      >
                        Submit Deposit <ArrowRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Identity Verification Modal */}
      <AnimatePresence>
        {showVerification && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isVerifying && setShowVerification(false)}
              className="absolute inset-0 bg-[#064E3B]/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <div className="h-2 flex">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                  <div
                    key={step}
                    className={`flex-1 transition-all duration-500 ${verificationStep >= step ? 'bg-emerald-500' : 'bg-gray-100'}`}
                  />
                ))}
              </div>

              <div className="p-10 md:p-12">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <span className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-2 block">Verification • Step {verificationStep} of 6</span>
                    <h3 className="text-3xl font-black text-[#064E3B]">
                      {verificationStep === 1 && "Personal Identity"}
                      {verificationStep === 2 && "Document Upload"}
                      {verificationStep === 3 && "Biometric Check"}
                      {verificationStep === 4 && "Confirm Address"}
                      {verificationStep === 5 && "Link External Bank"}
                      {verificationStep === 6 && "Security Setup"}
                    </h3>
                  </div>
                  {!isVerifying && (
                    <button onClick={() => setShowVerification(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <X size={24} className="text-gray-400" />
                    </button>
                  )}
                </div>

                <div className="min-h-[380px]">
                  {verificationStep === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <p className="text-gray-500 font-bold leading-relaxed">
                        To comply with federal regulations, we need to verify your Social Security Number. Your data is encrypted and never stored on our servers.
                      </p>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-[#064E3B] uppercase tracking-widest px-1">Social Security Number</label>
                          <div className="relative">
                            <input
                              type={showSsn ? "text" : "password"}
                              value={ssn}
                              onChange={handleSSNChange}
                              placeholder="000-00-0000"
                              className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl outline-none font-bold focus:border-emerald-500 transition-all text-xl tracking-[0.2em]"
                            />
                            <button
                              type="button"
                              onClick={() => setShowSsn(!showSsn)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#064E3B] transition-colors"
                            >
                              {showSsn ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl text-emerald-700">
                          <ShieldCheck size={20} />
                          <p className="text-xs font-bold">Bank-grade 256-bit AES Encryption</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {verificationStep === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                      <p className="text-gray-500 font-bold leading-relaxed">
                        Please upload a clear photo of your government-issued ID (Driver's License or Passport).
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <button className="aspect-[4/3] border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-emerald-500 hover:bg-emerald-50 transition-all group">
                          <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-white transition-colors">
                            <Camera size={32} className="text-gray-400 group-hover:text-emerald-500" />
                          </div>
                          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Take Photo</span>
                        </button>
                        <button className="aspect-[4/3] border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-emerald-500 hover:bg-emerald-50 transition-all group">
                          <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-white transition-colors">
                            <FileUp size={32} className="text-gray-400 group-hover:text-emerald-500" />
                          </div>
                          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Upload File</span>
                        </button>
                      </div>
                      <div className="flex items-start gap-3 text-orange-600 bg-orange-50 p-4 rounded-2xl">
                        <AlertCircle size={18} className="mt-0.5 shrink-0" />
                        <p className="text-xs font-bold">Ensure the photo is not blurry and all text is readable.</p>
                      </div>
                    </motion.div>
                  )}

                  {verificationStep === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center space-y-8">
                      <div className="relative w-48 h-48 mx-auto">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 border-4 border-dashed border-emerald-500 rounded-full"
                        />
                        <div className="absolute inset-4 bg-gray-50 rounded-full flex items-center justify-center">
                          <Fingerprint size={64} className="text-[#064E3B]" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-xl font-black text-[#064E3B]">Biometric Scanning</h4>
                        <p className="text-gray-500 font-bold leading-relaxed max-w-sm mx-auto">
                          We'll use your camera to match your face with your ID document. This only takes a few seconds.
                        </p>
                      </div>
                      <div className="flex justify-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#064E3B]">Camera Ready</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {verificationStep === 4 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <p className="text-gray-500 font-bold leading-relaxed">
                        Confirm your primary residential address. This will be used for shipping your physical cards.
                      </p>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-[#064E3B] uppercase tracking-widest px-1">Street Address</label>
                          <input
                            placeholder="123 Financial Way"
                            value={address.street}
                            onChange={(e) => setAddress({...address, street: e.target.value})}
                            className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl outline-none font-bold focus:border-emerald-500 transition-all"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#064E3B] uppercase tracking-widest px-1">City</label>
                            <input
                              placeholder="New York"
                              value={address.city}
                              onChange={(e) => setAddress({...address, city: e.target.value})}
                              className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl outline-none font-bold focus:border-emerald-500 transition-all"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-[#064E3B] uppercase tracking-widest px-1">State</label>
                              <input
                                placeholder="NY"
                                maxLength={2}
                                value={address.state}
                                onChange={(e) => setAddress({...address, state: e.target.value.toUpperCase()})}
                                className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl outline-none font-bold focus:border-emerald-500 transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-[#064E3B] uppercase tracking-widest px-1">Zip</label>
                              <input
                                placeholder="10001"
                                value={address.zip}
                                onChange={(e) => setAddress({...address, zip: e.target.value})}
                                className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl outline-none font-bold focus:border-emerald-500 transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {verificationStep === 5 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <p className="text-gray-500 font-bold leading-relaxed">
                        Link your external bank account to enable instant transfers and automatic savings.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { name: 'Chase', icon: Building2 },
                          { name: 'Bank of America', icon: Building2 },
                          { name: 'Wells Fargo', icon: Building2 },
                          { name: 'Citibank', icon: Building2 }
                        ].map((bank) => (
                          <button
                            key={bank.name}
                            onClick={() => setSelectedBank(bank.name)}
                            className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${selectedBank === bank.name ? 'border-emerald-500 bg-emerald-50' : 'border-gray-50 hover:border-emerald-200'}`}
                          >
                            <div className={`p-3 rounded-2xl ${selectedBank === bank.name ? 'bg-white' : 'bg-gray-50'}`}>
                              <bank.icon size={24} className={selectedBank === bank.name ? 'text-emerald-500' : 'text-gray-400'} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest">{bank.name}</span>
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          placeholder="Search for other banks..."
                          className="w-full bg-gray-50 border-none pl-12 pr-6 py-4 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>
                    </motion.div>
                  )}

                  {verificationStep === 6 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                      <p className="text-gray-500 font-bold leading-relaxed">
                        Enable Two-Factor Authentication (2FA) to protect your account from unauthorized access.
                      </p>
                      <div className="bg-gray-50 rounded-[2rem] p-8 flex flex-col items-center gap-6">
                        <div className="p-4 bg-white rounded-3xl shadow-sm border border-gray-100">
                          <QrCode size={120} className="text-[#064E3B]" />
                        </div>
                        <div className="text-center space-y-2">
                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Secret Backup Key</p>
                          <div className="bg-white px-4 py-2 rounded-xl flex items-center gap-3 border border-gray-100">
                            <code className="text-[#064E3B] font-mono font-bold tracking-widest">KLS9 - 28AX - P92L</code>
                            <button className="text-emerald-600 font-black text-[10px] uppercase">Copy</button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#064E3B] uppercase tracking-widest px-1">Verification Code</label>
                        <input
                          placeholder="0 0 0 - 0 0 0"
                          className="w-full bg-gray-50 border-2 border-transparent p-5 rounded-2xl outline-none font-bold focus:border-emerald-500 transition-all text-center text-2xl tracking-[0.5em]"
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="mt-10 pt-10 border-t border-gray-50 flex gap-4">
                  {verificationStep > 1 && !isVerifying && (
                    <button
                      onClick={() => setVerificationStep(s => s - 1)}
                      className="flex-1 py-5 rounded-2xl border-2 border-gray-100 text-[#064E3B] font-black hover:bg-gray-50 transition-all"
                    >
                      Back
                    </button>
                  )}
                  <button
                    disabled={isVerifying}
                    onClick={() => {
                      if (verificationStep < 6) {
                        setVerificationStep(s => s + 1);
                      } else {
                        setIsVerifying(true);
                        setTimeout(() => {
                          setIsVerifying(false);
                          setShowVerification(false);
                          setVerificationStep(1);
                          alert('Account profile complete! Your account is now fully verified.');
                        }, 3000);
                      }
                    }}
                    className="flex-[2] bg-[#064E3B] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-[#064E3B]/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100"
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 size={24} className="animate-spin" />
                        Finalizing...
                      </>
                    ) : (
                      <>
                        {verificationStep === 6 ? "Finish Setup" : "Next Step"}
                        <ChevronRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upgrade Premium Modal (Simplified - Add later) */}
      {/* showUpgradeModal handled in sidebar */}

      {/* Create New Modal (Simplified - Add later) */}
      {/* showNewModal handled in quick actions */}

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center z-50" aria-label="Mobile navigation">
        {[
          { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { id: 'accounts', icon: Wallet, label: 'Accounts', onClick: () => navigate('/accounts') },
          { id: 'cards', icon: CreditCard, label: 'Cards', onClick: () => navigate('/cards') },
          { id: 'settings', icon: Settings, label: 'Settings', onClick: () => navigate('/settings') },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.onClick) {
                item.onClick();
              } else {
                setActiveTab(item.id);
              }
            }}
            className={`p-3 rounded-2xl transition-all ${activeTab === item.id ? 'bg-[#DCFCE7] text-[#064E3B]' : 'text-gray-400'}`}
            aria-label={item.label}
            aria-current={activeTab === item.id ? 'page' : undefined}
          >
            <item.icon size={24} aria-hidden="true" />
          </button>
        ))}
      </nav>
    </div>
  );
};
