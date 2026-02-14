import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Lock, 
  Mail, 
  User, 
  Calendar, 
  Phone, 
  Wallet,
  Loader2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface OnboardingPageProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

type OnboardingData = {
  email: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
  dateOfBirth?: string;
  phone?: string;
  accountType: 'checking' | 'savings' | 'both' | '';
};

export function OnboardingPage({ onComplete, onBack }: OnboardingPageProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedAccount, setGeneratedAccount] = useState('');
  
  const { 
    register, 
    handleSubmit, 
    watch, 
    trigger,
    formState: { errors, isValid },
    getValues
  } = useForm<OnboardingData>({
    mode: 'onBlur',
    defaultValues: {
      accountType: ''
    }
  });

  const watchPassword = watch('password');
  const watchAccountType = watch('accountType');

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { label: '', color: 'bg-gray-200', width: '0%' };
    if (pwd.length < 6) return { label: 'Weak', color: 'bg-red-400', width: '33%' };
    if (pwd.length < 10) return { label: 'Medium', color: 'bg-yellow-400', width: '66%' };
    return { label: 'Strong', color: 'bg-emerald-500', width: '100%' };
  };

  const strength = getPasswordStrength(watchPassword || '');

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 2) fieldsToValidate = ['email', 'password', 'confirmPassword'];
    if (step === 3) fieldsToValidate = ['first_name', 'last_name'];
    if (step === 4) fieldsToValidate = ['accountType'];

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid || step === 1) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const onSubmit = async (data: OnboardingData) => {
    setIsLoading(true);
    // Simulate API Call
    setTimeout(() => {
      const accNum = Math.floor(1000000000 + Math.random() * 9000000000).toString();
      setGeneratedAccount(accNum);
      setIsLoading(false);
      setStep(5);
      
      // Store in local storage as requested
      localStorage.setItem('bankkit_token', 'mock-jwt-token-' + Math.random());
      localStorage.setItem('bankkit_user', JSON.stringify({
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        accountNumber: accNum
      }));
    }, 2000);
  };

  const progress = (step / 5) * 100;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Header / Progress */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button 
            onClick={step === 1 ? onBack : prevStep}
            className="p-2 hover:bg-gray-50 rounded-full text-gray-400 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          
          <div className="flex flex-col items-center">
            <span className="text-xs font-black text-[#064E3B] uppercase tracking-widest mb-1">Step {step} of 5</span>
            <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-emerald-500 rounded-full"
              />
            </div>
          </div>

          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center space-y-8"
              >
                <div className="w-24 h-24 bg-[#DCFCE7] text-[#064E3B] rounded-[2rem] flex items-center justify-center mx-auto">
                  <ShieldCheck size={48} />
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-black text-[#064E3B]">Welcome to BankKit.</h1>
                  <p className="text-xl text-gray-500 font-medium leading-relaxed">
                    Let's get your account set up in just a few minutes. You're about to experience banking built for the next generation.
                  </p>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-[#064E3B] text-white py-6 rounded-[2rem] font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#064E3B]/20"
                >
                  Get Started <ArrowRight size={24} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-[#064E3B]">Create your credentials</h2>
                  <p className="text-gray-500 font-medium">Use a strong password to protect your wealth.</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-[#064E3B] uppercase tracking-widest px-1">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-6 flex items-center text-gray-400">
                        <Mail size={20} />
                      </div>
                      <input 
                        {...register('email', { 
                          required: "Please enter a valid email address",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please enter a valid email address"
                          }
                        })}
                        placeholder="name@university.edu"
                        className={`w-full bg-white border-2 p-6 pl-16 rounded-[2rem] outline-none font-bold transition-all ${errors.email ? 'border-red-200 focus:border-red-400' : 'border-gray-100 focus:border-emerald-500'}`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm font-bold px-4">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-[#064E3B] uppercase tracking-widest px-1">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-6 flex items-center text-gray-400">
                        <Lock size={20} />
                      </div>
                      <input 
                        type="password"
                        {...register('password', { 
                          required: "Password must be at least 8 characters",
                          minLength: { value: 8, message: "Password must be at least 8 characters" }
                        })}
                        placeholder="••••••••"
                        className={`w-full bg-white border-2 p-6 pl-16 rounded-[2rem] outline-none font-bold transition-all ${errors.password ? 'border-red-200 focus:border-red-400' : 'border-gray-100 focus:border-emerald-500'}`}
                      />
                    </div>
                    {watchPassword && (
                      <div className="px-4 space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
                          <span className="text-gray-400">Strength</span>
                          <span className={strength.color.replace('bg-', 'text-')}>{strength.label}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-500 ${strength.color}`} style={{ width: strength.width }} />
                        </div>
                      </div>
                    )}
                    {errors.password && <p className="text-red-500 text-sm font-bold px-4">{errors.password.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-[#064E3B] uppercase tracking-widest px-1">Confirm Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-6 flex items-center text-gray-400">
                        <Lock size={20} />
                      </div>
                      <input 
                        type="password"
                        {...register('confirmPassword', { 
                          required: "Passwords do not match",
                          validate: (val) => val === watchPassword || "Passwords do not match"
                        })}
                        placeholder="••••••••"
                        className={`w-full bg-white border-2 p-6 pl-16 rounded-[2rem] outline-none font-bold transition-all ${errors.confirmPassword ? 'border-red-200 focus:border-red-400' : 'border-gray-100 focus:border-emerald-500'}`}
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm font-bold px-4">{errors.confirmPassword.message}</p>}
                  </div>
                </div>

                <button 
                  onClick={nextStep}
                  className="w-full bg-[#064E3B] text-white py-6 rounded-[2rem] font-black text-xl transition-all flex items-center justify-center gap-3"
                >
                  Next <ChevronRight size={24} />
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-[#064E3B]">Personal Details</h2>
                  <p className="text-gray-500 font-medium">Help us get to know you better.</p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-[#064E3B] uppercase tracking-widest px-1">First Name</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-6 flex items-center text-gray-400">
                          <User size={20} />
                        </div>
                        <input 
                          {...register('first_name', { 
                            required: "First name must be at least 2 characters",
                            minLength: { value: 2, message: "First name must be at least 2 characters" }
                          })}
                          placeholder="Jane"
                          className={`w-full bg-white border-2 p-6 pl-16 rounded-[2rem] outline-none font-bold transition-all ${errors.first_name ? 'border-red-200 focus:border-red-400' : 'border-gray-100 focus:border-emerald-500'}`}
                        />
                      </div>
                      {errors.first_name && <p className="text-red-500 text-sm font-bold px-4">{errors.first_name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black text-[#064E3B] uppercase tracking-widest px-1">Last Name</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-6 flex items-center text-gray-400">
                          <User size={20} />
                        </div>
                        <input 
                          {...register('last_name', { 
                            required: "Last name must be at least 2 characters",
                            minLength: { value: 2, message: "Last name must be at least 2 characters" }
                          })}
                          placeholder="Doe"
                          className={`w-full bg-white border-2 p-6 pl-16 rounded-[2rem] outline-none font-bold transition-all ${errors.last_name ? 'border-red-200 focus:border-red-400' : 'border-gray-100 focus:border-emerald-500'}`}
                        />
                      </div>
                      {errors.last_name && <p className="text-red-500 text-sm font-bold px-4">{errors.last_name.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-[#064E3B] uppercase tracking-widest px-1">Date of Birth (Optional)</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-6 flex items-center text-gray-400">
                        <Calendar size={20} />
                      </div>
                      <input 
                        type="date"
                        {...register('dateOfBirth')}
                        className="w-full bg-white border-2 border-gray-100 focus:border-emerald-500 p-6 pl-16 rounded-[2rem] outline-none font-bold transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-[#064E3B] uppercase tracking-widest px-1">Phone Number (Optional)</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-6 flex items-center text-gray-400">
                        <Phone size={20} />
                      </div>
                      <input 
                        type="tel"
                        {...register('phone')}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-white border-2 border-gray-100 focus:border-emerald-500 p-6 pl-16 rounded-[2rem] outline-none font-bold transition-all"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={nextStep}
                  className="w-full bg-[#064E3B] text-white py-6 rounded-[2rem] font-black text-xl transition-all flex items-center justify-center gap-3"
                >
                  Next <ChevronRight size={24} />
                </button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-[#064E3B]">Choose Account Type</h2>
                  <p className="text-gray-500 font-medium">Select how you want to start banking with us.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { id: 'checking', title: 'Checking Account', desc: 'Daily spending with early payday and zero fees.' },
                    { id: 'savings', title: 'Savings Account', desc: 'High-yield 4.50% APY to grow your wealth fast.' },
                    { id: 'both', title: 'Checking & Savings', desc: 'The complete BankKit experience. Recommended.' }
                  ].map((type) => (
                    <label 
                      key={type.id}
                      className={`block p-6 rounded-[2rem] border-2 cursor-pointer transition-all ${watchAccountType === type.id ? 'border-emerald-500 bg-emerald-50 shadow-lg' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${watchAccountType === type.id ? 'bg-[#064E3B] text-white' : 'bg-gray-50 text-gray-400'}`}>
                            <Wallet size={24} />
                          </div>
                          <div>
                            <p className="font-black text-[#064E3B]">{type.title}</p>
                            <p className="text-sm text-gray-500 font-medium">{type.desc}</p>
                          </div>
                        </div>
                        <input 
                          type="radio" 
                          value={type.id}
                          {...register('accountType', { required: "Please select an account type" })}
                          className="w-6 h-6 text-emerald-600 focus:ring-emerald-500"
                        />
                      </div>
                    </label>
                  ))}
                  {errors.accountType && <p className="text-red-500 text-sm font-bold px-4">{errors.accountType.message}</p>}
                </div>

                <button 
                  onClick={handleSubmit(onSubmit)}
                  disabled={isLoading || !watchAccountType}
                  className="w-full bg-[#064E3B] text-white py-6 rounded-[2rem] font-black text-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={24} />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account <ArrowRight size={24} />
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-10"
              >
                <div className="relative inline-block">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10, stiffness: 100 }}
                    className="w-24 h-24 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto"
                  >
                    <CheckCircle2 size={56} />
                  </motion.div>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-4 bg-emerald-500 rounded-[3rem] -z-10"
                  />
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-5xl font-black text-[#064E3B]">You're all set, {getValues('first_name')}!</h1>
                  <p className="text-xl text-gray-500 font-medium leading-relaxed">
                    Welcome to the family. Your account has been created successfully and is ready for your first deposit.
                  </p>
                </div>

                <div className="bg-[#DCFCE7] p-8 rounded-[2.5rem] border border-emerald-100">
                  <p className="text-xs font-black text-[#064E3B] uppercase tracking-[0.2em] mb-2 opacity-60">Your Account Number</p>
                  <p className="text-3xl font-black text-[#064E3B] tracking-[0.1em]">{generatedAccount}</p>
                </div>

                <button 
                  onClick={() => onComplete(getValues())}
                  className="w-full bg-[#064E3B] text-white py-6 rounded-[2rem] font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#064E3B]/20"
                >
                  Start Banking <ArrowRight size={24} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
