import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PublicLayout } from './components/layout/PublicLayout';
import { PageTransition } from './components/PageTransition';
import { LandingPage as Landing } from './pages/Landing';
import { AboutPage as About } from './pages/About';
import { SecurityPage as Security } from './pages/Security';
import { HelpPage as Help } from './pages/Help';
import { FeaturesPage as Features } from './pages/Features';
import { CreditCardPage as CreditCard } from './pages/CreditCard';
import { CheckSavingsPage as CheckSavings } from './pages/CheckSavings';
import { LoginPage as Login } from './pages/Login';
import { Register } from './pages/Register';
import { OnboardingPage as Onboarding } from './pages/Onboarding';
import { TermsOfService } from './pages/TermsOfService';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Dashboard } from './pages/Dashboard';
import { Accounts } from './pages/Accounts';
import { Transactions } from './pages/Transactions';
import { Cards } from './pages/Cards';
import { Settings } from './pages/Settings';
import { Transfer } from './pages/Transfer';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminAccounts } from './pages/admin/AdminAccounts';

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
            {/* Public routes */}
            <Route path="/" element={<PageTransition><PublicLayout><Landing /></PublicLayout></PageTransition>} />
            <Route path="/about" element={<PageTransition><PublicLayout><About /></PublicLayout></PageTransition>} />
            <Route path="/help" element={<PageTransition><PublicLayout><Help /></PublicLayout></PageTransition>} />
            <Route path="/features" element={<PageTransition><PublicLayout><Features /></PublicLayout></PageTransition>} />
            <Route path="/credit-card" element={<PageTransition><PublicLayout><CreditCard /></PublicLayout></PageTransition>} />
            <Route path="/check-savings" element={<PageTransition><PublicLayout><CheckSavings /></PublicLayout></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
            <Route path="/onboarding" element={<PageTransition><Onboarding /></PageTransition>} />
            <Route path="/terms" element={<PageTransition><TermsOfService /></PageTransition>} />
            <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                </PageTransition>
              }
            />
            <Route
              path="/accounts"
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <Accounts />
                  </ProtectedRoute>
                </PageTransition>
              }
            />
            <Route
              path="/transactions"
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <Transactions />
                  </ProtectedRoute>
                </PageTransition>
              }
            />
            <Route
              path="/transfer"
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <Transfer />
                  </ProtectedRoute>
                </PageTransition>
              }
            />
            <Route
              path="/cards"
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <Cards />
                  </ProtectedRoute>
                </PageTransition>
              }
            />
            <Route
              path="/settings"
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                </PageTransition>
              }
            />
            <Route
              path="/security"
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <Security />
                  </ProtectedRoute>
                </PageTransition>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <PageTransition>
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                </PageTransition>
              }
            />
            <Route
              path="/admin/users"
              element={
                <PageTransition>
                  <ProtectedRoute requireAdmin>
                    <AdminUsers />
                  </ProtectedRoute>
                </PageTransition>
              }
            />
            <Route
              path="/admin/accounts"
              element={
                <PageTransition>
                  <ProtectedRoute requireAdmin>
                    <AdminAccounts />
                  </ProtectedRoute>
                </PageTransition>
              }
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
