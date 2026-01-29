export interface MockClient {
  id: string;
  name: string;
  phone: string;
  scheduledTime: string;
  trainingPrograms: string[];
  attendanceStatus: 'pending' | 'attended' | 'absent' | 'rescheduled';
  membershipStatus: 'active' | 'expiring' | 'expired';
}

export const mockTodaySessions: MockClient[] = [
  {
    id: '1',
    name: 'Ahmed Ali',
    phone: '+960 7777777',
    scheduledTime: '06:00',
    trainingPrograms: ['Strength', 'Body-Trans'],
    attendanceStatus: 'pending',
    membershipStatus: 'active',
  },
  {
    id: '2',
    name: 'Aisha Mohamed',
    phone: '+960 7777778',
    scheduledTime: '07:00',
    trainingPrograms: ['Weight-loss', 'Rehab'],
    attendanceStatus: 'pending',
    membershipStatus: 'expiring',
  },
  {
    id: '3',
    name: 'Ibrahim Hassan',
    phone: '+960 7777779',
    scheduledTime: '08:00',
    trainingPrograms: ['Athlete', 'Strength'],
    attendanceStatus: 'pending',
    membershipStatus: 'active',
  },
  {
    id: '4',
    name: 'Mariyam Rasheed',
    phone: '+960 7777780',
    scheduledTime: '09:00',
    trainingPrograms: ['Volley', 'Body-Trans'],
    attendanceStatus: 'pending',
    membershipStatus: 'active',
  },
  {
    id: '5',
    name: 'Mohamed Shareef',
    phone: '+960 7777781',
    scheduledTime: '09:00', // Same time as Mariyam
    trainingPrograms: ['Strength', 'Athlete'],
    attendanceStatus: 'pending',
    membershipStatus: 'active',
  },
  {
    id: '6',
    name: 'Fathimath Nisha',
    phone: '+960 7777782',
    scheduledTime: '10:00',
    trainingPrograms: ['Body-Trans', 'Weight-loss'],
    attendanceStatus: 'attended',
    membershipStatus: 'active',
  },
  {
    id: '7',
    name: 'Ali Rameez',
    phone: '+960 7777783',
    scheduledTime: '10:00', // Same time as Fathimath
    trainingPrograms: ['Strength', 'Netbees'],
    attendanceStatus: 'attended',
    membershipStatus: 'active',
  },
];
