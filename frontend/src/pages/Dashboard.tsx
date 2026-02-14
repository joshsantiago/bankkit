import React, { useState, useEffect } from 'react';
import { useNavigate, useContext } from 'react-router-dom';
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
      <aside className="w-80 bg-white border-r border-gray-100 flex flex-col fixed inset-y-0 left-0 hidden lg:flex">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#064E3B] rounded-xl flex items-center justify-center text-white">
            <ShieldCheck size={24} />
          </div>
          <span className="text-2xl font-black text-[#064E3B] tracking-tight">BankKit</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
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
            >
              <item.icon size={20} />
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
      <main className="flex-1 lg:ml-80 pb-24">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-8 py-6 flex items-center justify-between border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-black text-[#064E3B]">Welcome back, {user?.first_name}!</h2>
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
        </div>
      </main>

      {/* All Modals and Mobile Navigation - From Design File */}
      {/* [Modals will be added in next commit] */}

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center z-50">
        {[
          { id: 'dashboard', icon: LayoutDashboard },
          { id: 'accounts', icon: Wallet, onClick: () => navigate('/accounts') },
          { id: 'cards', icon: CreditCard, onClick: () => navigate('/cards') },
          { id: 'settings', icon: Settings, onClick: () => navigate('/settings') },
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
          >
            <item.icon size={24} />
          </button>
        ))}
      </nav>
    </div>
  );
};
