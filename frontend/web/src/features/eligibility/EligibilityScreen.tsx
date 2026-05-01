import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, ClipboardList, GraduationCap } from 'lucide-react';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { cn } from '@/lib/utils';
import { UserPersona } from '../onboarding/OnboardingFlow';

interface EligibilityScreenProps {
  persona: UserPersona;
  dob: string;
  location: string;
  onContinue: () => void;
}

export const EligibilityScreen: React.FC<EligibilityScreenProps> = ({ persona, dob, location, onContinue }) => {
  const birthDate = new Date(dob);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  const isEligible = age >= 18;

  const getEligibleOnDate = () => {
    const eligibleDate = new Date(birthDate);
    eligibleDate.setFullYear(birthDate.getFullYear() + 18);
    return eligibleDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getHeading = () => {
    if (persona === 'LEARNER') return "Let's explore voting! 🎓";
    if (persona === 'MOVED') return "Ready to register locally 🏠";
    return isEligible ? "You're eligible to vote! 🟢" : "You're not eligible yet 🔴";
  };

  const showSuccessView = isEligible || persona === 'LEARNER' || persona === 'MOVED';

  return (
    <div className="min-h-screen gradient-bg p-6 flex flex-col items-center justify-start pt-12 md:pt-24">
      <div className="w-full max-w-xl space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <ProgressBar progress={100} label={persona === 'LEARNER' ? "Learning Profile Set" : "Eligibility Checked"} />

        {showSuccessView ? (
          <div className="space-y-8">
            <div className={cn(
              "glass-card text-center space-y-4",
              isEligible ? "border-green-500/20 bg-green-50/50" : "border-primary/20 bg-primary/5"
            )}>
              <div className="flex justify-center">
                {persona === 'LEARNER' ? (
                  <GraduationCap className="w-20 h-20 text-primary animate-in zoom-in duration-500" />
                ) : (
                  <CheckCircle2 className="w-20 h-20 text-green-500 animate-in zoom-in duration-500" />
                )}
              </div>
              <h2 className="text-3xl font-bold text-foreground">{getHeading()}</h2>
              <p className="text-muted-foreground text-lg italic">
                {persona === 'MOVED' ? `"Welcome to ${location}! Let's get you set up in your new constituency."` :
                 persona === 'LEARNER' ? `"You're here to learn, and that's the best first step. Let's see how it works in ${location}."` :
                 `"Great news! You're ready to participate in elections in ${location}."`}
              </p>
            </div>

            <div className="glass-card space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ClipboardList className="w-6 h-6 text-primary" /> What's next?
              </h3>
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-green-600 font-semibold">
                    <CheckCircle2 className="w-5 h-5" /> <span>{persona === 'LEARNER' ? "Profile customized" : "Check eligibility"}</span>
                 </div>
                 <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full border-2 border-muted" /> <span>{persona === 'MOVED' ? "Update registration" : persona === 'LEARNER' ? "Explore guides" : "Register to vote"}</span>
                 </div>
                 <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full border-2 border-muted" /> <span>{persona === 'LEARNER' ? "Ask Assistant" : "Get voter ID"}</span>
                 </div>
                 <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full border-2 border-muted" /> <span>Vote</span>
                 </div>
              </div>
              <PrimaryButton onClick={onContinue} className="w-full">
                 {persona === 'LEARNER' ? "Go to Dashboard" : "Start Registration"} <ArrowRight className="ml-2 w-5 h-5" />
              </PrimaryButton>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="glass-card border-red-500/20 bg-red-50/50 text-center space-y-4">
              <div className="flex justify-center">
                <XCircle className="w-20 h-20 text-red-500 animate-in zoom-in duration-500" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">You're not eligible yet 🔴</h2>
              <p className="text-muted-foreground text-lg">"You must be 18+ to vote."</p>
            </div>

            <div className="glass-card text-center space-y-4">
               <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">You'll be eligible on:</p>
               <p className="text-3xl font-bold text-primary">{getEligibleOnDate()}</p>
               <button onClick={onContinue} className="text-primary hover:underline font-bold pt-4">
                  Anyway, let me learn how it works
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
