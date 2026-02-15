import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Plus,
  CreditCard,
  ShieldCheck,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Settings,
  Smartphone,
  ShoppingBag,
  Wifi,
  Copy,
  CheckCircle2,
  ChevronRight,
  Zap,
  RefreshCcw,
  Palette,
  Loader2
} from 'lucide-react';
import { cardService } from '../services/cardService';
import type { Card } from '../services/cardService';

// Transform API card to display format
const transformCard = (card: Card) => {
  const isFrozen = card.status === 'Frozen';
  const isDebit = card.cardType === 'Debit';
  
  return {
    id: card.id,
    name: card.name,
    type: card.cardType,
    number: card.cardNumber || '**** **** **** ****',
    expiry: card.expiry || '**/**',
    cvv: card.cvv || '***',
    status: card.status,
    isVirtual: card.isVirtual,
    color: isDebit ? 'bg-[#064E3B]' : (isFrozen ? 'bg-zinc-900' : 'bg-[#DCFCE7]'),
    textColor: isDebit ? 'text-white' : 'text-[#064E3B]',
    brand: card.brand || 'Visa',
    limits: {
      daily: Number(card.dailyLimit) || 5000,
      monthly: Number(card.monthlyLimit) || 20000,
      current: Number(card.currentSpending) || 0,
    },
    raw: card,
  };
};

export const Cards: React.FC = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<ReturnType<typeof transformCard>[]>([]);
  const [selectedCard, setSelectedCard] = useState<ReturnType<typeof transformCard> | null>(null);
  const [showNumbers, setShowNumbers] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setLoading(true);
      const data = await cardService.getCards();
      const transformed = data.map(transformCard);
      setCards(transformed);
      if (transformed.length > 0) {
        setSelectedCard(transformed[0]);
        setIsFrozen(transformed[0].status === 'Frozen');
      }
    } catch (error) {
      console.error('Failed to load cards:', error);
      toast.error('Failed to load cards');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

  const toggleFreeze = async () => {
    if (!selectedCard) return;
    
    try {
      const newStatus = isFrozen ? 'Active' : 'Frozen';
      await cardService.updateCardStatus(selectedCard.id, { status: newStatus });
      toast.success(`Card ${isFrozen ? 'unfrozen' : 'frozen'} successfully`);
      setIsFrozen(!isFrozen);
      loadCards();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update card status');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] lg:ml-80 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-[#064E3B] transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-3xl font-black text-[#064E3B]">My Cards</h1>
                <p className="text-sm font-bold text-gray-400">Manage your physical and virtual cards</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/cards/new')}
              className="bg-[#064E3B] text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-xl shadow-[#064E3B]/10"
            >
              <Plus size={20} />
              New Card
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Card Selection List */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Your Wallet</h3>
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="animate-spin text-emerald-600" size={32} />
                </div>
              ) : cards.length === 0 ? (
                <div className="text-center p-8">
                  <p className="text-gray-400 font-bold">No cards yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cards.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => {
                        setSelectedCard(card);
                        setIsFrozen(card.status === 'Frozen');
                      }}
                      className={`w-full text-left p-6 rounded-[2.5rem] border transition-all relative overflow-hidden group ${
                        selectedCard?.id === card.id
                          ? 'bg-white border-emerald-500 shadow-xl shadow-emerald-500/5 ring-2 ring-emerald-500/10'
                          : 'bg-white border-gray-100 hover:border-emerald-200'
                      }`}
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <div className={`w-14 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${card.color} ${card.textColor}`}>
                          <CreditCard size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-[#064E3B] truncate">{card.name}</p>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            {card.type} ••{card.number.slice(-4)}
                          </p>
                        </div>
                        {card.status === 'Frozen' && (
                          <Lock size={16} className="text-red-400" />
                        )}
                      </div>
                      {card.isVirtual && (
                        <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-100 text-emerald-600 text-[8px] font-black uppercase tracking-tighter rounded-bl-xl">
                          Virtual
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-8 bg-[#DCFCE7] rounded-[2.5rem] border border-emerald-100 space-y-4">
              <div className="flex items-center gap-3 text-[#064E3B]">
                <ShieldCheck size={24} />
                <h4 className="font-black">Safe Shopping</h4>
              </div>
              <p className="text-sm font-bold text-[#064E3B]/70 leading-relaxed">
                Use virtual cards for online subscriptions to keep your primary card details private and secure.
              </p>
              <button className="w-full py-3 bg-[#064E3B] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform">
                Generate Virtual Card
              </button>
            </div>
          </div>

          {/* Card Management Area */}
          <div className="lg:col-span-8 space-y-8">
            {loading ? (
              <div className="flex items-center justify-center p-20">
                <Loader2 className="animate-spin text-emerald-600" size={48} />
              </div>
            ) : !selectedCard ? (
              <div className="text-center p-20">
                <p className="text-gray-400 font-bold text-lg">No cards available</p>
                <p className="text-gray-400 text-sm">Create a new card to get started</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                key={selectedCard.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Physical Card Visual */}
                <div className="relative group">
                  <div className={`relative w-full max-w-md mx-auto aspect-[1.58/1] rounded-[2.5rem] ${selectedCard.color} ${selectedCard.textColor} p-8 shadow-2xl transition-all duration-500 ${isFrozen ? 'opacity-50 grayscale' : ''}`}>
                    {/* Chip & Brand */}
                    <div className="flex justify-between items-start mb-12">
                      <div className="w-12 h-10 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-lg shadow-inner" />
                      <div className="text-2xl font-black italic">{selectedCard.brand}</div>
                    </div>

                    {/* Number */}
                    <div className="space-y-1 mb-8">
                      <p className="text-xs font-bold opacity-50 uppercase tracking-widest">Card Number</p>
                      <p className="text-2xl font-bold tracking-[0.25em] flex items-center gap-2">
                        {showNumbers ? selectedCard.number : `•••• •••• •••• ${selectedCard.number.slice(-4)}`}
                      </p>
                    </div>

                    {/* Expiry & Name */}
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest mb-1">Card Holder</p>
                        <p className="font-black tracking-wider uppercase">Alex Rivera</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest mb-1">Expires</p>
                        <p className="font-bold tracking-widest">{selectedCard.expiry}</p>
                      </div>
                    </div>

                    {/* Frozen Overlay */}
                    {isFrozen && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-[2.5rem] backdrop-blur-[2px]">
                        <div className="bg-white/90 px-6 py-3 rounded-2xl flex items-center gap-3 text-red-600 shadow-xl">
                          <Lock size={20} />
                          <span className="font-black uppercase tracking-widest text-sm">Card Frozen</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Digital Controls */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                    <h4 className="text-lg font-black text-[#064E3B]">Digital Features</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => setShowNumbers(!showNumbers)}
                        className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
                            {showNumbers ? <EyeOff size={20} /> : <Eye size={20} />}
                          </div>
                          <span className="font-bold text-[#064E3B]">{showNumbers ? 'Hide' : 'Show'} card details</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        onClick={() => handleCopy(selectedCard.number)}
                        className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl">
                            <Copy size={20} />
                          </div>
                          <span className="font-bold text-[#064E3B]">Copy card number</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-orange-50 text-orange-500 rounded-xl">
                            <RefreshCcw size={20} />
                          </div>
                          <span className="font-bold text-[#064E3B]">Replace card</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Safety Controls */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                    <h4 className="text-lg font-black text-[#064E3B]">Security</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${isFrozen ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400'}`}>
                            {isFrozen ? <Lock size={20} /> : <Unlock size={20} />}
                          </div>
                          <div>
                            <p className="font-bold text-[#064E3B]">Freeze Card</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Instant block</p>
                          </div>
                        </div>
                        <button
                          onClick={toggleFreeze}
                          className={`w-14 h-8 rounded-full relative transition-colors ${isFrozen ? 'bg-red-500' : 'bg-gray-200'}`}
                        >
                          <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${isFrozen ? 'left-7' : 'left-1'}`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-gray-50 text-gray-400 rounded-xl">
                            <Wifi size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-[#064E3B]">Contactless</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">NFC Payments</p>
                          </div>
                        </div>
                        <button className="w-14 h-8 bg-[#064E3B] rounded-full relative">
                          <div className="absolute top-1 left-7 w-6 h-6 bg-white rounded-full shadow-sm" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-gray-50 text-gray-400 rounded-xl">
                            <ShoppingBag size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-[#064E3B]">Online Spending</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Web transactions</p>
                          </div>
                        </div>
                        <button className="w-14 h-8 bg-[#064E3B] rounded-full relative">
                          <div className="absolute top-1 left-7 w-6 h-6 bg-white rounded-full shadow-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spending Limits */}
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-black text-[#064E3B]">Spending Limits</h4>
                    <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-[#064E3B] transition-colors">
                      <Settings size={20} />
                    </button>
                  </div>

                  <div className="space-y-10">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Daily Limit</p>
                          <p className="text-2xl font-black text-[#064E3B]">
                            ${selectedCard.limits.current.toLocaleString()} <span className="text-gray-300">/ ${selectedCard.limits.daily.toLocaleString()}</span>
                          </p>
                        </div>
                        <p className="text-sm font-bold text-emerald-600">Remaining: ${(selectedCard.limits.daily - selectedCard.limits.current).toLocaleString()}</p>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                          style={{ width: `${(selectedCard.limits.current / selectedCard.limits.daily) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gray-50 rounded-3xl space-y-4 border border-transparent hover:border-emerald-100 transition-colors">
                        <div className="flex items-center gap-3 text-emerald-600">
                          <Zap size={20} />
                          <span className="text-xs font-black uppercase tracking-widest">Quick Increase</span>
                        </div>
                        <p className="text-sm font-bold text-gray-500">Need to make a large purchase? Temporarily increase your limit for 24 hours.</p>
                        <button className="text-emerald-600 font-black text-xs uppercase tracking-widest hover:underline">Request Increase</button>
                      </div>
                      <div className="p-6 bg-gray-50 rounded-3xl space-y-4 border border-transparent hover:border-emerald-100 transition-colors">
                        <div className="flex items-center gap-3 text-blue-600">
                          <Palette size={20} />
                          <span className="text-xs font-black uppercase tracking-widest">Card Design</span>
                        </div>
                        <p className="text-sm font-bold text-gray-500">Change your card color or choose a new physical design for your next replacement.</p>
                        <button className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">Customize</button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Copy Notification */}
      <AnimatePresence>
        {isCopying && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#064E3B] text-white px-8 py-4 rounded-full font-black text-sm shadow-2xl flex items-center gap-3 z-[100]"
          >
            <CheckCircle2 className="text-emerald-400" size={18} />
            Card number copied
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
