import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  interactive = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-soft-card ${
        hoverEffect ? 'hover:-translate-y-1.5 hover:border-blue-200 transition-all duration-300' : ''
      } ${interactive ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
