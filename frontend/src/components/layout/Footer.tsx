import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <div className="bg-[#064E3B] p-2 rounded-lg">
                <Layout size={20} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-black tracking-tight text-[#064E3B]">BankKit</span>
            </Link>
            <p className="text-gray-500 text-base leading-relaxed max-w-sm font-medium">
              Empowering your financial future with smart digital tools and seamless banking experiences. Safe, simple, and built for you.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 flex items-center justify-center bg-gray-50 text-[#064E3B] hover:bg-[#064E3B] hover:text-white rounded-full transition-all">
                  <Icon size={18} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#064E3B] mb-8">Solutions</h4>
            <ul className="space-y-4">
              <li><Link to="/check-savings" className="text-sm font-semibold text-gray-500 hover:text-[#064E3B] transition-colors">Check & Savings</Link></li>
              <li><span className="text-sm font-semibold text-gray-500">Business Accounts</span></li>
              <li><Link to="/credit-card" className="text-sm font-semibold text-gray-500 hover:text-[#064E3B] transition-colors">Credit Card</Link></li>
              <li><span className="text-sm font-semibold text-gray-500">Investments</span></li>
              <li><span className="text-sm font-semibold text-gray-500">Loans</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#064E3B] mb-8">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm font-semibold text-gray-500 hover:text-[#064E3B] transition-colors">About Us</Link></li>
              <li><span className="text-sm font-semibold text-gray-500">Careers</span></li>
              <li><Link to="/security" className="text-sm font-semibold text-gray-500 hover:text-[#064E3B] transition-colors">Security</Link></li>
              <li><span className="text-sm font-semibold text-gray-500">Press</span></li>
              <li><span className="text-sm font-semibold text-gray-500">Legal</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#064E3B] mb-8">Help</h4>
            <ul className="space-y-4">
              <li><Link to="/help" className="text-sm font-semibold text-gray-500 hover:text-[#064E3B] transition-colors">Help Center</Link></li>
              <li><Link to="/help" className="text-sm font-semibold text-gray-500 hover:text-[#064E3B] transition-colors">FAQs</Link></li>
              <li><span className="text-sm font-semibold text-gray-500">Contact Support</span></li>
              <li><span className="text-sm font-semibold text-gray-500">Privacy Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm font-semibold text-gray-400">
            © {currentYear} BankKit. All rights reserved. Member FDIC.
          </p>
          <div className="flex gap-10">
            <a href="#" className="text-sm font-bold text-gray-400 hover:text-[#064E3B]">Privacy Policy</a>
            <a href="#" className="text-sm font-bold text-gray-400 hover:text-[#064E3B]">Terms of Service</a>
            <a href="#" className="text-sm font-bold text-gray-400 hover:text-[#064E3B]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
