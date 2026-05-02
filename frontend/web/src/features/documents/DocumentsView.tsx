import React from 'react';
import { FileText, CheckCircle2, ArrowLeft, ShieldCheck, MapPin, UserCircle } from 'lucide-react';
import { ActionCard } from '@/components/ui/ActionCard';

export const DocumentsView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen gradient-bg p-6 space-y-8 w-full pt-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <header className="flex items-center gap-4">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 rounded-lg hover:bg-primary/10 text-primary font-bold transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="text-primary w-6 h-6" /> Documents Needed
        </h2>
      </header>

      <div className="space-y-6">
        <p className="text-muted-foreground font-medium">To register as a voter in India (Form 6), you typically need proof of age and proof of residence.</p>
        
        <div className="space-y-4">
           <h3 className="text-sm font-bold uppercase tracking-widest text-primary/70">1. Proof of Age (Any one)</h3>
           <div className="grid gap-3">
              <div className="glass-card flex items-center gap-3 p-4">
                 <ShieldCheck className="text-green-500 w-5 h-5" />
                 <span className="font-semibold text-sm">Birth Certificate</span>
              </div>
              <div className="glass-card flex items-center gap-3 p-4">
                 <ShieldCheck className="text-green-500 w-5 h-5" />
                 <span className="font-semibold text-sm">Aadhaar Card</span>
              </div>
              <div className="glass-card flex items-center gap-3 p-4">
                 <ShieldCheck className="text-green-500 w-5 h-5" />
                 <span className="font-semibold text-sm">PAN / Passport / Driving License</span>
              </div>
           </div>
        </div>

        <div className="space-y-4">
           <h3 className="text-sm font-bold uppercase tracking-widest text-primary/70">2. Proof of Residence (Any one)</h3>
           <div className="grid gap-3">
              <div className="glass-card flex items-center gap-3 p-4">
                 <MapPin className="text-primary w-5 h-5" />
                 <span className="font-semibold text-sm">Water / Electricity / Gas Connection Bill</span>
              </div>
              <div className="glass-card flex items-center gap-3 p-4">
                 <MapPin className="text-primary w-5 h-5" />
                 <span className="font-semibold text-sm">Aadhaar Card / Bank Passbook</span>
              </div>
           </div>
        </div>

        <div className="space-y-4">
           <h3 className="text-sm font-bold uppercase tracking-widest text-primary/70">3. Recent Photograph</h3>
           <div className="glass-card flex items-center gap-3 p-4">
              <UserCircle className="text-primary w-5 h-5" />
              <span className="font-semibold text-sm">One passport size color photograph</span>
           </div>
        </div>
      </div>
    </div>
  );
};
