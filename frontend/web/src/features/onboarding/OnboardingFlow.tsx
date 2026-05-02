import React, { useState } from 'react';
import { ActionCard } from '@/components/ui/ActionCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { UserPlus, MapPin, GraduationCap, ArrowRight, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export type UserPersona = 'FIRST_TIME' | 'MOVED' | 'LEARNER' | null;

interface OnboardingFlowProps {
  onComplete: (data: { persona: UserPersona; dob: string; location: string }) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [persona, setPersona] = useState<UserPersona>(null);
  const [dob, setDob] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  const handlePersonaSelect = (p: UserPersona) => {
    setPersona(p);
    setStep(2);
  };

  const handleNextInfo = () => {
    if (dob && location) {
      onComplete({ persona, dob, location });
    }
  };

  return (
    <div className="min-h-screen gradient-bg p-6 flex flex-col items-center justify-start pt-12 md:pt-24">
      <div className="w-full max-w-xl space-y-12">
        <ProgressBar progress={progress} label="Onboarding" />

        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Welcome! 👋</h2>
              <p className="text-muted-foreground text-lg">What describes you best?</p>
            </div>

            <div className="grid gap-4">
              <ActionCard 
                title="First-time voter" 
                description="I'm new to the voting process and need a full guide."
                icon={<UserPlus className="w-6 h-6" />}
                onClick={() => handlePersonaSelect('FIRST_TIME')}
                selected={persona === 'FIRST_TIME'}
              />
              <ActionCard 
                title="Moved to new city" 
                description="I've voted before but I'm new to this area."
                icon={<MapPin className="w-6 h-6" />}
                onClick={() => handlePersonaSelect('MOVED')}
                selected={persona === 'MOVED'}
              />
              <ActionCard 
                title="Just learning" 
                description="I'm not ready to vote yet, just curious how it works."
                icon={<GraduationCap className="w-6 h-6" />}
                onClick={() => handlePersonaSelect('LEARNER')}
                selected={persona === 'LEARNER'}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">
                {persona === 'MOVED' ? "About your new home 🏠" : 
                 persona === 'LEARNER' ? "Help us customize your guide 📖" : 
                 "Let's check eligibility 📋"}
              </h2>
              <p className="text-muted-foreground text-lg italic">
                {persona === 'LEARNER' ? "Collect only what optimizes your learning." : "Collect only what matters."}
              </p>
            </div>

            <div className="glass-card space-y-6">
              <div className="space-y-2 group">
                <label className="text-sm font-bold uppercase tracking-wider text-primary/70 group-focus-within:text-foreground flex items-center gap-2 transition-colors">
                  <User className="w-4 h-4" /> Your Date of Birth
                </label>
                <input 
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className={cn(
                    "w-full bg-secondary/50 border-none rounded-xl p-4 text-xl font-semibold focus:ring-2 focus:ring-primary outline-none transition-all",
                    !dob ? "text-muted-foreground/40" : "text-foreground"
                  )}
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-sm font-bold uppercase tracking-wider text-primary/70 group-focus-within:text-foreground flex items-center gap-2 transition-colors">
                  <MapPin className="w-4 h-4" /> Where do you live?
                </label>
                <input 
                  type="text"
                  placeholder="City name"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-secondary/50 border-none rounded-xl p-4 text-xl font-semibold focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/40"
                />
              </div>
            </div>

            <PrimaryButton 
              onClick={handleNextInfo} 
              disabled={!dob || !location}
              className="w-full"
            >
              Continue <ArrowRight className="ml-2 w-5 h-5" />
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};
