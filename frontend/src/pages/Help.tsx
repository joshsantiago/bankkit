import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  HelpCircle, 
  Mail, 
  MessageSquare, 
  Phone,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { FAQItem } from '../components/FAQItem';

const categories = [
  { id: 'general', label: 'General', icon: HelpCircle },
  { id: 'accounts', label: 'Accounts', icon: Smartphone },
  { id: 'cards', label: 'Cards', icon: CreditCard },
  { id: 'security', label: 'Security', icon: ShieldCheck },
  { id: 'investing', label: 'Investing', icon: TrendingUp },
];

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="pt-24 bg-[#F5F5F7] min-h-screen">
      {/* Search Header */}
      <section className="bg-white py-24 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 text-center space-y-10">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-6xl font-black text-[#064E3B]"
           >
             How can we help?
           </motion.h1>
           <div className="max-w-3xl mx-auto relative group">
              <div className="absolute inset-y-0 left-8 flex items-center text-gray-400 group-focus-within:text-[#064E3B] transition-colors">
                 <Search size={28} strokeWidth={2.5} />
              </div>
              <input 
                type="text" 
                placeholder="Search for articles, guides, or support topics..."
                className="w-full bg-[#F5F5F7] border-4 border-transparent focus:border-[#C6F4D6] focus:bg-white rounded-[32px] py-6 pl-20 pr-10 text-xl font-medium outline-none transition-all shadow-xl shadow-[#064E3B]/5"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className="flex items-center gap-3 px-8 py-4 bg-white border border-gray-100 rounded-full font-bold text-gray-600 hover:border-[#064E3B] hover:text-[#064E3B] transition-all shadow-sm"
                >
                  <cat.icon size={20} />
                  {cat.label}
                </button>
              ))}
           </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1440px] mx-auto px-6 py-20 flex flex-col lg:flex-row gap-12">
         {/* Articles */}
         <div className="flex-[2] space-y-8">
            <h2 className="text-3xl font-black text-gray-900">Popular Questions</h2>
            <div className="bg-white rounded-[40px] border border-gray-100 p-10 shadow-sm space-y-2">
               {[
                 { q: "How do I open a BankKit account?", a: "Download the app, provide your basic info, and verify your ID. It takes less than 3 minutes." },
                 { q: "When will I get my physical card?", a: "Your card will be shipped within 24 hours and usually arrives in 3-5 business days." },
                 { q: "Are there any hidden fees?", a: "No. BankKit is committed to 100% transparency. No monthly fees, no minimums, no surprises." },
                 { q: "How do I set up direct deposit?", a: "Go to the 'Accounts' tab in the app, select your checking account, and copy your account/routing numbers." }
               ].map((item, i) => (
                 <FAQItem key={i} question={item.q} answer={item.a} />
               ))}
            </div>
         </div>

         {/* Contact Sidebar */}
         <div className="flex-1 space-y-8">
            <div className="bg-[#064E3B] rounded-[40px] p-10 text-white space-y-8 shadow-2xl">
               <h3 className="text-2xl font-black">Still stuck?</h3>
               <p className="text-white/70 font-medium">Our support team is available 24/7 to help you with any issues or questions.</p>
               <div className="space-y-4">
                  {[
                    { icon: MessageSquare, label: "Live Chat", wait: "2 min wait" },
                    { icon: Mail, label: "Email Support", wait: "2 hour reply" },
                    { icon: Phone, label: "Phone Support", wait: "Mon-Fri 9-6" }
                  ].map((item, i) => (
                    <button key={i} className="w-full flex items-center justify-between p-5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl transition-all group">
                       <div className="flex items-center gap-4">
                          <item.icon size={20} />
                          <div className="text-left">
                             <p className="font-bold">{item.label}</p>
                             <p className="text-[10px] text-white/50 uppercase font-black tracking-widest">{item.wait}</p>
                          </div>
                       </div>
                       <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
               </div>
            </div>

            <div className="bg-white rounded-[40px] border border-gray-100 p-10 shadow-sm text-center space-y-6">
               <div className="w-16 h-16 bg-[#DCFCE7] text-[#064E3B] rounded-2xl flex items-center justify-center mx-auto">
                  <FileText size={32} />
               </div>
               <h3 className="text-xl font-black text-gray-900">Developer Docs</h3>
               <p className="text-gray-500 font-medium text-sm">Integrate BankKit with your applications using our powerful API and SDKs.</p>
               <button className="w-full bg-[#F5F5F7] text-[#064E3B] py-4 rounded-xl font-bold hover:bg-[#DCFCE7] transition-colors">
                  View API Reference
               </button>
            </div>
         </div>
      </section>
    </div>
  );
}
