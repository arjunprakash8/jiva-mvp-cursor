import { useMemo } from 'react';
import { useBle } from '../ble/BleContext';
import { JivaData, User } from '../types';

function genTrend(base: number, variance: number, days = 30) {
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    value: Math.round(base + (Math.sin(i / 4) * variance) + (Math.random() - 0.5) * variance * 0.5),
  }));
}

function buildMockData(): JivaData {
  return {
    hr: 72,
    hrv: 45,
    spo2: 98,
    rhr: 58,
    skinTemp: 0.2,
    respRate: 16,
    strain: 12.4,
    readiness: 78,
    sleepScore: 82,
    sleepTotal: 7.2,
    sleepPhases: [
      { name: 'Deep', duration: 1.8, color: '#818CF8' },
      { name: 'REM', duration: 1.5, color: '#A78BFA' },
      { name: 'Light', duration: 3.2, color: '#6366F1' },
      { name: 'Awake', duration: 0.7, color: '#475569' },
    ],
    ecgBpm: 72,
    activities: [
      { id: '1', name: 'Morning Run', strain: 8.2, duration: 42, calories: 380, time: '07:15' },
      { id: '2', name: 'Strength Training', strain: 12.4, duration: 55, calories: 420, time: '17:30' },
      { id: '3', name: 'Evening Walk', strain: 3.1, duration: 25, calories: 120, time: '20:00' },
    ],
    meals: [
      { id: '1', name: 'Oatmeal & Berries', type: 'breakfast', calories: 380, protein: 12, carbs: 58, fat: 8, time: '08:00' },
      { id: '2', name: 'Grilled Chicken Salad', type: 'lunch', calories: 520, protein: 42, carbs: 28, fat: 22, time: '12:30' },
      { id: '3', name: 'Salmon & Rice', type: 'dinner', calories: 640, protein: 48, carbs: 52, fat: 18, time: '19:00' },
      { id: '4', name: 'Protein Shake', type: 'snack', calories: 180, protein: 30, carbs: 8, fat: 3, time: '15:00' },
    ],
    events: [
      { id: '1', title: 'Saturday Group Run', date: 'Sat, May 31', time: '08:00', location: 'Central Park', attendees: 8 },
      { id: '2', title: 'Recovery Yoga Session', date: 'Sun, Jun 1', time: '10:00', location: 'Studio B', attendees: 5 },
    ],
    squads: [
      {
        id: '1',
        name: 'Morning Warriors',
        members: 12,
        inviteCode: 'JIVA-4829',
        messages: [
          { id: '1', author: 'Alex', text: 'Great run today! 🔥', time: '08:45' },
          { id: '2', author: 'Sam', text: 'Recovery score looking good', time: '09:12' },
          { id: '3', author: 'Jordan', text: 'Who\'s in for Saturday?', time: '10:30' },
        ],
      },
    ],
    hrTrend: genTrend(72, 8),
    hrvTrend: genTrend(45, 10),
    spo2Trend: genTrend(98, 2),
    rhrTrend: genTrend(58, 4),
    tempTrend: genTrend(0.2, 0.5),
    respTrend: genTrend(16, 3),
    caloriesIn: 1720,
    caloriesOut: 2140,
    macros: { protein: 132, carbs: 146, fat: 51 },
    recoveryProtocols: [
      { id: '1', name: 'Box Breathing', duration: 300, description: '4-4-4-4 breath cycle for nervous system reset' },
      { id: '2', name: 'Cold Exposure', duration: 180, description: 'Cold shower or ice bath protocol' },
      { id: '3', name: 'Mobility Flow', duration: 600, description: 'Full body mobility sequence' },
    ],
    cycleDay: 14,
    cycleLength: 28,
    journalPrompt: 'How did your body feel during today\'s workout?',
    aiMessages: [
      { role: 'assistant', text: 'Good morning! Your recovery score is 78 — you\'re well rested. Consider a moderate strain day.' },
    ],
  };
}

export function useJivaData(_user?: User | null): JivaData {
  const { metrics, connectionState } = useBle();
  const isLive = connectionState === 'CONNECTED';

  const mock = useMemo(() => buildMockData(), []);

  return {
    ...mock,
    hr: isLive && metrics.heartRate != null ? metrics.heartRate : mock.hr,
    hrv: isLive && metrics.hrv != null ? metrics.hrv : mock.hrv,
    spo2: isLive && metrics.spo2 != null ? metrics.spo2 : mock.spo2,
    rhr: isLive && metrics.rhr != null ? metrics.rhr : mock.rhr,
    respRate: isLive && metrics.respRate != null ? metrics.respRate : mock.respRate,
    skinTemp: isLive && metrics.skinTempDelta != null ? metrics.skinTempDelta : mock.skinTemp,
    ecgBpm: isLive && metrics.heartRate != null ? metrics.heartRate : mock.ecgBpm,
  };
}
