import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Users, Heart, Award, ChevronRight, ArrowLeft } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const About: React.FC = () => {
  const navigate = useNavigate();

  // Scroll animations
  const storyAnim = useScrollAnimation();
  const valuesAnim = useScrollAnimation();
  const teamAnim = useScrollAnimation();
  const statsAnim = useScrollAnimation();
  const ctaAnim = useScrollAnimation();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => navigate('/')} className="text-2xl font-bold text-white hover:text-lime-400 transition-colors">
              BankKit
            </button>
            <div className="flex items-center gap-6">
              <button onClick={() => navigate('/')} className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
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
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Banking for the future, built today
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            We're on a mission to make digital banking accessible, transparent, and delightful for everyone.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section
        ref={storyAnim.ref}
        className={`py-20 px-4 transition-all duration-1000 ${
          storyAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">How BankKit began</h2>
          </div>

          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="text-xl leading-relaxed mb-6">
              BankKit was founded in 2020 with a simple belief: banking should be simple, transparent, and work for everyone.
              Traditional banks were stuck in the past with hidden fees, poor mobile experiences, and outdated technology.
            </p>
            <p className="text-xl leading-relaxed mb-6">
              We started with a small team of engineers, designers, and banking experts who shared a vision:
              create a digital bank that people actually love to use. Today, we serve over 500,000 customers
              and have processed over $2.5 billion in transactions.
            </p>
            <p className="text-xl leading-relaxed">
              But we're just getting started. Our mission is to become the world's most customer-loved digital bank,
              one user at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={valuesAnim.ref}
        className={`py-20 px-4 bg-gray-50 transition-all duration-1000 ${
          valuesAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Our Values</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">What we stand for</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-3xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Customer First</h3>
              <p className="text-gray-600">
                Every decision we make starts with our customers. Their success is our success.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Transparency</h3>
              <p className="text-gray-600">
                No hidden fees, no fine print. We believe in honest, straightforward banking.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Inclusivity</h3>
              <p className="text-gray-600">
                Banking should be accessible to everyone, regardless of background or income.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We constantly push boundaries to deliver the best digital banking experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        ref={teamAnim.ref}
        className={`py-20 px-4 transition-all duration-1000 ${
          teamAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Leadership</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">Meet our team</h2>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
              Led by experienced professionals from top fintech and banking companies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Chen', role: 'CEO & Co-Founder', bg: 'from-blue-500 to-purple-500' },
              { name: 'Marcus Johnson', role: 'CTO & Co-Founder', bg: 'from-pink-500 to-red-500' },
              { name: 'Emily Rodriguez', role: 'Head of Product', bg: 'from-green-500 to-teal-500' },
            ].map((member, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 hover:shadow-xl transition-shadow">
                <div className={`w-full h-64 bg-gradient-to-br ${member.bg} rounded-2xl mb-4`}></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsAnim.ref}
        className={`py-20 px-4 bg-black text-white transition-all duration-1000 ${
          statsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">500K+</div>
              <div className="text-gray-400">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">$2.5B</div>
              <div className="text-gray-400">Transactions Processed</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">4.9★</div>
              <div className="text-gray-400">App Store Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaAnim.ref}
        className={`py-20 px-4 bg-gray-50 transition-all duration-1000 ${
          ctaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join us on our journey
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Be part of the future of digital banking. Open your account in minutes.
          </p>
          <button
            onClick={() => navigate('/onboarding')}
            className="bg-lime-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-lime-300 transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            Get Started
            <ChevronRight className="w-5 h-5" />
          </button>
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
                <li><button onClick={() => navigate('/')} className="hover:text-white">Features</button></li>
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
    </div>
  );
};
