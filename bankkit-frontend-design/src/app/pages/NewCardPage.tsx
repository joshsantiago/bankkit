import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  CreditCard, 
  Zap, 
  ShieldCheck, 
  ChevronRight, 
  CheckCircle2, 
  Smartphone, 
  Package, 
  Palette, 
  Info,
  Lock,
  Globe
} from 'lucide-react';

const CARD_STYLES = [
  { id: 'emerald', name: 'Emerald Peak', color: 'bg-[#064E3B]', textColor: 'text-white' },
  { id: 'mint', name: 'Fresh Mint', color: 'bg-[#DCFCE7]', textColor: 'text-[#064E3B]' },
  { id: 'midnight', name: 'Midnight Onyx', color: 'bg-zinc-900', textColor: 'text-white' },
  { id: 'ghost', name: 'Ghost White', color: 'bg-white border-2 border-gray-100', textColor: 'text-[#064E3B]' },
];

export function NewCardPage({ onBack, onComplete }: { onBack: () => void, onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [cardType, setCardType] = useState<'physical' | 'virtual' | null>(null);
  const [selectedStyle, setSelectedStyle] = useState(CARD_STYLES[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 2000);
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => {
    if (step === 1) onBack();
    else setStep(s => s - 1);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={prevStep}
              className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-[#064E3B] transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-black text-[#064E3B]">Get a New Card</h1>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step {step} of 3</p>
            </div>
          </div>
          <button onClick={onBack} className="text-gray-400 font-bold hover:text-red-500 transition-colors">Cancel</button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-[#064E3B]">Choose your card type</h2>
                <p className="text-gray-500 font-medium">Select the card that best fits your spending needs.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => { setCardType('physical'); nextStep(); }}
                  className={`p-8 rounded-[2.5rem] border-2 text-left transition-all group ${
                    cardType === 'physical' ? 'border-[#064E3B] bg-white' : 'border-gray-100 bg-white hover:border-emerald-200'
                  }`}
                >
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Package size={32} />
                  </div>
                  <h3 className="text-xl font-black text-[#064E3B] mb-2">Physical Card</h3>
                  <p className="text-sm font-medium text-gray-500 mb-6">A premium card delivered to your door in 3-5 days. Works everywhere.</p>
                  <ul className="space-y-3">
                    {['Chip & PIN secure', 'Contactless enabled', 'NFC phone payments'].map(feat => (
                      <li key={feat} className="flex items-center gap-2 text-xs font-bold text-[#064E3B]">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </button>

                <button
                  onClick={() => { setCardType('virtual'); nextStep(); }}
                  className={`p-8 rounded-[2.5rem] border-2 text-left transition-all group ${
                    cardType === 'virtual' ? 'border-[#064E3B] bg-white' : 'border-gray-100 bg-white hover:border-emerald-200'
                  }`}
                >
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Zap size={32} />
                  </div>
                  <h3 className="text-xl font-black text-[#064E3B] mb-2">Virtual Card</h3>
                  <p className="text-sm font-medium text-gray-500 mb-6">Instantly generated for immediate use. Best for online subscriptions.</p>
                  <ul className="space-y-3">
                    {['Instant generation', 'Disposable options', 'Online-only safety'].map(feat => (
                      <li key={feat} className="flex items-center gap-2 text-xs font-bold text-[#064E3B]">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-black text-[#064E3B]">Design your card</h2>
                <p className="text-gray-500 font-medium">Choose a color that matches your style.</p>
              </div>

              {/* Card Preview */}
              <div className="perspective-1000 py-10">
                <div className={`relative w-full max-w-sm mx-auto aspect-[1.58/1] rounded-[2rem] ${selectedStyle.color} ${selectedStyle.textColor} p-8 shadow-2xl transition-all duration-500`}>
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-12 h-10 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-lg" />
                    <div className="text-2xl font-black italic">BankKit</div>
                  </div>
                  <div className="space-y-6">
                    <p className="text-2xl font-bold tracking-[0.25em]">•••• •••• •••• ••••</p>
                    <div className="flex justify-between items-end">
                      <p className="font-black tracking-wider uppercase text-xs">Alex Rivera</p>
                      <p className="font-bold text-xs tracking-widest">02/31</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Selection */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CARD_STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style)}
                    className={`flex flex-col items-center gap-3 p-4 rounded-3xl border-2 transition-all ${
                      selectedStyle.id === style.id ? 'border-[#064E3B] bg-white' : 'border-gray-100 bg-white hover:border-emerald-100'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full ${style.color}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#064E3B]">{style.name}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={nextStep}
                className="w-full bg-[#064E3B] text-white py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-2 shadow-xl shadow-[#064E3B]/10"
              >
                Continue to Review <ChevronRight size={24} />
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-[#064E3B]">Review & Confirm</h2>
                <p className="text-gray-500 font-medium">Double-check your selection before we issue your new card.</p>
              </div>

              <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cardType === 'physical' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                      {cardType === 'physical' ? <Package size={24} /> : <Zap size={24} />}
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Card Type</p>
                      <p className="font-black text-[#064E3B] capitalize">{cardType} Card</p>
                    </div>
                  </div>
                  <button onClick={() => setStep(1)} className="text-emerald-600 font-bold text-sm">Edit</button>
                </div>

                <div className="flex items-center justify-between pb-6 border-b border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 text-[#064E3B] flex items-center justify-center">
                      <Palette size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Design</p>
                      <p className="font-black text-[#064E3B]">{selectedStyle.name}</p>
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} className="text-emerald-600 font-bold text-sm">Edit</button>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl text-emerald-700">
                    <ShieldCheck size={20} />
                    <p className="text-xs font-bold leading-relaxed">Your card will be issued with our standard $5,000 daily limit, which you can adjust later.</p>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl text-blue-700">
                    <Info size={20} />
                    <p className="text-xs font-bold leading-relaxed">
                      {cardType === 'physical' 
                        ? 'Shipping is free and your card will arrive at your registered home address.' 
                        : 'Your virtual card will be ready to use immediately for online purchases.'}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleComplete}
                disabled={isSubmitting}
                className={`w-full py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 transition-all ${
                  isSubmitting ? 'bg-gray-100 text-gray-400' : 'bg-[#064E3B] text-white shadow-xl shadow-[#064E3B]/10 hover:scale-[1.02]'
                }`}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-6 h-6 border-4 border-emerald-500 border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    Confirm & Issue Card <ChevronRight size={24} />
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Security Footer */}
      <div className="max-w-3xl mx-auto px-6 pb-12 flex items-center justify-center gap-6 text-gray-400">
        <div className="flex items-center gap-2">
          <Lock size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">SSL Encrypted</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">Global Support</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} />
          <span className="text-[10px] font-black uppercase tracking-widest">Identity Protected</span>
        </div>
      </div>
    </div>
  );
}
