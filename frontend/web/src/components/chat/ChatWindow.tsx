"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiService } from "@/services/api";
import { Send, BotMessageSquare, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export function ChatWindow({ sessionId }: { sessionId: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hello! I'm your Election Assistant. I have your details ready—what questions do you have about voting or the election process?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const { reply } = await apiService.chat(sessionId, userMessage);
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", text: "Oops, something went wrong reaching the server. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto h-[82vh] flex flex-col shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] border border-slate-100 rounded-[2.5rem] bg-white overflow-hidden">
        
        {/* Header */}
        <CardHeader className="bg-white/90 backdrop-blur-3xl border-b border-slate-100 p-6 z-10 sticky top-0">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <BotMessageSquare className="h-7 w-7 text-white" />
            </div>
            <div className="flex flex-col">
              <CardTitle className="text-2xl font-extrabold text-slate-900 tracking-tight">Election Assistant</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-semibold text-slate-500">Online & ready to help</span>
              </div>
            </div>
          </div>
        </CardHeader>
        
        {/* Chat Area */}
        <CardContent 
          className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8 bg-slate-50/50 scroll-smooth" 
          ref={scrollRef}
        >
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
              {m.role === 'assistant' && (
                 <div className="h-10 w-10 mr-4 mt-2 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                   <BotMessageSquare className="h-5 w-5 text-indigo-500" />
                 </div>
              )}
              
              <div 
                className={`max-w-[75%] px-6 py-4 shadow-sm text-[1.05rem] leading-relaxed tracking-wide font-medium
                  ${m.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-[2rem] rounded-br-md shadow-slate-900/10' 
                    : 'bg-white border border-slate-100 text-slate-800 rounded-[2rem] rounded-bl-md shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
                  }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>
              </div>

              {m.role === 'user' && (
                 <div className="h-10 w-10 ml-4 mt-2 rounded-full bg-slate-200 flex items-center justify-center shrink-0 shadow-inner">
                   <User className="h-5 w-5 text-slate-600" />
                 </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-in fade-in duration-300">
               <div className="h-10 w-10 mr-4 mt-2 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                 <BotMessageSquare className="h-5 w-5 text-indigo-500" />
               </div>
              <div className="bg-white border border-slate-100 text-slate-800 rounded-[2rem] rounded-bl-md px-6 py-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex space-x-2 items-center h-4">
                  <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                  <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {/* Input Footer */}
        <CardFooter className="p-6 bg-white border-t border-slate-100 drop-shadow-sm">
          <form onSubmit={handleSend} className="w-full flex space-x-4 items-center relative group">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me about registration, what to bring, or deadlines..." 
              className="flex-1 rounded-full h-[4.5rem] pl-8 pr-20 bg-slate-50 border-0 ring-1 ring-slate-200 focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-inner text-lg font-medium transition-all group-focus-within:bg-white"
              disabled={isLoading}
            />
            <div className="absolute right-3">
              <Button 
                disabled={isLoading || !input.trim()} 
                type="submit"
                className="rounded-full h-14 w-14 p-0 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:opacity-50"
              >
                <Send className="w-6 h-6 text-white ml-1" />
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
