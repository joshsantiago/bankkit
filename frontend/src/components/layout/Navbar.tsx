import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Layout } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Features', path: '/features' },
    { label: 'Credit Card', path: '/credit-card' },
    { label: 'Check & Savings', path: '/check-savings' },
    { label: 'About', path: '/about' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="bg-[#064E3B] p-2 rounded-lg transition-transform group-hover:rotate-6">
            <Layout size={20} color="white" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-black tracking-tight text-[#064E3B]">BankKit</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6 mr-4">
            {navItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className={`text-sm font-semibold transition-colors hover:text-[#064E3B] ${
                  location.pathname === item.path ? 'text-[#064E3B]' : 'text-gray-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-bold text-[#064E3B] px-4 py-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/onboarding"
              className="bg-[#064E3B] text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 hover:bg-[#043d2e] shadow-lg shadow-[#064E3B]/10"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 text-[#064E3B]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-2xl lg:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-left text-lg font-bold ${
                    location.pathname === item.path ? 'text-[#064E3B]' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <hr className="border-gray-100 my-2" />
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold text-[#064E3B] text-left"
              >
                Log in
              </Link>
              <Link
                to="/onboarding"
                onClick={() => setIsOpen(false)}
                className="bg-[#064E3B] text-white px-6 py-4 rounded-2xl font-bold text-center"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
