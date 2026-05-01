import React from 'react';
import { cn } from '@/lib/utils';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  variant = 'primary',
  size = 'lg',
  loading,
  className,
  ...props
}) => {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border-2 border-primary text-primary hover:bg-primary/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-semibold",
    xl: "px-10 py-5 text-xl font-bold",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};
