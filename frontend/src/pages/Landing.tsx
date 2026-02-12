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
  Star
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
              <button onClick={() => navigate('/about')} className="text-gray-300 hover:text-white transition-colors">About</button>
              <button onClick={() => navigate('/security')} className="text-gray-300 hover:text-white transition-colors">Security</button>
              <button onClick={() => navigate('/help')} className="text-gray-300 hover:text-white transition-colors">Help</button>
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
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full animate-fade-in-up">
                <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
                <span className="text-sm text-gray-300">Trusted by 500K+ users</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in-up animation-delay-200">
                Digitize your financial
                <span className="block mt-2">future</span>
              </h1>

              <p className="text-xl text-gray-400 max-w-lg animate-fade-in-up animation-delay-400">
                Modern banking designed for today's lifestyle. Zero fees, instant transfers, and high-yield savings.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-600">
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

              <div className="flex items-center gap-8 pt-4 animate-fade-in-up animation-delay-800">
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
              <div className="absolute top-20 left-0 w-80 h-52 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-500 animate-fade-in-right animation-delay-400">
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
              <div className="absolute top-40 left-20 w-80 h-52 bg-gradient-to-br from-pink-500 via-purple-500 to-yellow-500 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 z-10 animate-fade-in-right animation-delay-600">
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
              <div className="absolute top-60 right-0 w-80 h-52 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500 animate-fade-in-right animation-delay-800">
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
              <div className="absolute bottom-20 right-10 bg-white rounded-full px-6 py-3 shadow-2xl flex items-center gap-3 z-20 animate-fade-in animation-delay-1000">
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

      {/* Bento Box Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Features</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              Everything you need in one place
            </h2>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {/* Large Feature 1 - Zero Fees */}
            <div className="md:col-span-3 md:row-span-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl group">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Zero Fees, Forever</h3>
                  <p className="text-white/90 text-lg mb-6">
                    No monthly fees, no minimum balance, no overdraft fees, no hidden charges.
                    Banking should be free, and we mean it.
                  </p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">No Monthly Fees</span>
                  <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">No Minimums</span>
                  <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">No Hidden Costs</span>
                </div>
              </div>
            </div>

            {/* Medium Feature 2 - Instant Transfers */}
            <div className="md:col-span-3 bg-white rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl group">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Instant Transfers</h3>
              <p className="text-gray-600">
                Send money to anyone instantly with just their email or phone. No delays, no waiting periods.
              </p>
            </div>

            {/* Small Feature 3 - High Yield */}
            <div className="md:col-span-2 bg-gradient-to-br from-green-500 to-teal-500 rounded-3xl p-6 text-white hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl group">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">High Yield</h3>
              <p className="text-white/90 text-sm">
                Earn competitive APY on your savings automatically
              </p>
            </div>

            {/* Small Feature 4 - Security */}
            <div className="md:col-span-2 bg-white rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl group">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bank-Level Security</h3>
              <p className="text-gray-600 text-sm">
                256-bit encryption & FDIC insured up to $250K
              </p>
            </div>

            {/* Medium Feature 5 - Analytics */}
            <div className="md:col-span-4 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-3xl p-8 overflow-hidden relative hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl group">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Real-time Analytics</h3>
                </div>
                <p className="text-white/90 mb-6 max-w-md">
                  Track spending patterns, visualize cash flow, and get actionable insights with beautiful charts.
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
              <div className="absolute right-0 bottom-0 w-64 h-48 opacity-30 group-hover:opacity-40 transition-opacity">
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

            {/* Medium Feature 6 - Mobile */}
            <div className="md:col-span-2 bg-gradient-to-br from-lime-400 to-green-500 text-black rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl group">
              <div className="w-12 h-12 bg-black/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mobile First</h3>
              <p className="text-black/80 text-sm mb-4">
                Beautifully designed app for iOS and Android
              </p>
              <div className="flex gap-2">
                <div className="bg-black/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                  4.9★
                </div>
                <div className="bg-black/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                  500K+ Downloads
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              Loved by customers everywhere
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl group">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Switching to BankKit was the best financial decision I made this year.
                Zero fees and instant transfers have saved me so much hassle."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
                <div>
                  <div className="font-bold text-gray-900">Sarah Johnson</div>
                  <div className="text-sm text-gray-500">Freelance Designer</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl group">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "The mobile app is incredibly intuitive. I can manage everything from
                my phone - transfers, budgets, savings goals. It just works."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-red-500"></div>
                <div>
                  <div className="font-bold text-gray-900">Marcus Chen</div>
                  <div className="text-sm text-gray-500">Small Business Owner</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl group">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Finally, a bank that gets it. High APY on savings, beautiful interface,
                and customer support that actually responds. Highly recommend!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500"></div>
                <div>
                  <div className="font-bold text-gray-900">Emily Rodriguez</div>
                  <div className="text-sm text-gray-500">Software Engineer</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">500K+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="about" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Statistics</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
            Get to know more about BankKit
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
            We are customers-focused digital bank that brings together a range of digital financial solutions
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="hover:scale-105 transition-transform duration-300">
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                500K
              </div>
              <p className="text-gray-600">
                BankKit is trusted by over half a million users
              </p>
            </div>

            <div className="hover:scale-105 transition-transform duration-300">
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
                $2.5B
              </div>
              <p className="text-gray-600">
                BankKit has processed over 2.5 billion in transfers
              </p>
            </div>

            <div className="hover:scale-105 transition-transform duration-300">
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
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-black rounded-[3rem] p-12 md:p-16 relative overflow-hidden hover:scale-[1.01] transition-all duration-300">
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
                  <div className="w-64 h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-4 shadow-2xl hover:scale-105 transition-transform duration-300">
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
      <section id="security" className="py-20 px-4 bg-gray-50">
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
            <div className="text-center p-6 bg-white rounded-3xl hover:scale-105 transition-all duration-300 hover:shadow-xl group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">FDIC</div>
              <div className="text-sm text-gray-600">Insured up to $250K</div>
            </div>

            <div className="text-center p-6 bg-white rounded-3xl hover:scale-105 transition-all duration-300 hover:shadow-xl group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">256-bit</div>
              <div className="text-sm text-gray-600">Encryption</div>
            </div>

            <div className="text-center p-6 bg-white rounded-3xl hover:scale-105 transition-all duration-300 hover:shadow-xl group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">2FA</div>
              <div className="text-sm text-gray-600">Two-Factor Auth</div>
            </div>

            <div className="text-center p-6 bg-white rounded-3xl hover:scale-105 transition-all duration-300 hover:shadow-xl group">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">SOC 2</div>
              <div className="text-sm text-gray-600">Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black rounded-[3rem] p-12 text-center hover:scale-[1.01] transition-all duration-300">
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
                <li><button onClick={() => navigate('/security')} className="hover:text-white">Security</button></li>
                <li><a href="#" className="hover:text-white">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button onClick={() => navigate('/about')} className="hover:text-white">About</button></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><button onClick={() => navigate('/help')} className="hover:text-white">Help</button></li>
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

      {/* Animation Keyframes */}
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

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          0% {
            opacity: 0;
            transform: translateX(50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};
