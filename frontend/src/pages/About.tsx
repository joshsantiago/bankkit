import React from 'react';
import { motion } from 'motion/react';
import { Target, Heart, Shield, Sparkles, Linkedin, Twitter } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const values = [
  {
    icon: Target,
    title: "Customer Obsession",
    description: "We don't just build features; we solve real financial problems for real people."
  },
  {
    icon: Shield,
    title: "Unwavering Trust",
    description: "Security and transparency aren't features; they are the foundation of everything we do."
  },
  {
    icon: Heart,
    title: "Financial Equality",
    description: "We believe everyone deserves access to world-class financial tools, regardless of their balance."
  },
  {
    icon: Sparkles,
    title: "Bold Innovation",
    description: "We constantly challenge the status quo to define the future of digital banking."
  }
];

export function AboutPage() {
  return (
    <div className="pt-24 bg-white">
      {/* Hero */}
      <section className="max-w-[1440px] mx-auto px-6 py-24 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-2 bg-[#DCFCE7] text-[#064E3B] rounded-full font-black text-sm uppercase tracking-widest mb-4"
        >
          Our Story
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-[#064E3B] leading-tight"
        >
          Better Banking <br /> for the <span className="text-gray-900">NexGen.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-500 text-xl font-medium max-w-3xl mx-auto leading-relaxed"
        >
          BankKit was founded with a single vision: to bridge the gap between traditional reliability and modern technology. We are building the financial infrastructure for a borderless world.
        </motion.p>
      </section>

      {/* Stats */}
      <section className="bg-[#064E3B] py-24">
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Global Users", value: "2.4M+" },
            { label: "Total Volume", value: "$42B+" },
            { label: "Team Size", value: "350+" },
            { label: "Partner Banks", value: "15+" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <p className="text-4xl md:text-5xl font-black text-[#C6F4D6]">{stat.value}</p>
              <p className="text-white/60 font-bold text-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image Grid */}
      <section className="max-w-[1440px] mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
         <div className="space-y-8">
            <h2 className="text-4xl font-black text-gray-900">Driven by Purpose</h2>
            <p className="text-gray-500 text-lg leading-relaxed font-medium">
               The financial world is evolving faster than ever. At BankKit, we embrace this change by creating tools that are not only powerful but also intuitive and accessible. Our team of experts from across the globe works tirelessly to ensure your money works as hard as you do.
            </p>
            <div className="space-y-4">
               {['Licensed & Regulated', 'FDIC Insured Deposits', 'Biometric Security'].map(item => (
                 <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#064E3B] text-white flex items-center justify-center">
                       <Shield size={14} />
                    </div>
                    <span className="font-bold text-gray-800">{item}</span>
                 </div>
               ))}
            </div>
         </div>
         <div className="rounded-[40px] overflow-hidden shadow-2xl">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1769490315622-599d5a8f692a?q=80&w=1200" 
              alt="BankKit Office" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
         </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
             <h2 className="text-4xl font-black text-[#064E3B]">Our Core Values</h2>
             <p className="text-gray-500 font-medium max-w-2xl mx-auto">The principles that guide us every single day as we build the bank of the future.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-[#DCFCE7] text-[#064E3B] flex items-center justify-center mb-8 group-hover:bg-[#064E3B] group-hover:text-white transition-colors duration-500">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 text-center">
         <div className="bg-[#DCFCE7] rounded-[48px] p-16 md:p-24 space-y-10">
            <h2 className="text-4xl md:text-5xl font-black text-[#064E3B]">We are just getting started.</h2>
            <p className="text-[#064E3B]/70 font-bold text-xl max-w-2xl mx-auto">Join a team of visionaries and help us redefine the world of finance. We are hiring across all departments.</p>
            <button className="bg-[#064E3B] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform">
               View Open Positions
            </button>
         </div>
      </section>
    </div>
  );
}
