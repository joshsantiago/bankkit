import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  CreditCard, 
  Smartphone, 
  Shield, 
  Trash2, 
  ChevronRight, 
  ArrowLeft,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronDown,
  Moon,
  Sun,
  Languages,
  MessageCircle,
  Search as SearchIcon,
  HelpCircle,
  FileText,
  Send,
  X
} from 'lucide-react';

export function SettingsPage({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'preferences' | 'account'>('profile');
  const [user, setUser] = useState<any>({ first_name: 'Alex', last_name: 'Rivera', email: 'alex.rivera@example.com' });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [supportStep, setSupportStep] = useState<'home' | 'chat' | 'ticket'>('home');
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: 'Hi! I\'m BankKit AI. How can I help you today?', time: '9:41 AM' }
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem('bankkit_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleSave = () => {
    // Mock save
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-[#064E3B] transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-3xl font-black text-[#064E3B]">Settings</h1>
                <p className="text-sm font-bold text-gray-400">Manage your account preferences and profile</p>
              </div>
            </div>
            <button 
              onClick={handleSave}
              className="hidden md:block bg-[#064E3B] text-white px-8 py-3 rounded-2xl font-black hover:scale-[1.02] transition-transform shadow-xl shadow-[#064E3B]/10"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-4">
            {[
              { id: 'profile', label: 'Profile Settings', icon: User },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'preferences', label: 'App Preferences', icon: Globe },
              { id: 'account', label: 'Account Actions', icon: Smartphone },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white text-[#064E3B] shadow-lg shadow-gray-200/50 border border-gray-50' 
                    : 'text-gray-400 hover:text-[#064E3B]'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}

            <div className="mt-8 p-8 bg-[#DCFCE7] rounded-[2.5rem] border border-emerald-100 text-[#064E3B]">
              <div className="flex items-center gap-3 mb-4">
                <Shield size={24} className="text-emerald-600" />
                <h4 className="font-black">Help Center</h4>
              </div>
              <p className="text-xs font-bold text-[#064E3B]/70 leading-relaxed mb-6">
                Need help managing your account? Our support team is available 24/7.
              </p>
              <button 
                onClick={() => setShowSupport(true)}
                className="w-full bg-[#064E3B] text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Get Support
              </button>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-10">
                    <div>
                      <h3 className="text-2xl font-black text-[#064E3B] mb-2">Personal Information</h3>
                      <p className="text-sm font-bold text-gray-400">Update your details and how we contact you.</p>
                    </div>

                    {/* Avatar Upload */}
                    <div className="flex flex-col sm:flex-row items-center gap-8 pb-10 border-b border-gray-50">
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-[#064E3B] flex items-center justify-center text-white text-2xl font-black ring-4 ring-emerald-50">
                          {user?.first_name?.[0]}{user?.last_name?.[0]}
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg text-[#064E3B] hover:scale-110 transition-transform border border-gray-100">
                          <Camera size={16} />
                        </button>
                      </div>
                      <div className="text-center sm:text-left">
                        <h4 className="font-black text-[#064E3B]">Profile Photo</h4>
                        <p className="text-xs font-bold text-gray-400 mb-3">JPG, GIF or PNG. Max size of 2MB.</p>
                        <div className="flex gap-3">
                          <button className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-black text-[#064E3B] hover:bg-emerald-50 transition-colors">Upload New</button>
                          <button className="px-4 py-2 text-xs font-black text-red-400 hover:bg-red-50 rounded-xl transition-colors">Remove</button>
                        </div>
                      </div>
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#064E3B] uppercase tracking-widest px-1">First Name</label>
                        <input 
                          defaultValue={user?.first_name}
                          className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl outline-none font-bold focus:border-emerald-500 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#064E3B] uppercase tracking-widest px-1">Last Name</label>
                        <input 
                          defaultValue={user?.last_name || 'Rivera'}
                          className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl outline-none font-bold focus:border-emerald-500 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#064E3B] uppercase tracking-widest px-1">Email Address</label>
                        <div className="relative">
                          <input 
                            defaultValue={user?.email}
                            className="w-full bg-gray-50 border-2 border-transparent p-4 pl-12 rounded-2xl outline-none font-bold focus:border-emerald-500 transition-all"
                          />
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#064E3B] uppercase tracking-widest px-1">Phone Number</label>
                        <div className="relative">
                          <input 
                            defaultValue="+1 (555) 000-0000"
                            className="w-full bg-gray-50 border-2 border-transparent p-4 pl-12 rounded-2xl outline-none font-bold focus:border-emerald-500 transition-all"
                          />
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-[#064E3B] uppercase tracking-widest px-1">Mailing Address</label>
                      <div className="relative">
                        <input 
                          defaultValue="123 Financial Way, San Francisco, CA 94103"
                          className="w-full bg-gray-50 border-2 border-transparent p-4 pl-12 rounded-2xl outline-none font-bold focus:border-emerald-500 transition-all"
                        />
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-10">
                    <div>
                      <h3 className="text-2xl font-black text-[#064E3B] mb-2">Notification Preferences</h3>
                      <p className="text-sm font-bold text-gray-400">Choose how and when you want to be notified.</p>
                    </div>

                    <div className="space-y-8">
                      {[
                        { title: 'Security Alerts', desc: 'Get notified of unusual login attempts or suspicious activity.', email: true, push: true },
                        { title: 'Transaction Updates', desc: 'Receive alerts for every purchase and deposit made.', email: false, push: true },
                        { title: 'Payment Reminders', desc: 'Stay on top of upcoming bill payments and transfers.', email: true, push: true },
                        { title: 'New Features', desc: 'Be the first to hear about product updates and new tools.', email: true, push: false },
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-[2rem] border border-gray-50 hover:bg-gray-50 transition-all group">
                          <div className="max-w-md">
                            <h4 className="font-black text-[#064E3B] mb-1 group-hover:text-emerald-600 transition-colors">{item.title}</h4>
                            <p className="text-sm font-bold text-gray-400 leading-relaxed">{item.desc}</p>
                          </div>
                          <div className="flex gap-8">
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-[8px] font-black uppercase tracking-tighter text-gray-400">Email</span>
                              <button className={`w-12 h-6 rounded-full relative transition-colors ${item.email ? 'bg-[#064E3B]' : 'bg-gray-200'}`}>
                                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${item.email ? 'left-6.5' : 'left-0.5'} shadow-sm`} />
                              </button>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-[8px] font-black uppercase tracking-tighter text-gray-400">Push</span>
                              <button className={`w-12 h-6 rounded-full relative transition-colors ${item.push ? 'bg-[#064E3B]' : 'bg-gray-200'}`}>
                                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${item.push ? 'left-6.5' : 'left-0.5'} shadow-sm`} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'preferences' && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-10">
                    <div>
                      <h3 className="text-2xl font-black text-[#064E3B] mb-2">App Preferences</h3>
                      <p className="text-sm font-bold text-gray-400">Customize your BankKit experience.</p>
                    </div>

                    <div className="space-y-10">
                      {/* Theme Toggle */}
                      <div className="flex items-center justify-between p-6 rounded-[2rem] bg-gray-50">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl bg-white text-[#064E3B] shadow-sm`}>
                            {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
                          </div>
                          <div>
                            <h4 className="font-black text-[#064E3B]">Appearance</h4>
                            <p className="text-xs font-bold text-gray-400">Switch between light and dark mode</p>
                          </div>
                        </div>
                        <div className="flex bg-white p-1 rounded-xl border border-gray-100">
                          <button 
                            onClick={() => setIsDarkMode(false)}
                            className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${!isDarkMode ? 'bg-[#064E3B] text-white' : 'text-gray-400'}`}
                          >
                            Light
                          </button>
                          <button 
                            onClick={() => setIsDarkMode(true)}
                            className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${isDarkMode ? 'bg-[#064E3B] text-white' : 'text-gray-400'}`}
                          >
                            Dark
                          </button>
                        </div>
                      </div>

                      {/* Language Selection */}
                      <div className="flex items-center justify-between p-6 rounded-[2rem] border border-gray-100 group">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                            <Languages size={24} />
                          </div>
                          <div>
                            <h4 className="font-black text-[#064E3B]">Language</h4>
                            <p className="text-xs font-bold text-gray-400">Choose your preferred language</p>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-xl font-black text-sm text-[#064E3B] hover:bg-emerald-50 transition-colors">
                          English (US) <ChevronDown size={16} />
                        </button>
                      </div>

                      {/* Currency Selection */}
                      <div className="flex items-center justify-between p-6 rounded-[2rem] border border-gray-100 group">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                            <CreditCard size={24} />
                          </div>
                          <div>
                            <h4 className="font-black text-[#064E3B]">Primary Currency</h4>
                            <p className="text-xs font-bold text-gray-400">Display all balances in this currency</p>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-xl font-black text-sm text-[#064E3B] hover:bg-blue-50 transition-colors">
                          USD ($) <ChevronDown size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'account' && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-10">
                    <div>
                      <h3 className="text-2xl font-black text-[#064E3B] mb-2">Account Actions</h3>
                      <p className="text-sm font-bold text-gray-400">Important actions related to your account security and data.</p>
                    </div>

                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-between p-6 rounded-[2rem] border border-gray-100 hover:border-emerald-200 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-gray-50 text-gray-400 group-hover:text-emerald-600 transition-colors">
                            <Smartphone size={24} />
                          </div>
                          <div className="text-left">
                            <h4 className="font-black text-[#064E3B]">Export My Data</h4>
                            <p className="text-xs font-bold text-gray-400">Download a full archive of your transaction history.</p>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-gray-200" />
                      </button>

                      <button className="w-full flex items-center justify-between p-6 rounded-[2rem] border border-gray-100 hover:border-orange-200 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-orange-50 text-orange-400">
                            <Lock size={24} />
                          </div>
                          <div className="text-left">
                            <h4 className="font-black text-[#064E3B]">Freeze Account</h4>
                            <p className="text-xs font-bold text-gray-400">Temporarily disable all transactions and access.</p>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-gray-200" />
                      </button>

                      <button className="w-full flex items-center justify-between p-6 rounded-[2rem] border border-red-50 hover:bg-red-50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-red-50 text-red-400">
                            <Trash2 size={24} />
                          </div>
                          <div className="text-left">
                            <h4 className="font-black text-red-500">Close Account</h4>
                            <p className="text-xs font-bold text-red-400/60">Permanently delete your account and all associated data.</p>
                          </div>
                        </div>
                        <AlertTriangle size={20} className="text-red-200" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#064E3B] p-10 rounded-[3rem] text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-black mb-2">Refer a Friend</h3>
                        <p className="text-emerald-400/80 font-bold">Earn $50 for every friend who joins BankKit and makes their first deposit.</p>
                      </div>
                      <button className="bg-white text-[#064E3B] px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform flex items-center gap-2">
                        Get Referral Link <ExternalLink size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Support Modal Overlay */}
      <AnimatePresence>
        {showSupport && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSupport(false)}
              className="absolute inset-0 bg-[#064E3B]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Support Header */}
              <div className="p-8 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#064E3B] rounded-2xl text-white">
                    <HelpCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#064E3B]">Support Center</h3>
                    <p className="text-xs font-bold text-gray-400">Average response time: 2 mins</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowSupport(false);
                    setSupportStep('home');
                  }}
                  className="p-3 hover:bg-white rounded-2xl text-gray-400 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Support Content Area */}
              <div className="flex-1 overflow-y-auto p-8">
                {supportStep === 'home' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    {/* Search bar */}
                    <div className="relative">
                      <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input 
                        placeholder="Search for help articles..."
                        className="w-full bg-gray-50 border-2 border-transparent p-6 pl-16 rounded-3xl outline-none font-bold focus:border-emerald-500 transition-all text-sm"
                      />
                    </div>

                    {/* Quick Help Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { icon: CreditCard, title: 'Card Issues', desc: 'Lost card, PIN reset, or limits' },
                        { icon: Smartphone, title: 'Mobile Banking', desc: 'App troubleshooting & features' },
                        { icon: Shield, title: 'Security', desc: 'Fraud reporting & 2FA help' },
                        { icon: FileText, title: 'Documents', desc: 'Statements and tax forms' },
                      ].map((item, idx) => (
                        <button key={idx} className="p-6 rounded-3xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all text-left group">
                          <item.icon className="text-emerald-600 mb-4 group-hover:scale-110 transition-transform" size={24} />
                          <h4 className="font-black text-[#064E3B] mb-1">{item.title}</h4>
                          <p className="text-xs font-bold text-gray-400">{item.desc}</p>
                        </button>
                      ))}
                    </div>

                    {/* Contact Options */}
                    <div className="pt-8 border-t border-gray-50 flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => setSupportStep('chat')}
                        className="flex-1 bg-[#064E3B] text-white p-6 rounded-[2rem] font-black flex flex-col items-center gap-3 hover:scale-105 transition-transform"
                      >
                        <MessageCircle size={28} />
                        <span>Start Live Chat</span>
                      </button>
                      <button 
                        onClick={() => setSupportStep('ticket')}
                        className="flex-1 bg-emerald-50 text-[#064E3B] p-6 rounded-[2rem] font-black flex flex-col items-center gap-3 hover:scale-105 transition-transform"
                      >
                        <Mail size={28} />
                        <span>Email Support</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {supportStep === 'chat' && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col h-full space-y-6"
                  >
                    <button 
                      onClick={() => setSupportStep('home')}
                      className="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-widest hover:underline mb-2"
                    >
                      <ArrowLeft size={14} /> Back to home
                    </button>
                    
                    <div className="flex-1 min-h-[300px] space-y-4">
                      {chatMessages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'bot' ? 'bg-gray-100 text-[#064E3B] rounded-tl-none' : 'bg-[#064E3B] text-white rounded-tr-none'}`}>
                            <p className="text-sm font-bold">{msg.text}</p>
                            <p className="text-[8px] font-black uppercase mt-1 opacity-50">{msg.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="relative pt-4 border-t border-gray-50">
                      <input 
                        placeholder="Type your message..."
                        className="w-full bg-gray-50 p-5 pr-16 rounded-2xl outline-none font-bold text-sm focus:bg-white border border-transparent focus:border-emerald-500 transition-all"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const input = e.target as HTMLInputElement;
                            if (!input.value.trim()) return;
                            setChatMessages([...chatMessages, { role: 'user', text: input.value, time: '9:42 AM' }]);
                            input.value = '';
                            setTimeout(() => {
                              setChatMessages(prev => [...prev, { role: 'bot', text: 'Thanks for reaching out! A human agent will be with you shortly.', time: '9:42 AM' }]);
                            }, 1000);
                          }
                        }}
                      />
                      <button className="absolute right-4 bottom-4 p-3 bg-[#064E3B] text-white rounded-xl hover:scale-105 transition-transform">
                        <Send size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {supportStep === 'ticket' && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <button 
                      onClick={() => setSupportStep('home')}
                      className="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-widest hover:underline"
                    >
                      <ArrowLeft size={14} /> Back to home
                    </button>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#064E3B] uppercase tracking-widest px-1">Subject</label>
                        <input 
                          placeholder="What can we help you with?"
                          className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl outline-none font-bold focus:border-emerald-500 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#064E3B] uppercase tracking-widest px-1">Description</label>
                        <textarea 
                          rows={4}
                          placeholder="Provide as much detail as possible..."
                          className="w-full bg-gray-50 border-2 border-transparent p-4 rounded-2xl outline-none font-bold focus:border-emerald-500 transition-all resize-none"
                        />
                      </div>
                      <button className="w-full bg-[#064E3B] text-white py-6 rounded-2xl font-black text-lg hover:scale-[1.02] transition-transform">
                        Submit Support Ticket
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
