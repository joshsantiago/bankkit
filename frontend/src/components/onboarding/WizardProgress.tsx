import React from 'react';

interface WizardProgressProps {
  currentStep: number;
  steps: Array<{ label: string; icon: string }>;
}

export const WizardProgress: React.FC<WizardProgressProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step Circle */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-300
                  ${index < currentStep
                    ? 'bg-blue-600 text-white'
                    : index === currentStep
                    ? 'bg-blue-600 text-white ring-4 ring-blue-200 animate-pulse'
                    : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {index < currentStep ? (
                  <span className="text-xl">✓</span>
                ) : (
                  <span>{step.icon}</span>
                )}
              </div>
              <span
                className={`
                  mt-2 text-xs font-medium hidden sm:block
                  ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}
                `}
              >
                {step.label}
              </span>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  flex-1 h-1 mx-2 transition-all duration-300
                  ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'}
                `}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
