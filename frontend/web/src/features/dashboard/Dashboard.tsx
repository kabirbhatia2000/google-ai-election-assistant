import React from 'react';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ActionCard } from '@/components/ui/ActionCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { CheckCircle2, FileEdit, IdCard, Vote, Info, Send, Paperclip, Search, Download } from 'lucide-react';
import { apiService } from '@/services/api';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

import { VirtualPoll } from '../vote/VirtualPoll';
import { LoginPrompt } from '@/components/auth/LoginPrompt';
import { authService } from '@/services/auth';

interface DashboardProps {
  location: string;
  sessionId: string;
  onOpenExplainer: () => void;
  onOpenDocuments: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ location, sessionId, onOpenExplainer, onOpenDocuments }) => {
  const [user, setUser] = React.useState<any>(null);
  const [messages, setMessages] = React.useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: `Hi! I see you're from ${location}. Ready to start your registration?` }
  ]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [attachment, setAttachment] = React.useState<{ file: File, preview: string } | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = React.useState<'CHAT' | 'REGISTER' | 'VOTER_ID' | 'VOTE'>('CHAT');
  const [showLoginPrompt, setShowLoginPrompt] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = authService.onAuthChange((authUser) => {
      if (authUser) {
        setUser(authUser);
        setShowLoginPrompt(false);
      } else {
        setUser(null);
        setShowLoginPrompt(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const chatResponse = await apiService.chat(sessionId, userMessage, attachment?.file);
      setMessages(prev => [...prev, { role: 'assistant', content: chatResponse.reply }]);
      setAttachment(null);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg p-6 space-y-8 w-full pt-10 flex flex-col">
      <header className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground transition-all">
            {user ? `Hi, ${user.displayName?.split(' ')[0]} 👋` : "Hi Voter 👋"}
          </h1>
          <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Voter Dashboard • {location}</p>
        </div>
      </header>

      {showLoginPrompt && (
        <LoginPrompt 
          onLogin={async () => {
            try {
              await authService.signInWithGoogle();
              setShowLoginPrompt(false);
            } catch (err) {
              console.error("Login failed:", err);
            }
          }} 
          onDismiss={() => setShowLoginPrompt(false)} 
        />
      )}

      {/* Progress Section */}
      <section className="glass-card space-y-6">
        <h3 className="font-bold text-lg">Your Voting Journey</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setActiveTab('CHAT')}
            className={cn(
              "flex flex-col items-center text-center space-y-2 transition-all hover:scale-105",
              activeTab !== 'CHAT' && "opacity-50"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg"><CheckCircle2 className="w-6 h-6" /></div>
            <p className="text-[10px] font-bold">ELIGIBILITY</p>
          </button>
          <button 
            onClick={() => setActiveTab('REGISTER')}
            className={cn(
              "flex flex-col items-center text-center space-y-2 transition-all hover:scale-105",
              activeTab !== 'REGISTER' && "opacity-50"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg animate-pulse-subtle"><FileEdit className="w-6 h-6" /></div>
            <p className="text-[10px] font-bold">REGISTER</p>
          </button>
          <button 
            onClick={() => setActiveTab('VOTER_ID')}
            className={cn(
              "flex flex-col items-center text-center space-y-2 transition-all hover:scale-105",
              activeTab !== 'VOTER_ID' && "opacity-50"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-secondary text-foreground flex items-center justify-center border-2 border-dashed border-muted"><IdCard className="w-6 h-6" /></div>
            <p className="text-[10px] font-bold">VOTER ID</p>
          </button>
          <button 
            onClick={() => setActiveTab('VOTE')}
            className={cn(
              "flex flex-col items-center text-center space-y-2 transition-all hover:scale-105",
              activeTab !== 'VOTE' && "opacity-50"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-secondary text-foreground flex items-center justify-center border-2 border-dashed border-muted"><Vote className="w-6 h-6" /></div>
            <p className="text-[10px] font-bold">VOTE</p>
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Contextual Tool or Quick Actions */}
        <div className="space-y-6">
          {activeTab === 'CHAT' && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg">⚡ Quick Actions</h3>
              <ActionCard
                title="Register Now"
                description="Complete Form 6 on NVSP"
                icon={<FileEdit className="text-primary w-5 h-5" />}
                onClick={() => window.open('https://www.nvsp.in/', '_blank')}
              />
              <ActionCard
                title="Documents Needed"
                description="List of required proofs"
                icon={<IdCard className="text-primary w-5 h-5" />}
                onClick={onOpenDocuments}
              />
              <ActionCard
                title="How voting works"
                description="Simple 2-min guide"
                icon={<Info className="text-primary w-5 h-5" />}
                onClick={onOpenExplainer}
              />
            </div>
          )}

          {activeTab === 'REGISTER' && (
            <div className="glass-card border-primary space-y-4 animate-in slide-in-from-left-4">
              <h3 className="font-bold text-xl">📝 Registration Hub</h3>
              <p className="text-muted-foreground italic">"Faridabad division is currently accepting fresh registrations for upcoming local polls."</p>
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                <h4 className="font-bold text-sm mb-2">Checklist:</h4>
                <ul className="text-sm space-y-2 font-medium">
                  <li className="flex gap-2">✅ Passport size photo</li>
                  <li className="flex gap-2">✅ Aadhar Card (Address Proof)</li>
                  <li className="flex gap-2">✅ PAN Card (Age Proof)</li>
                </ul>
              </div>
              <PrimaryButton onClick={() => window.open('https://www.nvsp.in/', '_blank')} className="w-full">Open Official Portal</PrimaryButton>
            </div>
          )}

          {activeTab === 'VOTER_ID' && (
            <div className="glass-card border-secondary space-y-4 animate-in slide-in-from-left-4">
              <h3 className="font-bold text-xl">🆔 Your Voter Identity</h3>
              <p className="text-muted-foreground italic">"Once registered, you can track your application status here."</p>
              <div className="grid grid-cols-1 gap-2">
                <ActionCard 
                  title="Track Status" 
                  icon={<Search className="w-4 h-4"/>} 
                  onClick={() => window.open('https://voters.eci.gov.in/', '_blank')} 
                />
                <ActionCard 
                  title="Download e-EPIC" 
                  icon={<Download className="w-4 h-4"/>} 
                  onClick={() => window.open('https://voters.eci.gov.in/download-epic', '_blank')} 
                />
              </div>
            </div>
          )}

          {activeTab === 'VOTE' && (
            <VirtualPoll onBack={() => setActiveTab('CHAT')} />
          )}
        </div>

        {/* Right Column: AI Assistant (Always visible or toggleable) */}
        <div className="space-y-4 flex flex-col h-[500px]">
          <h3 className="font-bold text-lg">💬 Assistant Support</h3>
          <div className="glass-card flex-1 flex flex-col gap-4 border-primary/20 overflow-hidden relative p-4 bg-white/40">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={cn(
                  "p-3 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-2",
                  m.role === 'assistant' ? "bg-secondary/50 mr-8 text-foreground" : "bg-primary text-white ml-8"
                )}>
                  {m.role === 'assistant' ? (
                    <div className="prose prose-sm prose-blue max-w-none prose-p:leading-relaxed prose-li:my-0">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : m.content}
                </div>
              ))}
              {isTyping && (
                <div className="bg-secondary/50 rounded-xl p-3 text-sm font-medium w-fit animate-pulse">
                  ...
                </div>
              )}
            </div>
            {attachment && (
              <div className="mx-4 mb-2 p-2 glass-card border-primary/30 flex items-center justify-between animate-in zoom-in-95">
                <div className="flex items-center gap-3">
                  <img src={attachment.preview} className="w-10 h-10 rounded shadow object-cover" alt="preview" />
                  <span className="text-xs font-bold truncate max-w-[150px]">{attachment.file.name}</span>
                </div>
                <button onClick={() => setAttachment(null)} className="text-muted-foreground hover:text-red-500">
                  <span className="text-lg">×</span>
                </button>
              </div>
            )}
            <div className="relative mt-auto px-4 pb-4">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*,.pdf" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setAttachment({ file, preview: reader.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <div className="relative group">
                <textarea
                  placeholder="Ask anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  rows={1}
                  className="w-full bg-secondary rounded-xl p-4 pl-12 pr-12 outline-none border border-primary/10 focus:border-primary/40 transition-all font-medium text-sm resize-none custom-scrollbar min-h-[54px] max-h-24"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  title="Attach file"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSend}
                  disabled={(!input.trim() && !attachment) || isTyping}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:scale-110 transition-all disabled:opacity-30"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
