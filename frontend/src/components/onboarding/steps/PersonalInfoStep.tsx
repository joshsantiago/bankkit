import React from 'react';
import { Input } from '../../ui/Input';

interface PersonalInfoStepProps {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
  onBlur: (field: string) => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  firstName,
  lastName,
  dateOfBirth,
  phone,
  errors,
  onChange,
  onBlur,
}) => {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Tell Us About You</h2>
        <p className="text-gray-600">Help us personalize your banking experience</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="text"
          label="First Name"
          placeholder="John"
          value={firstName}
          onChange={(e) => onChange('first_name', e.target.value)}
          onBlur={() => onBlur('first_name')}
          error={errors.first_name}
          fullWidth
          required
        />

        <Input
          type="text"
          label="Last Name"
          placeholder="Doe"
          value={lastName}
          onChange={(e) => onChange('last_name', e.target.value)}
          onBlur={() => onBlur('last_name')}
          error={errors.last_name}
          fullWidth
          required
        />
      </div>

      <Input
        type="date"
        label="Date of Birth (Optional)"
        value={dateOfBirth}
        onChange={(e) => onChange('dateOfBirth', e.target.value)}
        fullWidth
      />

      <Input
        type="tel"
        label="Phone Number (Optional)"
        placeholder="+1 (555) 123-4567"
        value={phone}
        onChange={(e) => onChange('phone', e.target.value)}
        fullWidth
      />

      {/* Privacy Message */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 bg-green-50 rounded-lg p-3">
        <span>🔐</span>
        <span>We protect your privacy and never share your information</span>
      </div>
    </div>
  );
};
