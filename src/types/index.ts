export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  weight?: number;
  height?: number;
  gender?: string;
}

export interface SleepPhase {
  name: string;
  duration: number;
  color: string;
}

export interface Activity {
  id: string;
  name: string;
  strain: number;
  duration: number;
  calories: number;
  time: string;
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

export interface SquadEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
}

export interface SquadMessage {
  id: string;
  author: string;
  text: string;
  time: string;
}

export interface Squad {
  id: string;
  name: string;
  members: number;
  inviteCode: string;
  messages: SquadMessage[];
}

export interface RecoveryProtocol {
  id: string;
  name: string;
  duration: number;
  description: string;
}

export interface Sport {
  id: string;
  name: string;
  icon: string;
  strainMultiplier: number;
  muscleGroups: string[];
}

export interface Stretch {
  id: string;
  name: string;
  duration: number;
  target: string;
  instructions: string;
}

export interface TrendPoint {
  day: number;
  value: number;
}

export type TabId = 'pulse' | 'biometrics' | 'activity' | 'fuel' | 'recovery' | 'hub';

export type AuthScreen = 'landing' | 'login' | 'signup' | 'dashboard';

export interface JivaData {
  hr: number;
  hrv: number;
  spo2: number;
  rhr: number;
  skinTemp: number;
  respRate: number;
  strain: number;
  readiness: number;
  sleepScore: number;
  sleepTotal: number;
  sleepPhases: SleepPhase[];
  ecgBpm: number;
  activities: Activity[];
  meals: Meal[];
  events: SquadEvent[];
  squads: Squad[];
  hrTrend: TrendPoint[];
  hrvTrend: TrendPoint[];
  spo2Trend: TrendPoint[];
  rhrTrend: TrendPoint[];
  tempTrend: TrendPoint[];
  respTrend: TrendPoint[];
  caloriesIn: number;
  caloriesOut: number;
  macros: { protein: number; carbs: number; fat: number };
  recoveryProtocols: RecoveryProtocol[];
  cycleDay: number;
  cycleLength: number;
  journalPrompt: string;
  aiMessages: { role: 'user' | 'assistant'; text: string }[];
}
