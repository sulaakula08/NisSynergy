import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { UserRole } from '@/types';
import type { AiAnalysisResult } from '@/types';
import { MOCK_AI_RESULT } from '@/constants/mockData';

interface AppState {
  role: UserRole;
  isOnboarded: boolean;
  userName: string;
  lastPhotoUri: string | null;
  aiResult: AiAnalysisResult | null;
  setRole: (role: UserRole) => void;
  completeOnboarding: (name: string, method: string) => void;
  setLastPhotoUri: (uri: string | null) => void;
  runMockAiAnalysis: (pointName?: string) => AiAnalysisResult;
  clearAiResult: () => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('ecologist');
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userName, setUserName] = useState('Эколог');
  const [lastPhotoUri, setLastPhotoUri] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<AiAnalysisResult | null>(null);

  const completeOnboarding = useCallback((name: string, _method: string) => {
    setUserName(name);
    setIsOnboarded(true);
    setRole('volunteer');
  }, []);

  const runMockAiAnalysis = useCallback((pointName?: string) => {
    const result: AiAnalysisResult = {
      ...MOCK_AI_RESULT,
      pointName: pointName ?? MOCK_AI_RESULT.pointName,
      particlesPerLiter: 28 + Math.floor(Math.random() * 12),
    };
    setAiResult(result);
    return result;
  }, []);

  const clearAiResult = useCallback(() => setAiResult(null), []);

  const value = useMemo(
    () => ({
      role,
      isOnboarded,
      userName,
      lastPhotoUri,
      aiResult,
      setRole,
      completeOnboarding,
      setLastPhotoUri,
      runMockAiAnalysis,
      clearAiResult,
    }),
    [role, isOnboarded, userName, lastPhotoUri, aiResult, completeOnboarding, runMockAiAnalysis, clearAiResult],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
