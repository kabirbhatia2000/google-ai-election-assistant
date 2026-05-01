import React, { useState } from 'react';
import { LandingScreen } from '@/features/landing/LandingScreen';
import { OnboardingFlow, UserPersona } from '@/features/onboarding/OnboardingFlow';
import { EligibilityScreen } from '@/features/eligibility/EligibilityScreen';
import { Dashboard } from '@/features/dashboard/Dashboard';
import { ExplainerMode } from '@/features/explainer/ExplainerMode';
import { DocumentsView } from '@/features/documents/DocumentsView';
import { apiService } from '@/services/api';

type ViewState = 'LANDING' | 'ONBOARDING' | 'ELIGIBILITY' | 'DASHBOARD' | 'EXPLAINER' | 'DOCUMENTS';

export interface UserData {
  persona: UserPersona;
  dob: string;
  location: string;
}

export const MainJourney: React.FC = () => {
  const [view, setView] = useState<ViewState>('LANDING');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  // GUEST-FIRST PERSISTENCE: Restore session on mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('voter_data');
    const savedSession = localStorage.getItem('voter_session');
    if (savedData && savedSession) {
      setUserData(JSON.parse(savedData));
      setSessionId(savedSession);
      setView('DASHBOARD'); // Jump straight to dashboard if returning
    }
  }, []);

  const handleStartOnboarding = () => {
    setView('ONBOARDING');
  };

  const handleOnboardingComplete = async (data: UserData) => {
    setUserData(data);
    setIsInitializing(true);
    
    // Immediate local save
    localStorage.setItem('voter_data', JSON.stringify(data));
    
    try {
      // PERSIST TO BACKEND
      const response = await apiService.onboard({
        persona: data.persona as any,
        dob: data.dob,
        location: data.location
      });
      setSessionId(response.sessionId);
      localStorage.setItem('voter_session', response.sessionId);
      setView('ELIGIBILITY');
    } catch (error) {
      console.error("Onboarding backend failure:", error);
      // Fallback to locally proceeding so UI isn't blocked
      setView('ELIGIBILITY');
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <main className="min-h-screen">
      {view === 'LANDING' && <LandingScreen onStart={handleStartOnboarding} />}
      
      {view === 'ONBOARDING' && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}

      {view === 'ELIGIBILITY' && userData && (
        <EligibilityScreen 
          persona={userData.persona}
          dob={userData.dob} 
          location={userData.location} 
          onContinue={() => setView('DASHBOARD')} 
        />
      )}

      {view === 'DASHBOARD' && userData && (
        <Dashboard 
          location={userData.location} 
          sessionId={sessionId || ''} 
          onOpenExplainer={() => setView('EXPLAINER')}
          onOpenDocuments={() => setView('DOCUMENTS')}
        />
      )}

      {view === 'EXPLAINER' && (
        <ExplainerMode onBack={() => setView('DASHBOARD')} />
      )}

      {view === 'DOCUMENTS' && (
        <DocumentsView onBack={() => setView('DASHBOARD')} />
      )}
    </main>
  );
};
