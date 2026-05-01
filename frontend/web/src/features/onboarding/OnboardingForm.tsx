"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/services/api";
import { MapPin, CalendarHeart, Vote, Sparkles } from "lucide-react";

interface OnboardingFormProps {
  onComplete: (context: UserContext) => void;
  isLoading: boolean;
}

export function OnboardingForm({ onComplete, isLoading }: OnboardingFormProps) {
  const [context, setContext] = useState<UserContext>({
    state: "",
    age: undefined,
    isRegistered: undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(context);
  };

  return (
    <div className="flex flex-col justify-center min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-xl mx-auto shadow-[0_20px_60px_-15px_rgba(79,70,229,0.15)] border border-slate-100 rounded-[2.5rem] bg-white/90 backdrop-blur-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        <CardHeader className="text-center pb-8 pt-12 px-10">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center ring-8 ring-indigo-50/50">
              <Sparkles className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Welcome, Voter!
          </CardTitle>
          <CardDescription className="text-[1.1rem] text-slate-500 mt-4 leading-relaxed font-medium">
            To give you the most accurate and personalized guidance, let's verify a few quick details.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-8 px-10">
            {/* State Input */}
            <div className="space-y-3 group">
              <Label htmlFor="state" className="flex items-center space-x-2 text-[0.95rem] font-bold text-slate-700 transition-colors group-focus-within:text-indigo-600">
                <MapPin className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <span>Which state do you live in?</span>
              </Label>
              <Input 
                id="state" 
                placeholder="e.g., California, Florida..." 
                className="rounded-2xl h-14 bg-slate-50 border-slate-200 text-lg px-5 transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:bg-white shadow-sm"
                required
                value={context.state || ""}
                onChange={(e) => setContext({ ...context, state: e.target.value })}
              />
            </div>
            
            {/* Age Input */}
            <div className="space-y-3 group">
              <Label htmlFor="age" className="flex items-center space-x-2 text-[0.95rem] font-bold text-slate-700 transition-colors group-focus-within:text-indigo-600">
                 <CalendarHeart className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                 <span>What is your age?</span>
              </Label>
              <Input 
                id="age" 
                type="number" 
                required
                placeholder="18" 
                className="rounded-2xl h-14 bg-slate-50 border-slate-200 text-lg px-5 transition-all focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:bg-white shadow-sm"
                value={context.age || ""}
                onChange={(e) => setContext({ ...context, age: parseInt(e.target.value) })}
              />
            </div>

            {/* Registration Status */}
            <div className="space-y-3">
              <Label className="flex items-center space-x-2 text-[0.95rem] font-bold text-slate-700">
                <Vote className="w-4 h-4 text-slate-400" />
                <span>Are you already registered to vote?</span>
              </Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <Button 
                  type="button"
                  variant={"outline"}
                  className={`h-14 rounded-2xl text-lg font-semibold transition-all duration-300 ${context.isRegistered === true ? 'bg-indigo-600 border-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600'}`}
                  onClick={() => setContext({ ...context, isRegistered: true })}
                >
                  Yes
                </Button>
                <Button 
                  type="button"
                  variant={"outline"}
                  className={`h-14 rounded-2xl text-lg font-semibold transition-all duration-300 ${context.isRegistered === false ? 'bg-indigo-600 border-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600'}`}
                  onClick={() => setContext({ ...context, isRegistered: false })}
                >
                  No / Unsure
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-10 pb-12 pt-6">
            <Button 
              disabled={isLoading || context.state === "" || !context.age || context.isRegistered === undefined} 
              type="submit" 
              className="w-full relative h-[3.5rem] text-lg font-bold text-white bg-slate-900 overflow-hidden group rounded-[1.2rem] shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse delay-75"></div>
                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse delay-150"></div>
                  </div>
                ) : (
                  <>Start My Guide <Sparkles className="w-4 h-4 ml-2" /></>
                )}
              </span>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
