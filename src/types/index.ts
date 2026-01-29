import { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Client {
  id: string;
  trainerId: string;
  name: string;
  phone: string;
  tierId: string;
  trainingPrograms: string[];
  scheduleSet: 'sunday' | 'saturday' | 'custom';
  customDays?: string[];
  sessionTimes: {
    default?: string;
    mon?: string;
    tue?: string;
    wed?: string;
    thu?: string;
    fri?: string;
    sat?: string;
    sun?: string;
  };
  isArchived: boolean;
  archivedAt: Timestamp | null;
  currentWeight?: number;
  currentWaist?: number;
  currentFatPercent?: number;
  currentHeight?: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Attendance {
  id: string;
  clientId: string;
  trainerId: string;
  scheduledDate: Timestamp;
  scheduledTime: string;
  status: 'scheduled' | 'attended' | 'missed' | 'rescheduled';
  rescheduledTo: Timestamp | null;
  rescheduledFrom: Timestamp | null;
  rescheduleReason: string | null;
  isMakeupSession: boolean;
  originalSessionId: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Payment {
  id: string;
  clientId: string;
  trainerId: string;
  tierId: string;
  amount: number;
  currency: 'MVR';
  paymentDate: Timestamp;
  validUntil: Timestamp;
  createdAt: Timestamp;
}

export interface Progress {
  id: string;
  clientId: string;
  trainerId: string;
  weight: number;
  waist: number;
  fatPercent: number;
  height: number;
  recordedAt: Timestamp;
  createdAt: Timestamp;
}

export interface Tier {
  id: string;
  trainerId: string;
  name: string;
  color: string;
  amount: number;
  maxConcurrentClients: number;
  isDefault: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Exercise {
  exerciseId: string;
  name: string;
  sets: number;
  reps: string;
  notes: string;
  order: number;
}

export interface ExerciseProgram {
  id: string;
  clientId: string;
  trainerId: string;
  dayNumber: number;
  dayName: string;
  exercises: Exercise[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type MembershipStatus = 'active' | 'expiring' | 'expired';
