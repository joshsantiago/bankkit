import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Loader } from 'lucide-react';
import { cardService } from '../services/cardService';
import { toast } from 'sonner';

interface CardApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  userEmail: string;
  firstName: string;
}

type CardTier = 'essential' | 'metal';

export function CardApplicationModal({
  isOpen,
  onClose,
  onSuccess,
  userEmail,
  firstName,
}: CardApplicationModalProps) {
  const [selectedTier, setSelectedTier] = useState<CardTier | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const tiers = {
    essential: {
      name: 'Essential',
      price: '$0/year',
      cashback: '1% Cashback',
      features: [
        '1% Cashback on everything',
        'Digital card only',
        'Zero hidden fees',
        'Personalized alerts',
      ],
      limits: { daily: 2500, monthly: 10000 },
      color: 'from-emerald-50',
    },
    metal: {
      name: 'Black Metal',
      price: '$95/year',
      cashback: '2% Cashback',
      features: [
        '2% Cashback on everything',
        'Premium Metal Card',
        '3% on Travel & Dining',
        'Airport Lounge Access',
        'Travel Insurance',
        '24/7 VIP Support',
      ],
      limits: { daily: 5000, monthly: 20000 },
      color: 'from-[#064E3B]',
    },
  };

  const generateCardNumber = (): string => {
    const prefix = '4242';
    const randomDigits = Math.floor(Math.random() * 100000000000000)
      .toString()
      .padStart(12, '0');
    return prefix + randomDigits;
  };

  const generateExpiryDate = (): string => {
    const now = new Date();
    const year = (now.getFullYear() + 4) % 100;
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${month}/${year}`;
  };

  const generateCVV = (): string => {
    return String(Math.floor(100 + Math.random() * 900));
  };

  const handleApply = async () => {
    if (!selectedTier) return;

    setIsLoading(true);
    try {
      const tier = tiers[selectedTier];
      const cardData = {
        name: `BankKit ${tier.name} Card`,
        cardNumber: generateCardNumber(),
        expiry: generateExpiryDate(),
        cvv: generateCVV(),
        brand: 'Visa' as const,
        cardType: 'Credit' as const,
        isVirtual: true,
        dailyLimit: tier.limits.daily,
        monthlyLimit: tier.limits.monthly,
      };

      await cardService.createCard(cardData);
      setShowSuccess(true);
      toast.success(`${tier.name} card created successfully!`);

      // Close modal after showing success
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        onSuccess?.();
      }, 2000);
    } catch (error) {
      console.error('Failed to create card:', error);
      toast.error('Failed to create card. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-black text-[#064E3B]">
                  {showSuccess ? 'Card Created!' : 'Choose Your Card'}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                {showSuccess ? (
                  // Success State
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6"
                  >
                    <div className="flex justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.6 }}
                      >
                        <CheckCircle2
                          size={64}
                          className="text-emerald-500"
                          fill="currentColor"
                        />
                      </motion.div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-[#064E3B] mb-2">
                        All set, {firstName}!
                      </h3>
                      <p className="text-gray-500 font-medium">
                        Your card has been created and is ready to use. You can
                        view it in your Cards section.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  // Selection State
                  <div className="space-y-6">
                    <p className="text-gray-500 font-medium">
                      Select the card that fits your lifestyle:
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      {Object.entries(tiers).map(([key, tier]) => (
                        <motion.button
                          key={key}
                          onClick={() => setSelectedTier(key as CardTier)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
                            selectedTier === key
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 bg-white hover:border-emerald-200'
                          }`}
                        >
                          {/* Selection indicator */}
                          <div className="absolute top-4 right-4">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                selectedTier === key
                                  ? 'border-emerald-500 bg-emerald-500'
                                  : 'border-gray-300'
                              }`}
                            >
                              {selectedTier === key && (
                                <div className="w-2 h-2 bg-white rounded-full" />
                              )}
                            </div>
                          </div>

                          <h3 className="text-xl font-black text-[#064E3B] mb-1">
                            {tier.name}
                          </h3>
                          <p className="text-emerald-600 font-bold text-sm mb-4">
                            {tier.price}
                          </p>

                          <div className="space-y-2 mb-4">
                            <p className="text-sm font-bold text-gray-600">
                              {tier.cashback}
                            </p>
                            <ul className="space-y-2">
                              {tier.features.slice(0, 3).map((feature, i) => (
                                <li
                                  key={i}
                                  className="text-xs text-gray-500 font-medium flex items-center gap-2"
                                >
                                  <span className="w-1 h-1 bg-emerald-500 rounded-full" />
                                  {feature}
                                </li>
                              ))}
                              {tier.features.length > 3 && (
                                <li className="text-xs text-gray-400 font-medium">
                                  +{tier.features.length - 3} more
                                </li>
                              )}
                            </ul>
                          </div>

                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Limits: ${tier.limits.daily}/day •${' '}
                            ${tier.limits.monthly}/month
                          </p>
                        </motion.button>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleApply}
                        disabled={!selectedTier || isLoading}
                        className="flex-1 py-3 rounded-xl bg-[#064E3B] text-white font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <Loader size={18} className="animate-spin" />
                            Creating...
                          </>
                        ) : (
                          'Create Card'
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
