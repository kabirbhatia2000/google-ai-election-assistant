import React from 'react';
import { cn } from '@/lib/utils';

interface ActionCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  onClick,
  selected,
  className,
  children
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "glass-card w-full text-left flex items-start gap-4 cursor-pointer group",
        selected ? "border-primary bg-primary/5 shadow-md" : "border-white/20",
        className
      )}
    >
      {icon && (
        <div className={cn(
          "p-3 rounded-xl transition-colors",
          selected ? "bg-primary text-white" : "bg-secondary text-primary group-hover:bg-primary/10"
        )}>
          {icon}
        </div>
      )}
      <div className="flex-1">
        <h3 className="font-semibold text-lg leading-tight">{title}</h3>
        {description && <p className="text-muted-foreground text-sm mt-1">{description}</p>}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </button>
  );
};
