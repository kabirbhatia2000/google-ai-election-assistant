import React, { useState } from 'react';
import { ShieldCheck, Info, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Candidate {
  id: number;
  name: string;
  party: string;
  symbol: string;
}

const CANDIDATES: Candidate[] = [
  { id: 1, name: "Prerna Sharma", party: "Digital Progress Party", symbol: "💻" },
  { id: 2, name: "Arjun Mehta", party: "Green Earth Alliance", symbol: "🌱" },
  { id: 3, name: "Sarah Khan", party: "Unity & Justice Front", symbol: "🤝" },
  { id: 4, name: "None of the Above", party: "NOTA", symbol: "🚫" },
];

export const VirtualPoll: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isVoted, setIsVoted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVote = (id: number) => {
    if (isVoted || isProcessing) return;
    setSelectedId(id);
  };

  const confirmVote = () => {
    setIsProcessing(true);
    // Simulate EVM processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsVoted(true);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <ShieldCheck className="text-primary w-6 h-6" /> Virtual Poll Simulation
        </h3>
        <button onClick={onBack} className="text-sm font-bold text-primary hover:underline">
          Exit Simulation
        </button>
      </div>

      {!isVoted ? (
        <div className="glass-card border-primary/20 space-y-6">
          <div className="bg-primary/5 p-4 rounded-xl flex gap-3 items-start border border-primary/10">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-primary/80 font-medium">
              This is a safe space to practice! In a real election, your vote is secret and final. 
              Select a candidate and press the blue button below.
            </p>
          </div>

          <div className="space-y-3">
            {CANDIDATES.map((cand) => (
              <button
                key={cand.id}
                onClick={() => handleVote(cand.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all group",
                  selectedId === cand.id 
                    ? "border-primary bg-primary/10 shadow-lg scale-[1.02]" 
                    : "border-transparent bg-secondary/50 hover:border-primary/30"
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{cand.symbol}</span>
                  <div className="text-left">
                    <p className="font-bold text-foreground">{cand.name}</p>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{cand.party}</p>
                  </div>
                </div>
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                  selectedId === cand.id ? "bg-primary border-primary" : "border-muted group-hover:border-primary/50"
                )}>
                  {selectedId === cand.id && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={confirmVote}
            disabled={!selectedId || isProcessing}
            className={cn(
              "w-full py-4 rounded-xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-2",
              selectedId && !isProcessing
                ? "bg-primary text-white hover:scale-[1.02] active:scale-95"
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
            )}
          >
            {isProcessing ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "CAST SIMULATED VOTE 🗳️"
            )}
          </button>
        </div>
      ) : (
        <div className="glass-card border-green-500/30 bg-green-50/50 text-center py-12 space-y-6 animate-in zoom-in duration-700">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
              <CheckCircle2 className="text-white w-12 h-12" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">BEEP! Vote Cast!</h2>
            <p className="text-muted-foreground font-medium max-w-xs mx-auto">
              In a real booth, you'd hear a long beep and see the light glow red. Great job practicing your civic duty!
            </p>
          </div>
          <button 
            onClick={() => setIsVoted(false)} 
            className="text-primary font-bold hover:underline"
          >
            Try again with another candidate
          </button>
        </div>
      )}
    </div>
  );
};
