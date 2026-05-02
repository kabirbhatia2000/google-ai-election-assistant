import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  showText?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  label = "Progress", 
  showText = true 
}) => {
  const clamp = (val: number) => Math.min(Math.max(val, 0), 100);
  const clampedProgress = clamp(progress);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm font-medium text-muted-foreground">
        <span>{label}</span>
        {showText && <span>{Math.round(clampedProgress)}%</span>}
      </div>
      <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out rounded-full shadow-[0_0_10px_rgba(var(--primary),0.3)]"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};
