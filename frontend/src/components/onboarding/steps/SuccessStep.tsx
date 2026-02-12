import React, { useEffect, useState } from 'react';

interface SuccessStepProps {
  firstName: string;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ firstName }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Generate a mock account number for display
  const accountNumber = `****-****-****-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="text-center space-y-8 relative">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {['🎉', '🎊', '✨', '⭐', '💫'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce-slow">
          <div className="text-5xl">✓</div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Welcome, {firstName}! 🎉
        </h1>
        <p className="text-xl text-gray-600">
          Your account is ready to use
        </p>
      </div>

      {/* Account Info Card */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 max-w-md mx-auto shadow-lg">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Account Number</p>
            <p className="text-2xl font-mono font-bold text-gray-900">{accountNumber}</p>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">Your digital banking journey starts now!</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-3xl mb-2">💵</div>
          <p className="text-sm font-medium text-gray-900">Add Funds</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-3xl mb-2">👥</div>
          <p className="text-sm font-medium text-gray-900">Invite Friend</p>
        </div>
      </div>

      {/* Add confetti animation styles */}
      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
