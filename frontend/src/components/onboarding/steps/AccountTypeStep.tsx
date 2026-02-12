import React from 'react';
import { AccountTypeCard } from '../AccountTypeCard';

interface AccountTypeStepProps {
  selectedType: string;
  onSelect: (type: 'checking' | 'savings' | 'both') => void;
  error?: string;
}

export const AccountTypeStep: React.FC<AccountTypeStepProps> = ({
  selectedType,
  onSelect,
  error,
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Choose Your Account</h2>
        <p className="text-gray-600">Select the banking solution that fits your needs</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <AccountTypeCard
          icon="💳"
          title="Checking"
          description="Perfect for daily banking • Debit card • Bill payments • No minimum balance"
          isSelected={selectedType === 'checking'}
          onClick={() => onSelect('checking')}
        />

        <AccountTypeCard
          icon="💰"
          title="Savings"
          description="Grow your money • High-yield APY • Automatic savings • FDIC insured"
          isSelected={selectedType === 'savings'}
          onClick={() => onSelect('savings')}
        />

        <AccountTypeCard
          icon="✨"
          title="Both"
          description="Complete banking solution • All features • Easy transfers • Best value"
          isSelected={selectedType === 'both'}
          isRecommended={true}
          onClick={() => onSelect('both')}
        />
      </div>

      {error && (
        <p className="text-center text-red-600 text-sm">{error}</p>
      )}
    </div>
  );
};
