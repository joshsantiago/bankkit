import React from 'react';

export const Loader: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeStyles = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeStyles[size]} border-primary-200 border-t-primary-600 rounded-full animate-spin`}
      />
    </div>
  );
};

export const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader size="lg" />
  </div>
);
