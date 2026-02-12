import React, { useState } from 'react';
import { Input } from '../../ui/Input';

interface AccountCredentialsStepProps {
  email: string;
  password: string;
  confirmPassword: string;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
  onBlur: (field: string) => void;
}

export const AccountCredentialsStep: React.FC<AccountCredentialsStepProps> = ({
  email,
  password,
  confirmPassword,
  errors,
  onChange,
  onBlur,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Calculate password strength
  const getPasswordStrength = (pwd: string): { strength: number; label: string; color: string } => {
    if (!pwd) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (pwd.length >= 8) strength += 33;
    if (pwd.length >= 12) strength += 17;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength += 25;
    if (/\d/.test(pwd)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength += 10;

    if (strength < 33) return { strength, label: 'Weak', color: 'bg-red-500' };
    if (strength < 66) return { strength, label: 'Medium', color: 'bg-yellow-500' };
    return { strength, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
        <p className="text-gray-600">Let's get you set up with secure credentials</p>
      </div>

      <div>
        <Input
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => onChange('email', e.target.value)}
          onBlur={() => onBlur('email')}
          error={errors.email}
          fullWidth
          required
        />
      </div>

      <div>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => onChange('password', e.target.value)}
            onBlur={() => onBlur('password')}
            error={errors.password}
            fullWidth
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>

        {/* Password Strength Indicator */}
        {password && (
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{ width: `${passwordStrength.strength}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-600">{passwordStrength.label}</span>
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => onChange('confirmPassword', e.target.value)}
            onBlur={() => onBlur('confirmPassword')}
            error={errors.confirmPassword}
            fullWidth
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
      </div>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 bg-blue-50 rounded-lg p-3">
        <span>🔒</span>
        <span>Bank-grade 256-bit encryption</span>
      </div>
    </div>
  );
};
