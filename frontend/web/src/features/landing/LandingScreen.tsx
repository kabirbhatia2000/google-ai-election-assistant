import React from 'react';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Vote, ShieldCheck, Zap } from 'lucide-react';

interface LandingScreenProps {
  onStart: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center gradient-bg">
      <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex justify-center">
          <div className="bg-primary/10 p-4 rounded-3xl animate-bounce-subtle">
            <Vote className="w-16 h-16 text-primary" />
          </div>
        </div>
        
        <div className="space-y-4 cursor-default">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            Election <span className="text-primary text-glow">Assistant</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium">
            Your step-by-step guide to voting
          </p>
          <p className="text-sm uppercase tracking-[0.2em] text-primary/60 font-bold">
            No confusion. No jargon.
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <PrimaryButton onClick={onStart} size="xl" className="w-full md:w-auto min-w-[240px]">
            Get Started
          </PrimaryButton>
          <span className="text-muted-foreground font-medium cursor-default">
            Learn how it works
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="glass-card flex flex-col items-center p-4 space-y-2 cursor-default">
            <ShieldCheck className="text-primary w-6 h-6" />
            <p className="text-sm font-semibold">Safe & Guided</p>
          </div>
          <div className="glass-card flex flex-col items-center p-4 space-y-2 cursor-default">
            <Zap className="text-primary w-6 h-6" />
            <p className="text-sm font-semibold">Fast Results</p>
          </div>
          <div className="glass-card flex flex-col items-center p-4 space-y-2 text-primary cursor-default">
            <Vote className="w-6 h-6" />
            <p className="text-sm font-semibold">Ready to Vote</p>
          </div>
        </div>
      </div>
    </div>
  );
};
