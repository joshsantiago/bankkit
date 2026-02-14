import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { SecurityPage } from './pages/SecurityPage';
import { HelpPage } from './pages/HelpPage';
import { CreditCardPage } from './pages/CreditCardPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { CheckSavingsPage } from './pages/CheckSavingsPage';
import { LoginPage } from './pages/LoginPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { AccountsPage } from './pages/AccountsPage';
import { CardsPage } from './pages/CardsPage';
import { NewCardPage } from './pages/NewCardPage';
import { SettingsPage } from './pages/SettingsPage';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderPage = () => {
    if (currentPage === 'login') {
      return (
        <LoginPage 
          onBack={() => setCurrentPage('landing')} 
          onCreateAccount={() => setCurrentPage('onboarding')}
          onLogin={() => {
            // Set mock user if none exists
            if (!localStorage.getItem('bankkit_user')) {
              localStorage.setItem('bankkit_user', JSON.stringify({ first_name: 'Alex', last_name: 'Rivera' }));
            }
            setCurrentPage('dashboard');
          }} 
        />
      );
    }

    if (currentPage === 'onboarding') {
      return (
        <OnboardingPage 
          onBack={() => setCurrentPage('landing')} 
          onComplete={(data) => {
            console.log('Onboarding Complete:', data);
            setCurrentPage('dashboard');
          }} 
        />
      );
    }

    if (currentPage === 'dashboard') {
      return (
        <DashboardPage 
          onLogout={() => setCurrentPage('landing')} 
          onViewTransactions={() => setCurrentPage('transactions')}
          onViewAccounts={() => setCurrentPage('accounts')}
          onViewCards={() => setCurrentPage('cards')}
          onViewSecurity={() => setCurrentPage('security')}
          onViewSettings={() => setCurrentPage('settings')}
        />
      );
    }

    if (currentPage === 'transactions') {
      return <TransactionsPage onBack={() => setCurrentPage('dashboard')} />;
    }

    if (currentPage === 'accounts') {
      return <AccountsPage onBack={() => setCurrentPage('dashboard')} />;
    }

    if (currentPage === 'cards') {
      return <CardsPage onBack={() => setCurrentPage('dashboard')} onNewCard={() => setCurrentPage('new-card')} />;
    }

    if (currentPage === 'new-card') {
      return <NewCardPage onBack={() => setCurrentPage('cards')} onComplete={() => setCurrentPage('cards')} />;
    }

    if (currentPage === 'security') {
      return <SecurityPage onBack={() => setCurrentPage('dashboard')} />;
    }

    if (currentPage === 'settings') {
      return <SettingsPage onBack={() => setCurrentPage('dashboard')} />;
    }

    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'security':
        return <SecurityPage />;
      case 'help':
        return <HelpPage />;
      case 'credit-card':
        return <CreditCardPage />;
      case 'features':
        return <FeaturesPage />;
      case 'check-savings':
        return <CheckSavingsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-[#0066FF]/20 selection:text-[#0066FF]">
      {(currentPage !== 'login' && currentPage !== 'onboarding' && currentPage !== 'dashboard' && currentPage !== 'transactions' && currentPage !== 'accounts' && currentPage !== 'cards' && currentPage !== 'new-card' && currentPage !== 'security' && currentPage !== 'settings') && <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />}
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {(currentPage !== 'login' && currentPage !== 'onboarding' && currentPage !== 'dashboard' && currentPage !== 'transactions' && currentPage !== 'accounts' && currentPage !== 'cards' && currentPage !== 'new-card' && currentPage !== 'security' && currentPage !== 'settings') && <Footer onNavigate={setCurrentPage} />}

      {/* Global CSS for some effects */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #d1d1d1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #0066FF;
        }
      `}} />
    </div>
  );
}
