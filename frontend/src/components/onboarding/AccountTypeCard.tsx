import React from 'react';

interface AccountTypeCardProps {
  icon: string;
  title: string;
  description: string;
  isSelected: boolean;
  isRecommended?: boolean;
  onClick: () => void;
}

export const AccountTypeCard: React.FC<AccountTypeCardProps> = ({
  icon,
  title,
  description,
  isSelected,
  isRecommended = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative p-6 rounded-2xl border-2 transition-all duration-300 text-left w-full
        hover:shadow-lg hover:scale-105
        ${isSelected
          ? 'border-blue-600 bg-blue-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-blue-300'
        }
      `}
    >
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Recommended
          </span>
        </div>
      )}

      <div className="flex flex-col items-center text-center space-y-3">
        <div className="text-4xl">{icon}</div>
        <h3 className={`text-xl font-bold ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
          {title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </button>
  );
};
