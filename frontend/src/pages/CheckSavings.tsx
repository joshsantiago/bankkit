import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  Percent, 
  PiggyBank, 
  Clock, 
  ShieldCheck, 
  Target, 
  Smartphone,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Coins
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export function CheckSavingsPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-6 mb-32">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#DCFCE7] text-[#064E3B] rounded-full text-sm font-bold">
              <TrendingUp size={16} />
              <span>4.50% APY on Savings</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-[#064E3B] leading-[1.1] tracking-tight">
              Grow your wealth <br /> <span className="text-emerald-500 italic text-6xl lg:text-8xl">effortlessly.</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
              High-yield savings and flexible checking in one place. No monthly fees, no minimum balance, and early payday for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-[#064E3B] text-white px-10 py-5 rounded-[2rem] font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-[#064E3B]/20">
                Open Account
              </button>
              <button className="bg-white text-[#064E3B] px-10 py-5 rounded-[2rem] font-bold text-lg hover:bg-gray-50 border border-gray-100 transition-all flex items-center justify-center gap-2">
                Calculate Earnings <ArrowUpRight size={20} />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="rounded-[3rem] overflow-hidden shadow-2xl relative group">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1607783821888-87d15adcae65?q=80&w=1200" 
                alt="Happy banking" 
                className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/40 to-transparent" />
              
              {/* Savings Goal Overlay */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/20"
              >
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Savings Goal</p>
                    <h3 className="text-2xl font-black text-[#064E3B]">Dream Vacation 🌴</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-emerald-600">$4,250</p>
                    <p className="text-xs font-bold text-gray-400">of $5,000</p>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { label: "APY", value: "4.50%", sub: "High-yield" },
            { label: "Minimum", value: "$0", sub: "To open" },
            { label: "Fees", value: "$0", sub: "No monthly" },
            { label: "Insurance", value: "$250k", sub: "FDIC Covered" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
              <p className="text-5xl lg:text-6xl font-black text-[#064E3B] mb-1">{stat.value}</p>
              <p className="text-gray-400 font-bold">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-32">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div 
              {...fadeIn}
              className="p-12 rounded-[3rem] bg-[#064E3B] text-white flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-[#DCFCE7] text-[#064E3B] rounded-2xl flex items-center justify-center mb-8">
                  <Clock size={32} />
                </div>
                <h3 className="text-3xl font-black mb-4">Get paid early.</h3>
                <p className="text-emerald-100/70 text-lg font-medium leading-relaxed">
                  Why wait for payday? Get your direct deposits up to two days early. Automatically.
                </p>
              </div>
              <div className="pt-12">
                <button className="flex items-center gap-2 font-black text-[#DCFCE7] group">
                  Learn how it works <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>

            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="p-12 rounded-[3rem] bg-white border border-gray-100 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
                  <Target size={32} />
                </div>
                <h3 className="text-3xl font-black text-[#064E3B] mb-4">Auto-Save Pots.</h3>
                <p className="text-gray-500 text-lg font-medium leading-relaxed">
                  Round up your spare change or set recurring transfers to reach your goals faster.
                </p>
              </div>
              <div className="pt-12">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1673923251587-44133703d319?q=80&w=600" 
                  alt="Savings" 
                  className="w-full h-32 object-cover rounded-2xl opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </motion.div>

            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.4 }}
              className="p-12 rounded-[3rem] bg-emerald-50 border border-emerald-100 flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 bg-[#064E3B] text-white rounded-2xl flex items-center justify-center mb-8">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-3xl font-black text-[#064E3B] mb-4">Bank with confidence.</h3>
                <p className="text-gray-600 text-lg font-medium leading-relaxed">
                  Your funds are FDIC-insured up to $250,000. Real-time alerts keep you in control.
                </p>
              </div>
              <div className="pt-12">
                <button className="flex items-center gap-2 font-black text-[#064E3B] group">
                  Read our security promise <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Savings Growth Visualization */}
      <section className="px-6 py-32 bg-white">
        <div className="max-w-[1440px] mx-auto bg-[#F8FAFC] rounded-[4rem] p-12 lg:p-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
            <Coins size={400} className="text-[#064E3B] -mr-40" />
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-4xl lg:text-6xl font-black text-[#064E3B] leading-tight">
                Watch your money <br /> <span className="text-emerald-500">work for you.</span>
              </h2>
              
              <div className="space-y-8">
                {[
                  { icon: Percent, title: "Industry-leading rates", desc: "Our 4.50% APY is 11x the national average. Why settle for less?" },
                  { icon: PiggyBank, title: "Zero monthly fees", desc: "No maintenance fees, no overdraft fees, no minimum balance fees." },
                  { icon: Smartphone, title: "Purely digital", desc: "Manage everything from your phone. No paperwork, no branches." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-[#064E3B] shrink-0">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-[#064E3B] mb-2">{item.title}</h4>
                      <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1650989689559-c56d2c622019?q=80&w=1200" 
                alt="Savings growth" 
                className="rounded-[3rem] shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="px-6 py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#064E3B] mb-4">How we compare</h2>
            <p className="text-gray-500 font-bold">The difference is in the details (and your balance).</p>
          </div>

          <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-8 font-black text-[#064E3B] uppercase tracking-widest text-sm">Feature</th>
                  <th className="p-8 font-black text-[#064E3B] uppercase tracking-widest text-sm text-center bg-emerald-50">BankKit</th>
                  <th className="p-8 font-black text-gray-400 uppercase tracking-widest text-sm text-center">Big Banks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { feature: "Savings APY", bankkit: "4.50%", big: "0.01%" },
                  { feature: "Monthly Fee", bankkit: "$0", big: "$12 - $25" },
                  { feature: "Minimum Balance", bankkit: "$0", big: "$1,500+" },
                  { feature: "Early Payday", bankkit: "Included", big: "Rarely" },
                  { feature: "Mobile Experience", bankkit: "Premium", big: "Outdated" }
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="p-8 font-bold text-[#064E3B]">{row.feature}</td>
                    <td className="p-8 text-center bg-emerald-50/30">
                      <span className="inline-flex items-center gap-2 font-black text-emerald-600">
                        {row.bankkit} <CheckCircle2 size={16} />
                      </span>
                    </td>
                    <td className="p-8 text-center font-bold text-gray-400">{row.big}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <motion.div 
          {...fadeIn}
          className="max-w-3xl mx-auto space-y-10"
        >
          <div className="inline-block p-4 bg-emerald-50 rounded-3xl mb-4">
            <PiggyBank size={48} className="text-[#064E3B]" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-[#064E3B] leading-tight">
            Start saving <br /> smarter today.
          </h2>
          <p className="text-xl text-gray-500 font-bold">
            It takes less than 3 minutes to open an account. No paperwork, no hidden fees. Just pure financial growth.
          </p>
          <div className="flex justify-center pt-6">
            <button className="group relative bg-[#064E3B] text-white px-12 py-6 rounded-full font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-[#064E3B]/30 overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                Open Your Account
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
