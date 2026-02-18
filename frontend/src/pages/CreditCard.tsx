import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  ShieldCheck,
  Zap,
  Star,
  ArrowRight,
  Wallet,
  Smartphone,
  Globe,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { CardApplicationModal } from '../components/CardApplicationModal';
import { useAuth } from '../context/AuthContext';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export function CreditCardPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      navigate('/onboarding');
    } else {
      setIsModalOpen(true);
    }
  };

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
              <Star size={16} fill="currentColor" />
              <span>Ranked #1 for Student Rewards</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-[#064E3B] leading-[1.1] tracking-tight">
              The card that <span className="text-emerald-500">moves</span> with you.
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
              Unlock the power of your spending with the BankKit Metal Card. No annual fees, unlimited rewards, and built-in security for the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleApplyClick}
                className="bg-[#064E3B] text-white px-10 py-5 rounded-[2rem] font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-[#064E3B]/20"
              >
                Apply in 3 Minutes
              </button>
              <button className="bg-white text-[#064E3B] px-10 py-5 rounded-[2rem] font-bold text-lg hover:bg-gray-50 border border-gray-100 transition-all">
                Compare Cards
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* The Physical Card Visual */}
            <div className="relative z-10 w-full aspect-[1.58/1] bg-[#064E3B] rounded-[2rem] shadow-2xl p-8 overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 blur-3xl rounded-full" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/10 blur-3xl rounded-full" />
              
              <div className="h-full flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <div className="bg-[#DCFCE7]/20 p-3 rounded-xl backdrop-blur-md">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#DCFCE7] to-emerald-400 rounded-lg" />
                  </div>
                  <div className="flex gap-1">
                    <div className="w-8 h-8 rounded-full bg-white/10" />
                    <div className="w-8 h-8 rounded-full bg-white/20 -ml-4" />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="w-16 h-12 bg-gradient-to-r from-yellow-200 to-yellow-500 rounded-md opacity-80" />
                  <div>
                    <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Card Holder</div>
                    <div className="text-white text-2xl font-black tracking-widest">JORDAN WALKER</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* App Visual Peek */}
            <div className="absolute -bottom-10 -right-10 w-48 h-80 bg-white rounded-[2rem] shadow-2xl border-4 border-white overflow-hidden hidden md:block">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1689525515516-2dc16f29b8c1?q=80&w=800" 
                alt="BankKit App" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="px-6 py-32 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black text-[#064E3B]">Built for your lifestyle</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              We've stripped away the complexity of traditional banking and replaced it with features that actually matter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Trophy, 
                title: "2% Cashback", 
                desc: "Unlimited 2% back on all purchases, deposited instantly into your account.",
                color: "bg-amber-50 text-amber-600"
              },
              { 
                icon: ShieldCheck, 
                title: "Zero Liability", 
                desc: "Shop with peace of mind. You're 100% protected against unauthorized charges.",
                color: "bg-blue-50 text-blue-600"
              },
              { 
                icon: Globe, 
                title: "No Foreign Fees", 
                desc: "Traveling? Pay like a local anywhere in the world with zero exchange markups.",
                color: "bg-purple-50 text-purple-600"
              },
              { 
                icon: Zap, 
                title: "Instant Digital", 
                desc: "Apply and start using your digital card in Apple Pay or Google Pay immediately.",
                color: "bg-emerald-50 text-emerald-600"
              }
            ].map((benefit, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2.5rem] bg-[#F8FAFC] border border-gray-50 hover:border-emerald-100 transition-all group"
              >
                <div className={`w-14 h-14 ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <benefit.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-[#064E3B] mb-3">{benefit.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Feature Section */}
      <section className="px-6 py-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto bg-[#064E3B] rounded-[3rem] p-12 lg:p-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="space-y-10">
              <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
                Designed for the <br /> <span className="text-[#DCFCE7]">Modern Collector</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  "Sustainably sourced stainless steel",
                  "Minimalist design with no embossed numbers",
                  "Tap-to-pay enabled with NFC technology",
                  "Laser-etched details for a premium feel"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-white/80 font-bold">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button className="flex items-center gap-3 bg-[#DCFCE7] text-[#064E3B] px-8 py-4 rounded-full font-black hover:scale-105 transition-transform">
                <span>See the Craftsmanship</span>
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl rounded-[3rem] transition-all group-hover:bg-emerald-500/30" />
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1718670013921-2f144aba173a?q=80&w=1200" 
                alt="Metal Card Detail" 
                className="rounded-[2.5rem] shadow-2xl relative z-10 w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-6 py-32">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-[#064E3B] mb-6">Choose your power</h2>
            <p className="text-gray-500 font-medium">Whether you're starting out or building an empire, we have the right card.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Standard Card */}
            <motion.div 
              {...fadeIn}
              className="bg-white p-10 lg:p-14 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="text-2xl font-black text-[#064E3B] mb-2">Essential</h3>
                    <p className="text-gray-500 font-bold">Perfect for daily life</p>
                  </div>
                  <div className="bg-gray-50 text-[#064E3B] px-4 py-2 rounded-xl font-black text-sm">$0/year</div>
                </div>

                <ul className="space-y-6 mb-12">
                  {[
                    { label: "1% Cashback on everything", check: true },
                    { label: "Digital card only", check: true },
                    { label: "Zero hidden fees", check: true },
                    { label: "Personalized alerts", check: true },
                    { label: "Metal card upgrade", check: false },
                    { label: "Concierge service", check: false },
                  ].map((item, i) => (
                    <li key={i} className={`flex items-center gap-4 ${item.check ? 'text-gray-700' : 'text-gray-300'} font-bold`}>
                      <CheckCircle2 size={20} className={item.check ? 'text-emerald-500' : 'text-gray-200'} />
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={handleApplyClick}
                className="w-full py-5 rounded-2xl border-2 border-[#064E3B] text-[#064E3B] font-black hover:bg-[#064E3B] hover:text-white transition-all"
              >
                Select Essential
              </button>
            </motion.div>

            {/* Pro Card */}
            <motion.div 
              {...fadeIn}
              className="bg-[#064E3B] p-10 lg:p-14 rounded-[3rem] shadow-2xl shadow-[#064E3B]/20 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 px-6 py-2 bg-emerald-500 text-white font-black text-sm rounded-bl-2xl">POPULAR</div>
              
              <div>
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">Black Metal</h3>
                    <p className="text-emerald-200/60 font-bold">Premium lifestyle</p>
                  </div>
                  <div className="bg-white/10 text-[#DCFCE7] px-4 py-2 rounded-xl font-black text-sm">$95/year</div>
                </div>

                <ul className="space-y-6 mb-12">
                  {[
                    { label: "2% Cashback on everything", check: true },
                    { label: "Premium Metal Card", check: true },
                    { label: "3% on Travel & Dining", check: true },
                    { label: "Airport Lounge Access", check: true },
                    { label: "Travel Insurance", check: true },
                    { label: "24/7 VIP Support", check: true },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-emerald-50 font-bold">
                      <CheckCircle2 size={20} className="text-emerald-400" />
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={handleApplyClick}
                className="w-full py-5 rounded-2xl bg-[#DCFCE7] text-[#064E3B] font-black hover:scale-105 transition-all shadow-lg shadow-[#DCFCE7]/10"
              >
                Get Metal Card
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <motion.div 
          {...fadeIn}
          className="max-w-4xl mx-auto space-y-10"
        >
          <div className="inline-block p-4 bg-emerald-50 rounded-3xl mb-4">
            <CreditCard size={48} className="text-[#064E3B]" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-[#064E3B] leading-tight">
            Elevate your wallet <br /> today.
          </h2>
          <p className="text-xl text-gray-500 font-bold max-w-2xl mx-auto">
            Join 2M+ members who are building their financial future with BankKit. 
            No credit check required to start with our Essential card.
          </p>
          <div className="flex justify-center pt-6">
            <button
              onClick={handleApplyClick}
              className="group relative bg-[#064E3B] text-white px-12 py-6 rounded-full font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-[#064E3B]/30 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Apply for BankKit Card
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest pt-8">
            Available on iOS and Android
          </p>
        </motion.div>
      </section>

      {/* Card Application Modal */}
      <CardApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userEmail={user?.email || ''}
        firstName={user?.first_name || 'User'}
      />
    </div>
  );
}
