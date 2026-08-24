import React from 'react';
import { Armchair, ArrowRight, Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showChairIcon?: boolean;
  showArrowIcon?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'lg',
  showChairIcon = false,
  showArrowIcon = false,
  isLoading = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'group relative inline-flex items-center justify-center font-extrabold tracking-wide transition-all duration-300 transform active:translate-y-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none select-none';

  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-glow-btn hover:shadow-xl hover:-translate-y-1 rounded-2xl',
    secondary: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-soft-card hover:-translate-y-0.5 rounded-2xl',
    outline: 'bg-transparent hover:bg-blue-50 text-blue-600 border-2 border-blue-600 rounded-2xl',
    ghost: 'bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl',
  };

  const sizeStyles = {
    sm: 'px-4 py-2.5 text-xs gap-2',
    md: 'px-6 py-3 text-sm gap-3',
    lg: 'px-8 py-4 sm:py-5 text-base sm:text-lg gap-4',
    xl: 'px-10 py-5 text-lg sm:text-xl gap-4',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : showChairIcon ? (
        <Armchair className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
      ) : null}

      <span>{children}</span>

      {showArrowIcon && !isLoading && (
        <ArrowRight className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
      )}
    </button>
  );
};
