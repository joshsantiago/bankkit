import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PublicLayout } from './components/layout/PublicLayout';
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
import { Dashboard } from './pages/Dashboard';
import { Accounts } from './pages/Accounts';
import { Transactions } from './pages/Transactions';
import { Cards } from './pages/Cards';
import { Settings } from './pages/Settings';
import { Transfer } from './pages/Transfer';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminAccounts } from './pages/admin/AdminAccounts';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<PublicLayout><Landing /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/security" element={<PublicLayout><Security /></PublicLayout>} />
            <Route path="/help" element={<PublicLayout><Help /></PublicLayout>} />
            <Route path="/features" element={<PublicLayout><Features /></PublicLayout>} />
            <Route path="/credit-card" element={<PublicLayout><CreditCard /></PublicLayout>} />
            <Route path="/check-savings" element={<PublicLayout><CheckSavings /></PublicLayout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/onboarding" element={<Onboarding />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/accounts"
              element={
                <ProtectedRoute>
                  <Accounts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transfer"
              element={
                <ProtectedRoute>
                  <Transfer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cards"
              element={
                <ProtectedRoute>
                  <Cards />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/accounts"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminAccounts />
                </ProtectedRoute>
              }
            />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
