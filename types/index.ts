import type { RiskLevel } from '@/constants/theme';

export type UserRole = 'ecologist' | 'volunteer';

export interface PollutionPoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  risk: RiskLevel;
  particlesPerLiter: number;
  lastSampleDate: string;
  history: SampleRecord[];
}

export interface SampleRecord {
  id: string;
  date: string;
  particlesPerLiter: number;
  risk: RiskLevel;
  fibers: number;
  fragments: number;
  film: number;
}

export interface AiAnalysisResult {
  fibers: number;
  fragments: number;
  film: number;
  particlesPerLiter: number;
  risk: RiskLevel;
  sourcePrediction: string;
  sourceConfidence: number;
  recommendations: string[];
  pointName: string;
}
