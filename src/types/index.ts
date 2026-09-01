export interface Event {
  id: string;
  title: string;
  description: string;
  banner: string;
  date: string;       // YYYY-MM-DD
  endDate?: string;  // YYYY-MM-DD for multi-day
  time: string;
  status: 'upcoming' | 'past';
  locationType: 'online' | 'offline';
  locationAddress: string;
  featured?: boolean;
}

export interface EventRegistration {
  id: string;
  timestamp: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  locationType: string;
  locationAddress: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  status: 'Registered' | 'Confirmed' | 'Attended' | 'Cancelled';
}

export interface Lead {
  id: string;
  timestamp: string;
  name: string;
  email?: string;
  phone?: string;
  type: string;
  details?: string;
  status: 'New' | 'Contacted' | 'Session Scheduled' | 'Completed';
  source?: string;
}

export interface Affirmation {
  id: number;
  text: string;
  principle: string;
  theme: string;
  reflection: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: number;
    subtext: string;
  }[];
}

export interface QuizResult {
  title: string;
  tagline: string;
  description: string;
  quote: string;
  score: number;
  percentage: number;
}
