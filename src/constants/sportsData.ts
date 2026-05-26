import { Sport } from '../types';

export const SPORTS_CATALOG: Sport[] = [
  { id: 'run', name: 'Running', icon: 'run', strainMultiplier: 1.2, muscleGroups: ['quads', 'calves', 'glutes'] },
  { id: 'cycle', name: 'Cycling', icon: 'cycle', strainMultiplier: 1.0, muscleGroups: ['quads', 'glutes', 'calves'] },
  { id: 'swim', name: 'Swimming', icon: 'swim', strainMultiplier: 1.1, muscleGroups: ['lats', 'shoulders', 'core'] },
  { id: 'lift', name: 'Weightlifting', icon: 'lift', strainMultiplier: 1.4, muscleGroups: ['chest', 'back', 'arms'] },
  { id: 'yoga', name: 'Yoga', icon: 'yoga', strainMultiplier: 0.5, muscleGroups: ['core', 'hamstrings', 'shoulders'] },
  { id: 'hiit', name: 'HIIT', icon: 'hiit', strainMultiplier: 1.6, muscleGroups: ['full'] },
  { id: 'walk', name: 'Walking', icon: 'walk', strainMultiplier: 0.4, muscleGroups: ['calves', 'glutes'] },
  { id: 'tennis', name: 'Tennis', icon: 'tennis', strainMultiplier: 1.3, muscleGroups: ['shoulders', 'quads', 'core'] },
];
