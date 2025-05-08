export type EventType = 'hackathon' | 'tech-talk' | 'workshop' | 'other';

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  link?: string;
  organizer: string;
  type: EventType;
  approved: boolean;
  featured?: boolean;
  imageUrl?: string;
}

export interface EventFilter {
  search?: string;
  type?: EventType;
  date?: string;
  organizer?: string;
  location?: string;
}