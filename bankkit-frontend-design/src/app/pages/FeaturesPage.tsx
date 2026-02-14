import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Smartphone, 
  BarChart3, 
  Users, 
  Lock, 
  Globe, 
  ArrowRight, 
  MessageSquare,
  Sparkles,
  PieChart,
  Split,
  MousePointer2
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export function FeaturesPage() {
  const featureCategories = [
    {
      title: "Smart Budgeting",
      description: "Take control of your spending with AI-powered insights that categorize every transaction automatically.",
      icon: PieChart,
      image: "https://images.unsplash.com/photo-1570894808314-677b57f25e45?q=80&w=1000",
      features: ["Auto-categorization", "Monthly spend limits", "Trend analysis"]
    },
    {
      title: "Collaborative Banking",
      description: "Manage money with friends or family. Split bills instantly and save together in shared goals.",
      icon: Users,
      image: "https://images.unsplash.com/photo-1767716843242-b2f98460886f?q=80&w=1000",
      features: ["Joint savings pots", "Instant bill splitting", "Group spending alerts"]
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-32">
      {/* Hero Section */}
      <section className="px-6 pb-20">
        <div className="max-w-[1440px] mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#DCFCE7] text-[#064E3B] rounded-full text-sm font-bold"
          >
            <Sparkles size={16} fill="currentColor" />
            <span>Modern Banking Reimagined</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-8xl font-black text-[#064E3B] tracking-tight leading-[1.05] max-w-5xl mx-auto"
          >
            Built for the way <br /> <span className="text-emerald-500 italic">you actually spend.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 font-medium max-w-2xl mx-auto"
          >
            BankKit is more than an account. It's a suite of powerful tools designed to help you grow your wealth, manage your lifestyle, and save effortlessly.
          </motion.p>
        </div>
      </section>

      {/* App Showcase Visual */}
      <section className="px-6 mb-32">
        <div className="max-w-[1200px] mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(6,78,59,0.15)] border border-gray-100"
          >
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1673280115854-279696d9e648?q=80&w=2000" 
              alt="BankKit Dashboard" 
              className="w-full h-auto aspect-video object-cover"
            />
          </motion.div>
          
          {/* Floating Feature Tags */}
          <div className="hidden lg:block">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -left-10 bg-white p-6 rounded-3xl shadow-xl border border-gray-50 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                <BarChart3 />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Growth</p>
                <p className="text-lg font-black text-[#064E3B]">+24% Savings</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="absolute top-1/2 -right-12 bg-white p-6 rounded-3xl shadow-xl border border-gray-50 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                <Users />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Social</p>
                <p className="text-lg font-black text-[#064E3B]">3 New Shared Pots</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="px-6 py-32 bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-32">
            {featureCategories.map((cat, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                className="space-y-12"
              >
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-[#064E3B] rounded-2xl flex items-center justify-center text-[#DCFCE7]">
                    <cat.icon size={32} />
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black text-[#064E3B] leading-tight">{cat.title}</h2>
                  <p className="text-xl text-gray-500 font-medium leading-relaxed">{cat.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cat.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[#064E3B] font-bold">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl group cursor-pointer">
                  <ImageWithFallback 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Icons Grid */}
      <section className="px-6 py-32">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-5xl font-black text-[#064E3B] mb-6">Small tools. Big impact.</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">It's the little details that make BankKit feel like magic every single day.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: Zap, title: "Instant Transfers", desc: "Send and receive money in milliseconds between BankKit users." },
              { icon: Smartphone, title: "Virtual Cards", desc: "Create disposable cards for online shopping to keep your data safe." },
              { icon: Lock, title: "Security Lock", desc: "Instantly freeze and unfreeze your card from the app if it goes missing." },
              { icon: Split, title: "Bill Splitting", desc: "Split any transaction with a single tap, no math required." },
              { icon: Globe, title: "Global Access", desc: "Withdraw cash and pay in 150+ countries with no extra fees." },
              { icon: MessageSquare, title: "24/7 Support", desc: "Human help whenever you need it, right inside the app chat." },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[2rem] bg-white border border-gray-100 hover:shadow-2xl hover:shadow-[#064E3B]/5 transition-all group"
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#064E3B] mb-8 group-hover:scale-110 transition-transform">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-black text-[#064E3B] mb-4">{feature.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32 bg-[#064E3B] rounded-t-[4rem] text-center">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-5xl lg:text-7xl font-black text-white leading-tight">
            Ready to upgrade <br /> your <span className="text-[#DCFCE7]">financial life?</span>
          </h2>
          <p className="text-xl text-emerald-100/60 font-medium">
            Join thousands of users who have switched to a smarter way of banking.
            It takes less than 3 minutes to open an account.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#DCFCE7] text-[#064E3B] px-12 py-6 rounded-full font-black text-xl hover:scale-105 transition-transform">
              Open your account
            </button>
            <button className="bg-white/10 text-white border border-white/20 px-12 py-6 rounded-full font-black text-xl hover:bg-white/20 transition-all">
              See pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
