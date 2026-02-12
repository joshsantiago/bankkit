import React from 'react';
import { Button } from '../ui/Button';
import { Loader } from '../ui/Loader';

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
  isLoading?: boolean;
  nextButtonText?: string;
}

export const WizardNavigation: React.FC<WizardNavigationProps> = ({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  isNextDisabled = false,
  isLoading = false,
  nextButtonText,
}) => {
  const getNextButtonText = () => {
    if (nextButtonText) return nextButtonText;

    if (currentStep === 0) return 'Get Started';
    if (currentStep === totalSteps - 2) return 'Create Account';
    if (currentStep === totalSteps - 1) return 'Start Banking';
    return 'Next';
  };

  return (
    <div className="flex gap-4 mt-8">
      {currentStep > 0 && currentStep < totalSteps - 1 && (
        <Button
          variant="secondary"
          onClick={onBack}
          disabled={isLoading}
          className="sm:w-auto w-full"
        >
          Back
        </Button>
      )}

      <Button
        variant="primary"
        onClick={onNext}
        disabled={isNextDisabled || isLoading}
        fullWidth={currentStep === 0 || currentStep >= totalSteps - 1}
        className={currentStep > 0 && currentStep < totalSteps - 1 ? 'flex-1' : ''}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader size="sm" />
            <span>Processing...</span>
          </span>
        ) : (
          getNextButtonText()
        )}
      </Button>
    </div>
  );
};
