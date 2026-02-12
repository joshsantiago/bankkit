import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Zap,
  TrendingUp,
  Shield,
  BarChart3,
  Smartphone,
  ChevronRight,
  Check,
  Lock,
  Globe,
  Users,
  DollarSign
} from 'lucide-react';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">BankKit</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#security" className="text-gray-300 hover:text-white transition-colors">Security</a>
              <button
                onClick={() => navigate('/login')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/onboarding')}
                className="bg-lime-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-lime-300 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-black text-white pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
                <span className="text-sm text-gray-300">Trusted by 500K+ users</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Digitize your financial
                <span className="block mt-2">future</span>
              </h1>

              <p className="text-xl text-gray-400 max-w-lg">
                Modern banking designed for today's lifestyle. Zero fees, instant transfers, and high-yield savings.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/onboarding')}
                  className="bg-lime-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-lime-300 transition-all hover:scale-105 flex items-center gap-2"
                >
                  Digitize Now
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all">
                  Learn More
                </button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold">500K+</div>
                  <div className="text-sm text-gray-400">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">$2.5B</div>
                  <div className="text-sm text-gray-400">Transferred</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">4.9★</div>
                  <div className="text-sm text-gray-400">App Rating</div>
                </div>
              </div>
            </div>

            {/* Right - Card Mockup */}
            <div className="relative h-[600px] flex items-center justify-center">
              {/* Card 1 - Cyan */}
              <div className="absolute top-20 left-0 w-80 h-52 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                <div className="p-6 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start">
                    <span className="text-2xl font-bold text-white">BankKit</span>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-white/80">Balance</div>
                    <div className="text-3xl font-bold text-white">$12,459.50</div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Gradient Center */}
              <div className="absolute top-40 left-20 w-80 h-52 bg-gradient-to-br from-pink-500 via-purple-500 to-yellow-500 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 z-10">
                <div className="p-6 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start">
                    <span className="text-2xl font-bold text-white">BankKit</span>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-white/80">Savings Account</div>
                    <div className="text-3xl font-bold text-white">$48,392.00</div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Yellow */}
              <div className="absolute top-60 right-0 w-80 h-52 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <div className="p-6 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start">
                    <span className="text-2xl font-bold text-white">BankKit</span>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-white/80">**** 4829</div>
                    <div className="text-lg font-bold text-white">Virtual Card</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-20 right-10 bg-white rounded-full px-6 py-3 shadow-2xl flex items-center gap-3 z-20">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-red-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 border-2 border-white"></div>
                </div>
                <span className="font-bold text-black">500K+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-40 left-20 w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-40 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Features</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              Best features provided by BankKit
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-3xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Zero Fees</h3>
              <p className="text-gray-600">
                No monthly fees, no minimum balance, no hidden charges. Banking should be free.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-3xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Transfers</h3>
              <p className="text-gray-600">
                Send money instantly to anyone, anytime. No waiting, no delays.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-3xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">High Yield</h3>
              <p className="text-gray-600">
                Earn competitive interest on your savings. Your money works harder for you.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-3xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bank-Level Security</h3>
              <p className="text-gray-600">
                256-bit encryption and FDIC insured up to $250K. Your money is protected.
              </p>
            </div>

            {/* Feature 5 - Analytics (Redesigned) */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-3xl p-8 hover:shadow-xl transition-shadow lg:col-span-2 overflow-hidden relative">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Real-time Analytics</h3>
                </div>
                <p className="text-white/90 mb-6 max-w-md">
                  Track your spending patterns, visualize cash flow, and get actionable insights with beautiful charts.
                </p>
                <div className="flex gap-3">
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Smart Budgets
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Spending Alerts
                  </div>
                </div>
              </div>

              {/* Chart Visualization */}
              <div className="absolute right-0 bottom-0 w-64 h-48 opacity-30">
                <svg viewBox="0 0 200 150" className="w-full h-full">
                  <path
                    d="M 0,120 L 40,100 L 80,60 L 120,80 L 160,30 L 200,50"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 0,120 L 40,100 L 80,60 L 120,80 L 160,30 L 200,50 L 200,150 L 0,150 Z"
                    fill="url(#gradient)"
                    opacity="0.3"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Feature 6 - Mobile First (Redesigned) */}
            <div className="bg-gradient-to-br from-lime-400 to-green-500 text-black rounded-3xl p-8 hover:shadow-xl transition-shadow lg:col-span-3 relative overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-black/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold">Mobile-First Experience</h3>
                  </div>
                  <p className="text-black/80 mb-6">
                    Designed from the ground up for mobile. Manage your finances anywhere with our beautifully crafted app.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                      <div className="text-2xl font-bold mb-1">4.9★</div>
                      <div className="text-sm text-black/70">App Store Rating</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                      <div className="text-2xl font-bold mb-1">500K+</div>
                      <div className="text-sm text-black/70">Downloads</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-black/90 transition-colors flex items-center gap-2">
                      <span>App Store</span>
                    </button>
                    <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors flex items-center gap-2">
                      <span>Play Store</span>
                    </button>
                  </div>
                </div>

                {/* Phone Mockup */}
                <div className="relative h-96 flex items-center justify-center">
                  <div className="relative w-64 h-full">
                    {/* Phone Frame */}
                    <div className="absolute inset-0 bg-black rounded-[3rem] shadow-2xl p-3">
                      {/* Screen */}
                      <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                        {/* Status Bar */}
                        <div className="bg-gray-100 h-8 flex items-center justify-between px-6 text-xs">
                          <span>9:41</span>
                          <div className="flex gap-1">
                            <div className="w-4 h-4 bg-black rounded-full"></div>
                          </div>
                        </div>

                        {/* App Content */}
                        <div className="p-4 space-y-4">
                          <div className="text-2xl font-bold">$48,392.00</div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-500 h-20 rounded-2xl"></div>
                            <div className="bg-gradient-to-br from-pink-500 to-red-500 h-20 rounded-2xl"></div>
                            <div className="bg-gradient-to-br from-green-500 to-teal-500 h-20 rounded-2xl col-span-2"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute -right-4 top-20 bg-white rounded-2xl shadow-xl p-3 animate-float">
                      <DollarSign className="w-8 h-8 text-green-500" />
                    </div>
                    <div className="absolute -left-4 bottom-32 bg-white rounded-2xl shadow-xl p-3 animate-float" style={{ animationDelay: '1s' }}>
                      <TrendingUp className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Statistics</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Get to know more about BankKit
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
            We are customers-focused digital bank that brings together a range of digital financial solutions
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                500K
              </div>
              <p className="text-gray-600">
                BankKit is trusted by over half a million users
              </p>
            </div>

            <div>
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
                $2.5B
              </div>
              <p className="text-gray-600">
                BankKit has processed over 2.5 billion in transfers
              </p>
            </div>

            <div>
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                287%
              </div>
              <p className="text-gray-600">
                BankKit's user growth in the last year
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Illustration */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-black rounded-[3rem] p-12 md:p-16 relative overflow-hidden">
            {/* Decorative Stars */}
            <div className="absolute top-10 right-20 text-yellow-400 text-2xl">✦</div>
            <div className="absolute top-32 right-40 text-lime-400 text-lg">✦</div>
            <div className="absolute bottom-20 left-20 text-purple-400 text-xl">✦</div>

            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Meet your banking future
                <span className="block mt-2">starting from now with BankKit</span>
              </h2>

              <button
                onClick={() => navigate('/onboarding')}
                className="bg-lime-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-lime-300 transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                Try BankKit Now
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Phone Mockup */}
              <div className="mt-12">
                <div className="inline-block relative">
                  <div className="w-64 h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-4 shadow-2xl">
                    <div className="w-full h-full bg-gradient-to-br from-pink-500 via-purple-500 to-yellow-500 rounded-[2.5rem] flex items-center justify-center">
                      <div className="text-white text-center">
                        <Smartphone className="w-16 h-16 mx-auto mb-4" />
                        <div className="text-xl font-bold">BankKit</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section id="security" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Trust & Security</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              Bank-level security you can trust
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              Your money and data are protected with the same security used by major financial institutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-3xl hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">FDIC</div>
              <div className="text-sm text-gray-600">Insured up to $250K</div>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-3xl hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">256-bit</div>
              <div className="text-sm text-gray-600">Encryption</div>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-3xl hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">2FA</div>
              <div className="text-sm text-gray-600">Two-Factor Auth</div>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-3xl hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">SOC 2</div>
              <div className="text-sm text-gray-600">Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black rounded-[3rem] p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Connect your finances with BankKit
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join hundreds of thousands of people who trust BankKit for their digital banking needs
            </p>
            <button
              onClick={() => navigate('/onboarding')}
              className="bg-lime-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-lime-300 transition-all hover:scale-105"
            >
              Join BankKit Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">BankKit</div>
              <p className="text-gray-400 text-sm">
                The future of digital banking, available today.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#security" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#about" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">FDIC Insurance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 BankKit. All rights reserved. FDIC Insured.</p>
          </div>
        </div>
      </footer>

      {/* Floating Animation Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
