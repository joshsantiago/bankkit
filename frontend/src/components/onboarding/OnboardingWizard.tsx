import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WizardProgress } from './WizardProgress';
import { WizardNavigation } from './WizardNavigation';
import { WelcomeStep } from './steps/WelcomeStep';
import { AccountCredentialsStep } from './steps/AccountCredentialsStep';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { AccountTypeStep } from './steps/AccountTypeStep';
import { SuccessStep } from './steps/SuccessStep';
import { authService } from '../../services/authService';
import { Alert } from '../ui/Alert';

interface OnboardingData {
  email: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
  dateOfBirth: string;
  phone: string;
  accountType: 'checking' | 'savings' | 'both' | '';
}

const steps = [
  { label: 'Welcome', icon: '👋' },
  { label: 'Account', icon: '🔐' },
  { label: 'Profile', icon: '👤' },
  { label: 'Choose', icon: '💳' },
  { label: 'Done', icon: '✅' },
];

export const OnboardingWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<OnboardingData>({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    dateOfBirth: '',
    phone: '',
    accountType: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form field
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password strength
  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  // Validate field on blur
  const handleBlur = (field: string) => {
    const newErrors: Record<string, string> = {};

    if (field === 'email' && formData.email) {
      if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (field === 'password' && formData.password) {
      if (!validatePassword(formData.password)) {
        newErrors.password = 'Password must be at least 8 characters';
      }
    }

    if (field === 'confirmPassword' && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (field === 'first_name' && formData.first_name) {
      if (formData.first_name.length < 2) {
        newErrors.first_name = 'First name must be at least 2 characters';
      }
    }

    if (field === 'last_name' && formData.last_name) {
      if (formData.last_name.length < 2) {
        newErrors.last_name = 'Last name must be at least 2 characters';
      }
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
  };

  // Validate current step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      // Account Credentials Step
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (!validatePassword(formData.password)) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 2) {
      // Personal Info Step
      if (!formData.first_name) {
        newErrors.first_name = 'First name is required';
      } else if (formData.first_name.length < 2) {
        newErrors.first_name = 'First name must be at least 2 characters';
      }

      if (!formData.last_name) {
        newErrors.last_name = 'Last name is required';
      } else if (formData.last_name.length < 2) {
        newErrors.last_name = 'Last name must be at least 2 characters';
      }
    }

    if (step === 3) {
      // Account Type Step
      if (!formData.accountType) {
        newErrors.accountType = 'Please select an account type';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle registration API call
  const handleRegister = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await authService.register({
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
      });

      if (response.success) {
        // Store token and user
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Move to success step
        setCurrentStep(4);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
      setLoading(false);
    }
  };

  // Handle next button click
  const handleNext = async () => {
    // Step 0: Welcome - no validation
    if (currentStep === 0) {
      setCurrentStep(1);
      return;
    }

    // Step 1-3: Validate before proceeding
    if (currentStep >= 1 && currentStep <= 3) {
      if (!validateStep(currentStep)) {
        return;
      }

      // If on step 3 (account type), trigger registration
      if (currentStep === 3) {
        await handleRegister();
        return;
      }

      setCurrentStep(currentStep + 1);
    }

    // Step 4: Success - redirect to dashboard
    if (currentStep === 4) {
      navigate('/dashboard');
    }
  };

  // Handle back button click
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setError('');
    }
  };

  // Check if next button should be disabled
  const isNextDisabled = () => {
    if (currentStep === 1) {
      return !formData.email || !formData.password || !formData.confirmPassword || Object.keys(errors).length > 0;
    }
    if (currentStep === 2) {
      return !formData.first_name || !formData.last_name || Object.keys(errors).length > 0;
    }
    if (currentStep === 3) {
      return !formData.accountType;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        {currentStep < 4 && (
          <WizardProgress currentStep={currentStep} steps={steps} />
        )}

        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          {/* Error Alert */}
          {error && (
            <div className="mb-6">
              <Alert type="error" message={error} onClose={() => setError('')} />
            </div>
          )}

          {/* Step Content */}
          <div className="min-h-[400px] flex flex-col">
            {currentStep === 0 && <WelcomeStep />}

            {currentStep === 1 && (
              <AccountCredentialsStep
                email={formData.email}
                password={formData.password}
                confirmPassword={formData.confirmPassword}
                errors={errors}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            )}

            {currentStep === 2 && (
              <PersonalInfoStep
                firstName={formData.first_name}
                lastName={formData.last_name}
                dateOfBirth={formData.dateOfBirth}
                phone={formData.phone}
                errors={errors}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            )}

            {currentStep === 3 && (
              <AccountTypeStep
                selectedType={formData.accountType}
                onSelect={(type) => handleChange('accountType', type)}
                error={errors.accountType}
              />
            )}

            {currentStep === 4 && (
              <SuccessStep firstName={formData.first_name} />
            )}
          </div>

          {/* Navigation Buttons */}
          <WizardNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onBack={handleBack}
            onNext={handleNext}
            isNextDisabled={isNextDisabled()}
            isLoading={loading}
          />
        </div>

        {/* Footer Link */}
        {currentStep < 4 && (
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
