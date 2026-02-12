import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Lock,
  Eye,
  UserCheck,
  FileText,
  Server,
  ChevronRight,
  ArrowLeft,
  Check
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Security: React.FC = () => {
  const navigate = useNavigate();

  // Scroll animations
  const featuresAnim = useScrollAnimation();
  const processAnim = useScrollAnimation();
  const complianceAnim = useScrollAnimation();
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
      <section className="pt-32 pb-20 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Your security is our priority
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            We use bank-level security and encryption to protect your money and data. Here's how we keep you safe.
          </p>
        </div>
      </section>

      {/* Security Features */}
      <section
        ref={featuresAnim.ref}
        className={`py-20 px-4 transition-all duration-1000 ${
          featuresAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Protection</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">How we protect you</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-green-500 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">256-bit Encryption</h3>
              <p className="text-gray-600 mb-4">
                All your data is encrypted with bank-grade 256-bit AES encryption, the same standard used by major financial institutions.
              </p>
              <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                <Check className="w-4 h-4" />
                Military-grade security
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-blue-500 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Two-Factor Authentication</h3>
              <p className="text-gray-600 mb-4">
                Add an extra layer of security with 2FA. Even if someone has your password, they can't access your account without your second factor.
              </p>
              <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                <Check className="w-4 h-4" />
                SMS & authenticator app support
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-pink-500 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Fraud Monitoring</h3>
              <p className="text-gray-600 mb-4">
                Our AI-powered systems monitor transactions 24/7 to detect and prevent fraudulent activity in real-time.
              </p>
              <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                <Check className="w-4 h-4" />
                24/7 automated monitoring
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-yellow-500 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">FDIC Insured</h3>
              <p className="text-gray-600 mb-4">
                Your deposits are FDIC insured up to $250,000 per depositor, per account category, protecting your money.
              </p>
              <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                <Check className="w-4 h-4" />
                Government backed protection
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-purple-500 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                <Server className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">SOC 2 Certified</h3>
              <p className="text-gray-600 mb-4">
                We're SOC 2 Type II certified, meaning our security controls have been audited by independent third parties.
              </p>
              <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                <Check className="w-4 h-4" />
                Independently verified
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-teal-500 transition-all hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Biometric Security</h3>
              <p className="text-gray-600 mb-4">
                Use Face ID or Touch ID to securely access your account. Your biometric data never leaves your device.
              </p>
              <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                <Check className="w-4 h-4" />
                Device-level security
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        ref={processAnim.ref}
        className={`py-20 px-4 bg-gradient-to-br from-gray-900 to-black text-white transition-all duration-1000 ${
          processAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Process</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">How we keep your data safe</h2>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-lime-400 text-black rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">End-to-End Encryption</h3>
                <p className="text-gray-400 text-lg">
                  From the moment you enter your information, it's encrypted before leaving your device.
                  Your data travels securely through our systems and is stored encrypted at rest.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-lime-400 text-black rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Secure Authentication</h3>
                <p className="text-gray-400 text-lg">
                  We verify your identity with multiple factors including password, 2FA, biometrics,
                  and device fingerprinting to ensure only you can access your account.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-lime-400 text-black rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Continuous Monitoring</h3>
                <p className="text-gray-400 text-lg">
                  Our security team and AI systems work 24/7 to monitor for suspicious activity,
                  potential threats, and unauthorized access attempts.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-lime-400 text-black rounded-full flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Rapid Response</h3>
                <p className="text-gray-400 text-lg">
                  If we detect anything unusual, we'll immediately alert you and take action
                  to protect your account, including temporary locks and verification steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section
        ref={complianceAnim.ref}
        className={`py-20 px-4 bg-gray-50 transition-all duration-1000 ${
          complianceAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Compliance</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">Industry Standards</h2>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
              We meet or exceed all regulatory requirements and industry best practices
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'FDIC', desc: 'Insured' },
              { name: 'SOC 2', desc: 'Type II' },
              { name: 'PCI DSS', desc: 'Certified' },
              { name: 'GDPR', desc: 'Compliant' },
            ].map((cert, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-gray-900 mb-2">{cert.name}</div>
                <div className="text-sm text-gray-600">{cert.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaAnim.ref}
        className={`py-20 px-4 bg-black text-white transition-all duration-1000 ${
          ctaAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to bank securely?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join hundreds of thousands who trust BankKit with their finances
          </p>
          <button
            onClick={() => navigate('/onboarding')}
            className="bg-lime-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-lime-300 transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            Open Your Account
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4 border-t border-gray-800">
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
