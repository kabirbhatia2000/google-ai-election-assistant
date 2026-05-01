import React from 'react';
import { Cloud, ArrowRight, X } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

interface LoginPromptProps {
  onLogin: () => void;
  onDismiss: () => void;
}

export const LoginPrompt: React.FC<LoginPromptProps> = ({ onLogin, onDismiss }) => {
  return (
    <div className="animate-in slide-in-from-bottom-8 duration-500 glass-card bg-primary text-white border-none shadow-2xl relative overflow-hidden group">
      {/* Decorative background element */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
      
      <button 
        onClick={onDismiss}
        className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex flex-col md:flex-row items-center gap-6 py-2">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
          <Cloud className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex-1 space-y-1 text-center md:text-left">
          <h4 className="font-bold text-lg">Save your progress?</h4>
          <p className="text-white/80 text-sm font-medium">✨ Log in now to keep your election roadmap and chat history synced across all devices.</p>
        </div>

        <div className="shrink-0 w-full md:w-auto">
          <PrimaryButton 
            onClick={onLogin}
            className="bg-white text-primary hover:bg-white/90 border-none w-full shadow-lg"
          >
            Log in with Google <ArrowRight className="ml-2 w-4 h-4" />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
