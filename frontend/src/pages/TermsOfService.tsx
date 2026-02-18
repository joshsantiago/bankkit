import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#064E3B] text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-8 hover:gap-3 transition-all text-emerald-200"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          <h1 className="text-5xl font-black">Terms of Service</h1>
          <p className="text-emerald-200 mt-4 text-lg">Last updated: February 18, 2026</p>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-6 py-16 space-y-12"
      >
        {/* 1. Acceptance of Terms */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">1. Acceptance of Terms</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            By accessing and using BankKit ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        {/* 2. Use License */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">2. Use License</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            Permission is granted to temporarily download one copy of the materials (information or software) on BankKit for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="space-y-3 ml-6">
            {[
              'Modifying or copying the materials',
              'Using the materials for any commercial purpose or for any public display',
              'Attempting to decompile or reverse engineer any software contained on BankKit',
              'Removing any copyright or other proprietary notations from the materials',
              'Transferring the materials to another person or "mirroring" the materials on any other server',
              'Accessing or using any portion of the Service for purposes of monitoring its availability, performance, or functionality for any competitive purpose',
            ].map((item, i) => (
              <li key={i} className="text-gray-600 font-medium flex items-start gap-3">
                <span className="text-emerald-600 font-bold mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Account Responsibility */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">3. Account Responsibility</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            You are responsible for maintaining the confidentiality of your account information and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password. You must notify us immediately of any unauthorized use of your account.
          </p>
        </section>

        {/* 4. Acceptable Use */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">4. Acceptable Use Policy</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            You agree not to use the Service to:
          </p>
          <ul className="space-y-3 ml-6">
            {[
              'Harass, threaten, embarrass, or cause distress or discomfort to any person',
              'Violate any laws or regulations',
              'Transmit obscene or offensive content',
              'Engage in fraudulent or deceptive practices',
              'Access unauthorized accounts or systems',
              'Violate any rights of third parties',
            ].map((item, i) => (
              <li key={i} className="text-gray-600 font-medium flex items-start gap-3">
                <span className="text-emerald-600 font-bold mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Financial Transactions */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">5. Financial Transactions</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            BankKit acts as a financial services platform. All financial transactions are subject to applicable federal, state, and local laws. You agree to comply with all applicable laws regarding any transactions made through the Service. BankKit reserves the right to refuse or cancel any transaction.
          </p>
        </section>

        {/* 6. Disclaimer of Warranties */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">6. Disclaimer of Warranties</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            The materials on BankKit are provided on an "as is" basis. BankKit makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        {/* 7. Limitations of Liability */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">7. Limitations of Liability</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            In no event shall BankKit or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BankKit, even if BankKit or an authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        {/* 8. Accuracy of Materials */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">8. Accuracy of Materials</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            The materials appearing on BankKit could include technical, typographical, or photographic errors. BankKit does not warrant that any of the materials on our website are accurate, complete, or current. BankKit may make changes to the materials contained on its website at any time without notice.
          </p>
        </section>

        {/* 9. Links */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">9. Links</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            BankKit has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by BankKit of the site. Use of any such linked website is at the user's own risk.
          </p>
        </section>

        {/* 10. Modifications */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">10. Modifications</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            BankKit may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        {/* 11. Termination */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">11. Termination of Service</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            BankKit reserves the right to terminate your access to the Service at any time, without notice, for conduct that BankKit believes violates these Terms of Service or the law.
          </p>
        </section>

        {/* 12. Governing Law */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">12. Governing Law</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts located in this location.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100 space-y-4">
          <h2 className="text-2xl font-black text-[#064E3B]">Questions?</h2>
          <p className="text-gray-600 font-medium">
            If you have questions about these Terms of Service, please contact our support team at{' '}
            <span className="font-black text-[#064E3B]">support@bankkit.com</span>
          </p>
        </section>
      </motion.div>
    </div>
  );
}
