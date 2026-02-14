import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CreditCard, 
  Wallet, 
  Building2, 
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Globe,
  Layout
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { LoanCalculator } from '../components/LoanCalculator';

const cardTypes = [
  { name: 'Elite Black', color: 'bg-black', text: 'text-white' },
  { name: 'Mint Pro', color: 'bg-[#DCFCE7]', text: 'text-[#064E3B]' },
  { name: 'Azure Lite', color: 'bg-[#DBEAFE]', text: 'text-[#1E40AF]' },
  { name: 'Lavender Plus', color: 'bg-[#E0E7FF]', text: 'text-[#3730A3]' },
  { name: 'Coral Base', color: 'bg-[#FFEDD5]', text: 'text-[#9A3412]' },
];

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1760111085279-6c4b6d831acc?q=80&w=2000" 
            alt="BankKit Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-[1440px] w-full mx-auto">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[64px] md:text-[84px] font-black text-white leading-[1] mb-8 drop-shadow-lg"
            >
              Take Control of <br />
              <span className="text-[#C6F4D6]">Your Money.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white text-xl md:text-2xl font-semibold mb-12 drop-shadow-md"
            >
              Safe, simple, and smart digital banking all in one place.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <button 
                onClick={() => onNavigate('onboarding')}
                className="bg-[#064E3B] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform"
              >
                Open an Account
              </button>
              <button className="bg-white/20 backdrop-blur-md text-white border-2 border-white/30 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/30 transition-all">
                Explore Cards
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
         <div className="space-y-6">
            <p className="text-[#064E3B] font-bold tracking-widest uppercase text-sm">BankKit is perfect</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Banking Built Around You — Smart, Secure, and Effortless
            </h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              Experience the next generation of financial services. From instant transfers to smart savings, we've built a platform that puts you in the driver's seat.
            </p>
            <button className="bg-[#064E3B] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 group">
              View All Services <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
         </div>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#F5F5F7] p-8 rounded-[32px] space-y-6 flex flex-col justify-between group hover:bg-[#064E3B] transition-all duration-500">
               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#064E3B] group-hover:bg-[#C6F4D6] transition-colors shadow-sm">
                  <CreditCard size={32} />
               </div>
               <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">Debit & Credit Cards</h3>
                  <p className="text-gray-500 text-sm font-medium group-hover:text-white/70 transition-colors">Enjoy cashback, contactless payments, and virtual cards.</p>
               </div>
               <button className="w-full py-3 bg-[#C6F4D6] text-[#064E3B] rounded-xl font-bold text-sm">View All Credit Cards</button>
            </div>
            
            <div className="space-y-6">
               <div className="bg-[#E0E7FF] p-8 rounded-[32px] space-y-4 group hover:shadow-xl transition-all">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#3730A3]">
                     <Wallet size={24} />
                  </div>
                  <h3 className="text-lg font-bold">Personal Savings Account</h3>
                  <p className="text-gray-600 text-xs font-bold uppercase tracking-wider">Easy to open. No minimum balance required.</p>
               </div>
               
               <div className="bg-[#DBEAFE] p-8 rounded-[32px] space-y-4 group hover:shadow-xl transition-all">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#1E40AF]">
                     <Building2 size={24} />
                  </div>
                  <h3 className="text-lg font-bold">Business Banking</h3>
                  <p className="text-gray-600 text-xs font-bold uppercase tracking-wider">Boost your business with smart transfers and quick loans.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Cards Showcase */}
      <section className="bg-gray-50 py-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">Cards That Match Your Style</h2>
          <p className="text-gray-500 font-medium text-lg">Discover our exclusive collection of limited-edition cards.</p>
        </div>
        
        <div className="flex gap-8 px-6 animate-scroll-horizontal">
           <div className="flex gap-8">
              {[...cardTypes, ...cardTypes].map((card, i) => (
                <div key={i} className={`w-[340px] h-[210px] ${card.color} rounded-2xl p-8 flex flex-col justify-between shadow-2xl shrink-0`}>
                   <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                         <div className={`w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center ${card.text}`}>
                            <Layout size={18} />
                         </div>
                         <span className={`font-black text-sm ${card.text}`}>BankKit</span>
                      </div>
                      <div className="w-10 h-6 bg-white/10 rounded-md" />
                   </div>
                   <div className="space-y-4">
                      <div className={`text-xl font-mono tracking-widest ${card.text}`}>•••• •••• •••• 4242</div>
                      <div className="flex justify-between items-end">
                         <div className="space-y-1">
                            <p className={`text-[8px] uppercase font-bold opacity-60 ${card.text}`}>Card Holder</p>
                            <p className={`text-xs font-bold ${card.text}`}>ALEX RIVERA</p>
                         </div>
                         <div className="flex gap-1">
                            <div className="w-6 h-6 rounded-full bg-[#FF4757]/80" />
                            <div className="w-6 h-6 rounded-full bg-[#FFB84D]/80 -ml-3" />
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 3 Easy Steps */}
      <section className="py-24 bg-[#C6F4D6]/30">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col lg:flex-row gap-20 items-center">
           <div className="flex-1 space-y-12">
              <h2 className="text-4xl md:text-5xl font-black text-[#064E3B] leading-tight">
                Get Your Card in Just 3 Easy Steps
              </h2>
              <div className="space-y-12 relative">
                 <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-[#064E3B]/10" />
                 {[
                   { step: '01', title: 'Start for Free', desc: 'Create your free account in minutes — no paperwork needed.' },
                   { step: '02', title: 'Pick Your Card', desc: 'Choose from our range of physical and virtual card designs.' },
                   { step: '03', title: 'Use It Instantly', desc: 'Add to Apple Pay or Google Wallet and start spending right away.' }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-10 group">
                      <div className="relative z-10 w-10 h-10 rounded-full bg-white border-2 border-[#064E3B] text-[#064E3B] flex items-center justify-center font-bold text-sm group-hover:bg-[#064E3B] group-hover:text-white transition-colors">
                        {item.step}
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-2xl font-black text-gray-900">{item.title}</h4>
                        <p className="text-gray-500 font-medium leading-relaxed max-w-sm">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="bg-[#064E3B] text-white px-10 py-5 rounded-full font-bold shadow-xl shadow-[#064E3B]/20">Get My Card Now</button>
           </div>
           
           <div className="flex-1 w-full">
              <div className="bg-[#064E3B] rounded-[40px] aspect-square flex items-center justify-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#C6F4D6_0%,_transparent_70%)] opacity-20" />
                 <motion.div 
                   animate={{ rotateY: [0, 10, 0], y: [0, -20, 0] }}
                   transition={{ repeat: Infinity, duration: 6 }}
                   className="w-2/3 aspect-[1.58/1] bg-gradient-to-br from-[#DCFCE7] to-[#C6F4D6] rounded-2xl shadow-2xl p-10 flex flex-col justify-between"
                 >
                    <div className="flex justify-between items-start">
                       <Layout size={32} className="text-[#064E3B]" />
                       <div className="w-12 h-12 rounded-full border-4 border-white/30" />
                    </div>
                    <div className="space-y-4">
                       <div className="text-3xl font-mono text-[#064E3B] font-black">BankKit</div>
                       <div className="h-2 w-1/2 bg-[#064E3B]/20 rounded" />
                    </div>
                 </motion.div>
              </div>
           </div>
        </div>
      </section>

      {/* Loan Calculator Section */}
      <section className="py-24 max-w-[1440px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">Stay on budget — calculate your monthly loan easily.</h2>
          <p className="text-gray-500 text-lg font-medium">Estimate your monthly payment or loan amount based on total price, trade-in value, down payment, and term.</p>
        </div>
        <LoanCalculator />
      </section>

      {/* Mobile App Showcase */}
      <section className="bg-white py-24 max-w-[1440px] mx-auto px-6 flex flex-col lg:flex-row gap-20 items-center">
         <div className="flex-1 order-2 lg:order-1 relative">
            <div className="relative z-10 rounded-[48px] overflow-hidden border-[12px] border-black shadow-2xl">
               <ImageWithFallback 
                 src="https://images.unsplash.com/photo-1637762163426-5c1283bc0405?q=80&w=800" 
                 alt="People using app" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-[#064E3B]/10 flex items-center justify-center">
                  <div className="w-full h-full bg-white/20 backdrop-blur-sm p-10 flex flex-col gap-6">
                     <div className="flex justify-between items-center">
                        <div className="w-12 h-12 rounded-full bg-white/40" />
                        <div className="bg-[#064E3B] text-white px-4 py-1.5 rounded-full text-xs font-bold">Verified</div>
                     </div>
                     <div className="h-4 w-1/3 bg-white/40 rounded" />
                     <div className="h-10 w-2/3 bg-white/60 rounded-xl" />
                     <div className="grid grid-cols-4 gap-4 pt-10">
                        {[1,2,3,4].map(i => <div key={i} className="aspect-square bg-[#064E3B] rounded-2xl" />)}
                     </div>
                  </div>
               </div>
            </div>
            <div className="absolute -bottom-10 -right-10 bg-[#C6F4D6] p-8 rounded-[32px] shadow-2xl hidden md:block">
               <p className="text-[#064E3B] font-black text-2xl">2.4M+</p>
               <p className="text-[#064E3B]/70 font-bold text-sm uppercase tracking-wider">Active App Users</p>
            </div>
         </div>
         
         <div className="flex-1 space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
               Your finances, <br />
               <span className="text-[#064E3B]">completely in control.</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
               Manage everything from a single dashboard. Track spending, set budgets, and watch your savings grow with real-time insights and AI-powered recommendations.
            </p>
            <div className="space-y-4">
               {[
                 'Real-time spending notifications',
                 'Instant card freezing & security controls',
                 'Automated round-up savings',
                 'Free international transfers'
               ].map((text, i) => (
                 <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#064E3B] text-white flex items-center justify-center">
                       <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="font-bold text-gray-700">{text}</span>
                 </div>
               ))}
            </div>
            <div className="flex gap-4 pt-4">
               <button className="bg-black text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2">
                  App Store
               </button>
               <button className="bg-black text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2">
                  Play Store
               </button>
            </div>
         </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-24 border-t border-gray-100">
         <div className="max-w-[1440px] mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
               <h2 className="text-4xl font-black text-gray-900">Trusted by Millions. Loved for Simplicity.</h2>
               <p className="text-gray-500 font-medium">Real users. Real reviews. See why people everywhere are choosing BankKit.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[1,2,3].map(i => (
                 <div key={i} className="p-8 rounded-[32px] bg-[#F5F5F7] space-y-6">
                    <div className="flex gap-1">
                       {[1,2,3,4,5].map(j => <Zap key={j} size={16} fill="#064E3B" className="text-[#064E3B]" />)}
                    </div>
                    <p className="text-gray-700 font-medium italic">"BankKit has completely transformed how I handle my money. The app is incredibly fast and the customer support is top-notch."</p>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-gray-200" />
                       <div>
                          <p className="font-bold text-[#064E3B]">User Name {i}</p>
                          <p className="text-xs text-gray-400 font-bold">Verified Customer</p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
         <div className="max-w-[1440px] mx-auto bg-[#064E3B] rounded-[48px] p-12 md:p-24 text-center space-y-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_70%)]" />
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight max-w-4xl mx-auto relative z-10">
               Save time. Stay updated. Do it all with powerful tools for free.
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
               <button 
                  onClick={() => onNavigate('onboarding')}
                  className="bg-[#C6F4D6] text-[#064E3B] px-12 py-6 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl shadow-[#C6F4D6]/20"
                >
                  Open Your Account
               </button>
               <button className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-12 py-6 rounded-full font-black text-xl hover:bg-white/20 transition-all">
                  Contact Sales
               </button>
            </div>
         </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-horizontal {
          display: flex;
          animation: scroll-horizontal 30s linear infinite;
        }
        .animate-scroll-horizontal:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
}
