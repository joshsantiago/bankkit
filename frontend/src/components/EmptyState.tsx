import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6 text-gray-400">
        {icon || <Inbox size={32} />}
      </div>
      <h3 className="text-xl font-black text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm font-medium text-gray-500 text-center max-w-sm mb-6">
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-[#064E3B] text-white rounded-xl font-bold hover:scale-105 transition-transform"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
