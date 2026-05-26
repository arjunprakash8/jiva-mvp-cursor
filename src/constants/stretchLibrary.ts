import { Stretch } from '../types';

export const STRETCH_LIBRARY: Record<string, Stretch[]> = {
  quads: [
    { id: 'q1', name: 'Standing Quad Stretch', duration: 30, target: 'Quadriceps', instructions: 'Pull heel to glute, hold balance.' },
    { id: 'q2', name: 'Couch Stretch', duration: 45, target: 'Quadriceps', instructions: 'Back knee on floor, foot on wall behind.' },
  ],
  hamstrings: [
    { id: 'h1', name: 'Seated Forward Fold', duration: 45, target: 'Hamstrings', instructions: 'Reach for toes, keep back flat.' },
    { id: 'h2', name: 'Standing Toe Touch', duration: 30, target: 'Hamstrings', instructions: 'Hinge at hips, reach for floor.' },
  ],
  calves: [
    { id: 'c1', name: 'Wall Calf Stretch', duration: 30, target: 'Calves', instructions: 'Lean into wall, back leg straight.' },
  ],
  shoulders: [
    { id: 's1', name: 'Cross-Body Shoulder', duration: 30, target: 'Shoulders', instructions: 'Pull arm across chest.' },
    { id: 's2', name: 'Doorway Pec Stretch', duration: 45, target: 'Chest/Shoulders', instructions: 'Arms on door frame, lean forward.' },
  ],
  core: [
    { id: 'co1', name: 'Cat-Cow', duration: 60, target: 'Spine/Core', instructions: 'Alternate arch and round spine.' },
  ],
  glutes: [
    { id: 'g1', name: 'Pigeon Pose', duration: 60, target: 'Glutes/Hips', instructions: 'Front shin parallel, sink hips.' },
  ],
  full: [
    { id: 'f1', name: 'World\'s Greatest Stretch', duration: 45, target: 'Full Body', instructions: 'Lunge, rotate, reach overhead.' },
  ],
};
