import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title: string;
  description?: string;
  onRetry?: () => void;
  type?: 'error' | 'empty';
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  description,
  onRetry,
  type = 'error',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
        type === 'error' ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-400'
      }`}>
        <AlertTriangle size={32} />
      </div>
      <h3 className="text-xl font-black text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm font-medium text-gray-500 text-center max-w-sm mb-6">
          {description}
        </p>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-[#064E3B] text-white rounded-xl font-bold hover:scale-105 transition-transform"
        >
          <RefreshCw size={18} />
          Try Again
        </button>
      )}
    </div>
  );
};
