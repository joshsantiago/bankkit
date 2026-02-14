import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Lock,
  Mail,
  ArrowRight,
  Fingerprint,
  ShieldCheck,
  CheckCircle2,
  Key,
  RefreshCw,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState<'login' | 'forgot'>('login');
  const [forgotStep, setForgotStep] = useState(1);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotStep(prev => prev + 1);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* Marketing Side Panel - Hidden on Mobile */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex w-1/2 bg-[#064E3B] p-16 flex-col justify-between relative overflow-hidden"
      >
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1714683991316-dd2a089f3cde?q=80&w=1200" 
            alt="Decoration" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10">
          <button
            onClick={view === 'login' ? () => navigate('/') : () => { setView('login'); setForgotStep(1); }}
            className="flex items-center gap-2 text-[#DCFCE7] font-bold hover:gap-3 transition-all mb-20"
          >
            <ArrowLeft size={20} />
            {view === 'login' ? 'Back to website' : 'Back to sign in'}
          </button>
          
          <div className="space-y-6">
            <h2 className="text-5xl font-black text-white leading-tight">
              {view === 'login' ? (
                <>Welcome back to <br /> <span className="text-[#DCFCE7]">BankKit.</span></>
              ) : (
                <>Recover your <br /> <span className="text-[#DCFCE7]">Access.</span></>
              )}
            </h2>
            <p className="text-emerald-100/60 text-xl font-medium max-w-md leading-relaxed">
              {view === 'login' 
                ? "Your financial future is looking bright. Sign in to manage your high-yield savings, track goals, and more."
                : "Don't worry, it happens to the best of us. Let's get you back into your account securely."
              }
            </p>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="flex gap-4 p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
            <div className="w-12 h-12 bg-[#DCFCE7] text-[#064E3B] rounded-2xl flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-white font-black text-lg">Next-Gen Security</p>
              <p className="text-emerald-100/40 text-sm">Biometric encryption and real-time fraud monitoring active.</p>
            </div>
          </div>
          
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-[#064E3B] bg-emerald-800 overflow-hidden">
                <ImageWithFallback 
                  src={`https://i.pravatar.cc/100?u=${i}`} 
                  alt="User" 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <div className="px-4 flex items-center text-emerald-100/60 text-sm font-bold">
              +12k users online
            </div>
          </div>
        </div>
      </motion.div>

      {/* Login Form Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 overflow-y-auto"
      >
        <div className="w-full max-w-md space-y-12 py-12">
          {/* Mobile Back Button */}
          <button
            onClick={view === 'login' ? () => navigate('/') : () => { setView('login'); setForgotStep(1); }}
            className="lg:hidden flex items-center gap-2 text-gray-500 font-bold mb-8"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          {view === 'login' ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              <div className="text-center lg:text-left space-y-4">
                <div className="inline-flex lg:hidden w-16 h-16 bg-[#064E3B] rounded-2xl items-center justify-center text-[#DCFCE7] mb-4">
                  <Fingerprint size={32} />
                </div>
                <h1 className="text-4xl font-black text-[#064E3B]">Sign in</h1>
                <p className="text-gray-500 font-medium">New to BankKit? <button onClick={() => navigate('/onboarding')} className="text-emerald-600 font-black hover:underline">Create an account</button></p>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-start gap-3">
                  <ShieldAlert className="text-red-600 mt-0.5" size={20} />
                  <p className="text-red-800 font-bold text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-[#064E3B] uppercase tracking-widest px-1">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                      <Mail size={20} />
                    </div>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@university.edu"
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-6 pl-16 rounded-[2rem] outline-none font-bold text-[#064E3B] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between px-1">
                    <label className="text-sm font-black text-[#064E3B] uppercase tracking-widest">Password</label>
                    <button 
                      type="button" 
                      onClick={() => setView('forgot')}
                      className="text-sm font-bold text-gray-400 hover:text-emerald-600"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                      <Lock size={20} />
                    </div>
                    <input 
                      type="password" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-6 pl-16 rounded-[2rem] outline-none font-bold text-[#064E3B] transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 px-1">
                  <input type="checkbox" id="remember" className="w-5 h-5 rounded-lg border-2 border-gray-200 text-emerald-600 focus:ring-emerald-500" />
                  <label htmlFor="remember" className="text-gray-500 font-bold cursor-pointer">Keep me signed in for 30 days</label>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#064E3B] text-white p-6 rounded-[2rem] font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:scale-100"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign in to your account
                      <ArrowRight size={24} />
                    </>
                  )}
                </button>
              </form>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <div className="relative flex justify-center text-sm uppercase">
                  <span className="bg-white px-4 text-gray-400 font-black tracking-widest">or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 p-5 rounded-[1.5rem] border-2 border-gray-50 hover:bg-gray-50 font-bold text-[#064E3B] transition-all">
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                  Google
                </button>
                <button className="flex items-center justify-center gap-3 p-5 rounded-[1.5rem] border-2 border-gray-50 hover:bg-gray-50 font-bold text-[#064E3B] transition-all">
                  <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-5 h-5" />
                  Apple
                </button>
              </div>

              <p className="text-center text-sm text-gray-400 font-medium leading-relaxed">
                By signing in, you agree to our <button className="underline hover:text-emerald-600">Terms of Service</button> and <button className="underline hover:text-emerald-600">Privacy Policy</button>.
              </p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div className="text-center lg:text-left space-y-4">
                <div className="inline-flex w-16 h-16 bg-[#DCFCE7] rounded-2xl items-center justify-center text-[#064E3B] mb-2">
                  {forgotStep === 1 && <Mail size={32} />}
                  {forgotStep === 2 && <RefreshCw size={32} className="animate-spin" />}
                  {forgotStep === 3 && <Key size={32} />}
                  {forgotStep === 4 && <CheckCircle2 size={32} />}
                </div>
                <h1 className="text-4xl font-black text-[#064E3B]">
                  {forgotStep === 1 && "Reset Password"}
                  {forgotStep === 2 && "Check your email"}
                  {forgotStep === 3 && "New Password"}
                  {forgotStep === 4 && "Password Reset!"}
                </h1>
                <p className="text-gray-500 font-medium">
                  {forgotStep === 1 && "Enter your email address and we'll send you a recovery code."}
                  {forgotStep === 2 && <>We sent a code to <span className="text-[#064E3B] font-black">{email || 'your email'}</span>. Enter it below.</>}
                  {forgotStep === 3 && "Create a secure new password for your BankKit account."}
                  {forgotStep === 4 && "Your password has been successfully updated. You can now sign in."}
                </p>
              </div>

              {forgotStep === 1 && (
                <form onSubmit={handleForgotSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-[#064E3B] uppercase tracking-widest px-1">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-6 flex items-center text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                        <Mail size={20} />
                      </div>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@university.edu"
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-6 pl-16 rounded-[2rem] outline-none font-bold text-[#064E3B] transition-all"
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#064E3B] text-white p-6 rounded-[2rem] font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    {isLoading ? <Loader2 size={24} className="animate-spin" /> : "Send Recovery Code"}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setView('login')}
                    className="w-full text-gray-400 font-bold hover:text-[#064E3B] transition-colors"
                  >
                    Return to Login
                  </button>
                </form>
              )}

              {forgotStep === 2 && (
                <form onSubmit={handleForgotSubmit} className="space-y-8">
                  <div className="flex justify-between gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <input 
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-full aspect-square bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white text-center text-2xl font-black text-[#064E3B] rounded-2xl outline-none transition-all"
                        placeholder="•"
                      />
                    ))}
                  </div>
                  <div className="space-y-4">
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#064E3B] text-white p-6 rounded-[2rem] font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                    >
                      {isLoading ? <Loader2 size={24} className="animate-spin" /> : "Verify Code"}
                    </button>
                    <p className="text-center text-gray-400 font-bold text-sm">
                      Didn't receive a code? <button className="text-emerald-600">Resend Code</button>
                    </p>
                  </div>
                </form>
              )}

              {forgotStep === 3 && (
                <form onSubmit={handleForgotSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-[#064E3B] uppercase tracking-widest px-1">New Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-6 flex items-center text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                        <Lock size={20} />
                      </div>
                      <input 
                        type="password" 
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-6 pl-16 rounded-[2rem] outline-none font-bold text-[#064E3B] transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-[#064E3B] uppercase tracking-widest px-1">Confirm New Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-6 flex items-center text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                        <Lock size={20} />
                      </div>
                      <input 
                        type="password" 
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white p-6 pl-16 rounded-[2rem] outline-none font-bold text-[#064E3B] transition-all"
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#064E3B] text-white p-6 rounded-[2rem] font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    {isLoading ? <Loader2 size={24} className="animate-spin" /> : "Update Password"}
                  </button>
                </form>
              )}

              {forgotStep === 4 && (
                <div className="space-y-6">
                  <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl space-y-3">
                    <div className="flex items-center gap-3 text-[#064E3B]">
                      <ShieldAlert size={20} />
                      <p className="font-black">Security Tip</p>
                    </div>
                    <p className="text-sm font-bold text-emerald-800 leading-relaxed">
                      Make sure your new password is unique and not used on other websites. We recommend using a password manager.
                    </p>
                  </div>
                  <button 
                    onClick={() => { setView('login'); setForgotStep(1); }}
                    className="w-full bg-[#064E3B] text-white p-6 rounded-[2rem] font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    Back to Sign In <ArrowRight size={24} />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
