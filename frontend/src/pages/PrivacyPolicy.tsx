import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PrivacyPolicy() {
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
          <h1 className="text-5xl font-black">Privacy Policy</h1>
          <p className="text-emerald-200 mt-4 text-lg">Last updated: February 18, 2026</p>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-6 py-16 space-y-12"
      >
        {/* Introduction */}
        <section className="space-y-4">
          <p className="text-gray-600 font-medium leading-relaxed text-lg">
            BankKit ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise process your information in connection with our websites, mobile applications, and other online services that link to this Privacy Policy (collectively, the "Service").
          </p>
        </section>

        {/* 1. Information We Collect */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">1. Information We Collect</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Information You Provide Directly</h3>
              <ul className="space-y-2 ml-6">
                {[
                  'Account registration information (name, email, password, phone number, date of birth)',
                  'Financial information (account numbers, routing numbers, transaction history)',
                  'Identity verification documents (government ID, proof of address)',
                  'Communication preferences and customer service inquiries',
                  'Payment and billing information',
                ].map((item, i) => (
                  <li key={i} className="text-gray-600 font-medium flex items-start gap-3">
                    <span className="text-emerald-600 font-bold mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Information Collected Automatically</h3>
              <ul className="space-y-2 ml-6">
                {[
                  'Device information (IP address, browser type, operating system)',
                  'Usage information (pages visited, links clicked, time spent on pages)',
                  'Location information (approximate location based on IP address)',
                  'Cookies and similar technologies',
                  'Authentication and security logs',
                ].map((item, i) => (
                  <li key={i} className="text-gray-600 font-medium flex items-start gap-3">
                    <span className="text-emerald-600 font-bold mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 2. How We Use Your Information */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">2. How We Use Your Information</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            We use the information we collect for various purposes, including:
          </p>
          <ul className="space-y-3 ml-6">
            {[
              'Providing and improving the Service',
              'Processing transactions and sending related information',
              'Verifying your identity and preventing fraud',
              'Communicating with you about your account',
              'Responding to your inquiries and requests',
              'Sending marketing communications (with your consent)',
              'Complying with legal and regulatory requirements',
              'Monitoring and analyzing usage patterns and trends',
            ].map((item, i) => (
              <li key={i} className="text-gray-600 font-medium flex items-start gap-3">
                <span className="text-emerald-600 font-bold mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 3. How We Share Your Information */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">3. How We Share Your Information</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            We may share your information in the following circumstances:
          </p>
          <ul className="space-y-3 ml-6">
            {[
              'With service providers who assist us in operating the Service',
              'With financial institutions and payment processors',
              'With regulatory authorities and law enforcement',
              'With your consent or at your request',
              'In connection with a business transaction or asset sale',
              'To prevent fraud or security incidents',
              'As required by law or legal process',
            ].map((item, i) => (
              <li key={i} className="text-gray-600 font-medium flex items-start gap-3">
                <span className="text-emerald-600 font-bold mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 4. Data Security */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">4. Data Security</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, and regular security audits. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        {/* 5. Your Privacy Rights */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">5. Your Privacy Rights</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="space-y-3 ml-6">
            {[
              'Access: Request a copy of the personal information we hold about you',
              'Correction: Request that we correct inaccurate information',
              'Deletion: Request that we delete your personal information',
              'Portability: Request a portable copy of your information',
              'Opt-out: Withdraw consent or opt-out of certain processing activities',
            ].map((item, i) => (
              <li key={i} className="text-gray-600 font-medium flex items-start gap-3">
                <span className="text-emerald-600 font-bold mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 6. Cookies and Tracking */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">6. Cookies and Similar Technologies</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            We use cookies, web beacons, and similar technologies to recognize you, understand your preferences, and improve your experience on the Service. You can control cookie preferences through your browser settings, though some features may not function properly if cookies are disabled.
          </p>
        </section>

        {/* 7. Third-Party Links */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">7. Third-Party Links and Services</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            The Service may contain links to third-party websites and services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing your information.
          </p>
        </section>

        {/* 8. Children's Privacy */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">8. Children's Privacy</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            The Service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected information from a child under 13, we will take steps to delete such information and terminate the child's account.
          </p>
        </section>

        {/* 9. Data Retention */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">9. Data Retention</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            We retain your personal information for as long as necessary to provide the Service, comply with legal obligations, resolve disputes, and enforce our agreements. Retention periods may vary depending on the context of processing and our legal obligations.
          </p>
        </section>

        {/* 10. International Data Transfers */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">10. International Data Transfers</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            Your information may be transferred to, stored in, and processed in countries other than your country of residence. These countries may have data protection laws that differ from your home country. By using the Service, you consent to the transfer of your information to countries outside your country of residence.
          </p>
        </section>

        {/* 11. California Privacy Rights */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">11. California Privacy Rights</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA). You have the right to know what personal information is collected, used, shared, or sold, and the right to delete personal information collected from you. To exercise these rights, please contact us at the address below.
          </p>
        </section>

        {/* 12. Changes to Privacy Policy */}
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-[#064E3B]">12. Changes to This Privacy Policy</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, and other factors. We will notify you of material changes by updating the "Last updated" date and, where required, by obtaining your consent.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100 space-y-4">
          <h2 className="text-2xl font-black text-[#064E3B]">Contact Us</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <div className="space-y-2 font-medium text-gray-700">
            <p><span className="font-black">Email:</span> privacy@bankkit.com</p>
            <p><span className="font-black">Phone:</span> +1 (555) 123-4567</p>
            <p><span className="font-black">Address:</span> 123 Finance Street, San Francisco, CA 94105</p>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
