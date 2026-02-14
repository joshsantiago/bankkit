import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className="bg-white p-8 rounded-[16px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#0066FF]/5 transition-all group"
    >
      <div className="w-12 h-12 rounded-[12px] bg-[#F5F5F7] flex items-center justify-center mb-6 text-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white transition-colors duration-300">
        <Icon size={24} strokeWidth={2} />
      </div>
      <h3 className="text-xl font-bold text-black mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-sm">
        {description}
      </p>
    </motion.div>
  );
}
