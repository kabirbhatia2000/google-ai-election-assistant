import React, { useState } from 'react';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Lightbulb, CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "What is the minimum voting age in India?",
    options: ["16", "18", "21"],
    correctIndex: 1,
    explanation: "The minimum voting age was lowered from 21 to 18 by the 61st Amendment Act in 1988."
  },
  {
    question: "Which document is primarily used as proof of identity at the polls?",
    options: ["Library Card", "Voter ID (EPIC)", "Electricity Bill"],
    correctIndex: 1,
    explanation: "The Elector Photo Identity Card (EPIC) is the standard proof, though other government IDs are also accepted."
  }
];

export const ExplainerMode: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentQuiz, setCurrentQuiz] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionClick = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const currentQ = currentQuiz !== null ? QUIZ_QUESTIONS[currentQuiz] : null;

  return (
    <div className="min-h-screen gradient-bg p-6 space-y-8 w-full pt-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <header className="flex items-center gap-4">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 rounded-lg hover:bg-primary/10 text-primary font-bold transition-colors"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Lightbulb className="text-primary w-6 h-6" /> How voting works
        </h2>
      </header>

      {currentQuiz === null ? (
        <div className="space-y-6">
          <div className="glass-card space-y-4">
            <h3 className="text-xl font-bold">The Power of Your Vote 🗳️</h3>
            <p className="text-muted-foreground leading-relaxed">
              Voting is how citizens choose leaders who make decisions for the country. 
              Think of it like <strong>choosing a team captain</strong>. Every single vote counts towards the final decision.
            </p>
          </div>

          <div className="glass-card space-y-4">
             <h3 className="text-xl font-bold flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" /> Test your knowledge
             </h3>
             <p className="text-muted-foreground text-sm">Think you're ready for the polls? Try our quick checks.</p>
             <PrimaryButton onClick={() => setCurrentQuiz(0)} className="w-full">
                Start Quick Quiz
             </PrimaryButton>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
           <div className="glass-card space-y-6">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Question {currentQuiz + 1} of {QUIZ_QUESTIONS.length}</p>
              <h3 className="text-xl font-bold">{currentQ?.question}</h3>
              
              <div className="space-y-3">
                {currentQ?.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(i)}
                    className={cn(
                      "w-full p-4 rounded-xl text-left border-2 transition-all font-medium",
                      selectedOption === i ? "border-primary bg-primary/5" : "border-transparent bg-secondary/50 hover:bg-secondary",
                      isSubmitted && i === currentQ.correctIndex && "border-green-500 bg-green-50 text-green-700",
                      isSubmitted && selectedOption === i && i !== currentQ.correctIndex && "border-red-500 bg-red-50 text-red-700"
                    )}
                  >
                    <div className="flex justify-between items-center">
                       <span>{opt}</span>
                       {isSubmitted && i === currentQ.correctIndex && <CheckCircle2 className="w-5 h-5" />}
                       {isSubmitted && selectedOption === i && i !== currentQ.correctIndex && <XCircle className="w-5 h-5" />}
                    </div>
                  </button>
                ))}
              </div>

              {isSubmitted && (
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 animate-in fade-in slide-in-from-top-2">
                   <p className="text-sm font-medium">{currentQ?.explanation}</p>
                </div>
              )}

              {!isSubmitted ? (
                 <PrimaryButton onClick={handleSubmit} disabled={selectedOption === null} className="w-full">
                    Check Answer
                 </PrimaryButton>
              ) : (
                 <PrimaryButton 
                    onClick={() => {
                        if (currentQuiz < QUIZ_QUESTIONS.length - 1) {
                            setCurrentQuiz(currentQuiz + 1);
                            setSelectedOption(null);
                            setIsSubmitted(false);
                        } else {
                            setCurrentQuiz(null);
                        }
                    }} 
                    className="w-full"
                 >
                    {currentQuiz < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "Finish Review"} <ArrowRight className="ml-2 w-5 h-5" />
                 </PrimaryButton>
              )}
           </div>
        </div>
      )}
    </div>
  );
};
