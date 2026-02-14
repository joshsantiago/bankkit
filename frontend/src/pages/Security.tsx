import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Lock,
  Smartphone,
  Eye,
  ShieldAlert,
  Fingerprint,
  Key,
  Globe,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  MapPin,
  Clock,
  ExternalLink,
  ShieldQuestion
} from 'lucide-react';

const SECURITY_FEATURES = [
  {
    icon: Fingerprint,
    title: 'Biometric Login',
    desc: 'Use FaceID or TouchID to access your account instantly and securely.',
    status: 'Enabled',
    color: 'bg-emerald-50 text-emerald-600'
  },
  {
    icon: Key,
    title: 'Two-Factor Auth',
    desc: 'Verify every sign-in with a secondary code sent to your trusted device.',
    status: 'Enabled',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    icon: ShieldAlert,
    title: 'Fraud Monitoring',
    desc: 'AI-powered detection watches for suspicious activity 24/7.',
    status: 'Active',
    color: 'bg-orange-50 text-orange-600'
  },
  {
    icon: Globe,
    title: 'Encryption',
    desc: 'Your data is protected with military-grade 256-bit AES encryption.',
    status: 'Active',
    color: 'bg-purple-50 text-purple-600'
  }
];

const ACTIVE_SESSIONS = [
  {
    id: 1,
    device: 'iPhone 15 Pro',
    location: 'San Francisco, CA',
    time: 'Active now',
    current: true,
    icon: Smartphone
  },
  {
    id: 2,
    device: 'MacBook Pro 16"',
    location: 'San Francisco, CA',
    time: '2 hours ago',
    current: false,
    icon: Globe
  },
  {
    id: 3,
    device: 'Chrome on Windows',
    location: 'Seattle, WA',
    time: 'Feb 12, 10:45 AM',
    current: false,
    icon: Globe
  }
];

const RECENT_ACTIVITY = [
  { id: 1, event: 'Successful Login', date: 'Today, 9:41 AM', icon: Lock, status: 'success' },
  { id: 2, event: 'Card Frozen', date: 'Yesterday, 4:20 PM', icon: ShieldAlert, status: 'warning' },
  { id: 3, event: 'Password Changed', date: 'Feb 10, 2:15 PM', icon: Key, status: 'success' },
];

export function SecurityPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'settings'>('overview');

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
                <h1 className="text-3xl font-black text-[#064E3B]">Security Center</h1>
                <p className="text-sm font-bold text-gray-400">Protect your account and personal data</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-[#DCFCE7] px-6 py-3 rounded-2xl border border-emerald-100">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-black text-[#064E3B] uppercase tracking-widest">Account Status: Secure</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-3 space-y-4">
            {[
              { id: 'overview', label: 'Overview', icon: ShieldCheck },
              { id: 'sessions', label: 'Active Sessions', icon: Smartphone },
              { id: 'settings', label: 'Privacy Settings', icon: Eye },
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

            <div className="mt-8 p-8 bg-[#064E3B] rounded-[2.5rem] text-white space-y-4">
              <ShieldQuestion size={32} className="text-emerald-400" />
              <h4 className="font-black">Found a bug?</h4>
              <p className="text-xs font-bold text-white/60 leading-relaxed">
                Report security vulnerabilities to our team and earn rewards through our bounty program.
              </p>
              <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400 hover:underline">
                Security Bounty <ExternalLink size={14} />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-10"
                >
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SECURITY_FEATURES.map((feature) => (
                      <div key={feature.title} className="bg-white p-8 rounded-[3rem] border border-gray-50 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex items-start justify-between mb-6">
                          <div className={`p-4 rounded-2xl ${feature.color} transition-transform group-hover:scale-110`}>
                            <feature.icon size={28} />
                          </div>
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                            {feature.status}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-[#064E3B] mb-2">{feature.title}</h3>
                        <p className="text-sm font-bold text-gray-400 leading-relaxed">{feature.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Activity & Checklist */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Recent Security Activity */}
                    <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-8">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-[#064E3B]">Security Activity</h3>
                        <button className="text-emerald-600 font-bold text-sm">View Log</button>
                      </div>
                      <div className="space-y-6">
                        {RECENT_ACTIVITY.map((item) => (
                          <div key={item.id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-xl ${item.status === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                                <item.icon size={20} />
                              </div>
                              <div>
                                <p className="font-black text-[#064E3B] group-hover:text-emerald-600 transition-colors">{item.event}</p>
                                <p className="text-xs font-bold text-gray-400">{item.date}</p>
                              </div>
                            </div>
                            <ChevronRight size={18} className="text-gray-200 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Security Checklist */}
                    <div className="bg-[#DCFCE7] p-10 rounded-[3rem] space-y-8">
                      <h3 className="text-xl font-black text-[#064E3B]">Security Checklist</h3>
                      <div className="space-y-4">
                        {[
                          { label: 'Verified Phone Number', done: true },
                          { label: 'Set Up 2FA Verification', done: true },
                          { label: 'Emergency Contact Added', done: false },
                          { label: 'Privacy Policy Reviewed', done: true },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-white/20">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.done ? 'bg-emerald-500 text-white' : 'bg-white text-gray-300'}`}>
                              {item.done ? <CheckCircle2 size={16} /> : <div className="w-2 h-2 rounded-full bg-gray-200" />}
                            </div>
                            <span className={`text-sm font-black ${item.done ? 'text-[#064E3B]' : 'text-gray-400'}`}>{item.label}</span>
                          </div>
                        ))}
                      </div>
                      <button className="w-full bg-[#064E3B] text-white py-4 rounded-2xl font-black hover:scale-[1.02] transition-transform">
                        Improve Score
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'sessions' && (
                <motion.div
                  key="sessions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-black text-[#064E3B]">Active Sessions</h3>
                        <p className="text-sm font-bold text-gray-400">Manage devices currently logged into your account</p>
                      </div>
                      <button className="text-red-500 font-black text-xs uppercase tracking-widest hover:underline">Log out all devices</button>
                    </div>

                    <div className="space-y-4">
                      {ACTIVE_SESSIONS.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-6 rounded-[2rem] border border-gray-100 hover:border-emerald-200 transition-colors">
                          <div className="flex items-center gap-6">
                            <div className={`p-4 rounded-2xl ${session.current ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-400'}`}>
                              <session.icon size={24} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-black text-[#064E3B]">{session.device}</h4>
                                {session.current && (
                                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[8px] font-black uppercase tracking-tighter rounded-full">Current</span>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                                <span className="flex items-center gap-1.5"><MapPin size={12} /> {session.location}</span>
                                <span className="flex items-center gap-1.5"><Clock size={12} /> {session.time}</span>
                              </div>
                            </div>
                          </div>
                          {!session.current && (
                            <button className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                              <LogOut size={20} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-orange-50 p-8 rounded-[2.5rem] flex items-start gap-6 border border-orange-100">
                    <div className="p-3 bg-white rounded-2xl text-orange-500 shadow-sm">
                      <AlertTriangle size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-orange-800 mb-1">Unrecognized device?</h4>
                      <p className="text-sm font-bold text-orange-700/70 mb-4 leading-relaxed">
                        If you don't recognize one of these devices, someone else might have access to your account. 
                        Change your password immediately and log out of all sessions.
                      </p>
                      <button className="bg-orange-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-colors">
                        Change Password
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm space-y-10">
                    <h3 className="text-2xl font-black text-[#064E3B]">Privacy & Permissions</h3>
                    
                    <div className="space-y-10">
                      {[
                        { title: 'Data Sharing', desc: 'Allow BankKit to share anonymized data with partners for better offers.', enabled: false },
                        { title: 'Location Access', desc: 'Use your location to prevent fraudulent transactions from unexpected places.', enabled: true },
                        { title: 'Marketing Emails', desc: 'Receive updates about new features, security tips, and premium offers.', enabled: true },
                        { title: 'Public Profile', desc: 'Allow other BankKit users to find you by your username for quick transfers.', enabled: false },
                      ].map((setting, idx) => (
                        <div key={idx} className="flex items-center justify-between group">
                          <div className="max-w-md">
                            <h4 className="font-black text-[#064E3B] mb-1 group-hover:text-emerald-600 transition-colors">{setting.title}</h4>
                            <p className="text-sm font-bold text-gray-400 leading-relaxed">{setting.desc}</p>
                          </div>
                          <button className={`w-14 h-8 rounded-full relative transition-colors ${setting.enabled ? 'bg-[#064E3B]' : 'bg-gray-200'}`}>
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${setting.enabled ? 'left-7' : 'left-1'} shadow-sm`} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="pt-10 border-t border-gray-50 flex justify-end gap-4">
                      <button className="px-8 py-4 rounded-2xl font-black text-gray-400 hover:text-[#064E3B] transition-colors">Reset Defaults</button>
                      <button className="bg-[#064E3B] text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-[#064E3B]/10 hover:scale-[1.02] transition-transform">Save Changes</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
