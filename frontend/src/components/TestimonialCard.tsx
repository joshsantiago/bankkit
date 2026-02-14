import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

export function TestimonialCard({ name, role, avatar, quote, rating }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-[#F5F5F7] p-8 rounded-[16px] flex flex-col h-full"
    >
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={`${i < rating ? 'text-[#00D9FF] fill-[#00D9FF]' : 'text-gray-300'}`} 
            strokeWidth={2}
          />
        ))}
      </div>
      <p className="text-black font-medium text-lg leading-relaxed mb-8 flex-grow">
        "{quote}"
      </p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
          <ImageWithFallback 
            src={avatar} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-black text-sm">{name}</h4>
          <p className="text-gray-500 text-xs">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
