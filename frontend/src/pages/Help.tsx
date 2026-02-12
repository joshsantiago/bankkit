import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, ArrowLeft, Search, MessageCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const Help: React.FC = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const faqs: FAQItem[] = [
    {
      category: 'Getting Started',
      question: 'How do I open an account?',
      answer: 'Opening an account is simple! Click "Get Started", provide your email and personal information, and you\'ll be set up in minutes. All you need is a valid ID and to be 18 years or older.'
    },
    {
      category: 'Getting Started',
      question: 'Is BankKit a real bank?',
      answer: 'BankKit is a digital banking platform partnered with FDIC-insured banks. Your deposits are FDIC insured up to $250,000, giving you the same protection as traditional banks.'
    },
    {
      category: 'Getting Started',
      question: 'What do I need to sign up?',
      answer: 'You\'ll need a valid government-issued ID, your Social Security number, and a way to verify your identity. The entire process takes less than 5 minutes.'
    },
    {
      category: 'Accounts',
      question: 'What types of accounts can I open?',
      answer: 'We offer Checking accounts for everyday spending, Savings accounts with high-yield APY, or both! You can easily transfer money between your accounts instantly.'
    },
    {
      category: 'Accounts',
      question: 'Are there any fees?',
      answer: 'No! BankKit has zero monthly fees, no minimum balance requirements, and no hidden charges. We believe banking should be free.'
    },
    {
      category: 'Accounts',
      question: 'Can I have multiple accounts?',
      answer: 'Yes! You can open multiple checking and savings accounts to organize your money however you like - emergency fund, vacation savings, etc.'
    },
    {
      category: 'Security',
      question: 'How secure is my money?',
      answer: 'Your money is protected by bank-level 256-bit encryption, FDIC insurance up to $250,000, two-factor authentication, and 24/7 fraud monitoring. We take security very seriously.'
    },
    {
      category: 'Security',
      question: 'What if I lose my phone?',
      answer: 'Immediately log into your account from another device and enable security mode, or call our support line. We can temporarily lock your account until you regain access.'
    },
    {
      category: 'Security',
      question: 'Do you sell my data?',
      answer: 'Never. We will never sell your personal information or transaction data to third parties. Your privacy is paramount to us.'
    },
    {
      category: 'Transfers',
      question: 'How do I transfer money?',
      answer: 'You can send money instantly to other BankKit users with just their email or phone number. For external transfers, link your external bank account and transfers typically complete in 1-2 business days.'
    },
    {
      category: 'Transfers',
      question: 'Are transfers instant?',
      answer: 'Transfers between BankKit accounts are instant. External transfers via ACH take 1-2 business days. We also support wire transfers for same-day delivery.'
    },
    {
      category: 'Transfers',
      question: 'Is there a transfer limit?',
      answer: 'Daily limits vary by account type and history. New accounts start with a $1,000 daily limit, which increases as you use your account. Contact support to request higher limits.'
    },
    {
      category: 'Cards',
      question: 'Do I get a debit card?',
      answer: 'Yes! Every checking account comes with a free virtual debit card instantly, and a physical card will be mailed to you within 5-7 business days.'
    },
    {
      category: 'Cards',
      question: 'Can I use my card internationally?',
      answer: 'Absolutely! Your BankKit card works anywhere Visa/Mastercard is accepted worldwide, with no foreign transaction fees.'
    },
    {
      category: 'Cards',
      question: 'What if my card is stolen?',
      answer: 'You can instantly freeze your card in the app, then report it stolen. We\'ll send you a replacement card immediately and you\'re protected from fraudulent charges.'
    }
  ];

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      <section className="pt-32 pb-12 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            How can we help?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to common questions or contact our support team
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg"
            />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 px-4 bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No results found. Try a different search term.</p>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-500 transition-all overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                        {faq.category}
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {faq.question}
                      </div>
                    </div>
                    <div className="ml-4">
                      {openIndex === index ? (
                        <ChevronDown className="w-6 h-6 text-blue-600" />
                      ) : (
                        <ChevronRight className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {openIndex === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-black to-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-lime-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Still need help?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Our support team is available 24/7 to help you with any questions
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-lime-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-lime-300 transition-all hover:scale-105">
              Chat with Support
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all">
              Email Us
            </button>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-2xl font-bold mb-2">24/7</div>
              <div className="text-gray-400">Support Available</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-2xl font-bold mb-2">&lt; 2 min</div>
              <div className="text-gray-400">Average Response</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-2xl font-bold mb-2">98%</div>
              <div className="text-gray-400">Satisfaction Rate</div>
            </div>
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
