import React from 'react';

export const WelcomeStep: React.FC = () => {
  return (
    <div className="text-center space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Welcome to the Future of Banking
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Digital banking built for today's lifestyle
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-4">💳</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Zero Fees</h3>
          <p className="text-sm text-gray-600">
            No monthly fees, no minimum balance, no hidden charges
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Transfers</h3>
          <p className="text-sm text-gray-600">
            Send money instantly to anyone, anytime, anywhere
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-4">📈</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">High APY</h3>
          <p className="text-sm text-gray-600">
            Earn competitive interest on your savings automatically
          </p>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-8">
        <span>🔒</span>
        <span>Bank-level security • FDIC insured • 256-bit encryption</span>
      </div>
    </div>
  );
};
