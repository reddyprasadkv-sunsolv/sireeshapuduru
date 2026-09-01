'use client';

import { useState, useEffect, useCallback } from 'react';
import { Event, EventRegistration } from '@/types';

const EVENTS_KEY = 'sireesha_events_v1';
const REGISTRATIONS_KEY = 'sireesha_event_registrations_v1';

const DEFAULT_EVENTS: Event[] = [
  {
    id: 'evt-1',
    title: '2-Day Heal Your Life® Transformational Immersion',
    description: 'Based on Louise Hay philosophy. A sacred, in-person weekend to release emotional baggage, forgive past hurts, practice powerful mirror work, and reprogram subconscious self-worth.',
    banner: 'assets/images/sanctuary.png',
    date: '2026-09-26',
    endDate: '2026-09-27',
    time: '09:30 AM – 05:30 PM IST',
    status: 'upcoming',
    locationType: 'offline',
    locationAddress: 'The Sacred Sanctuary Hall, Indiranagar, Bengaluru, Karnataka 560038',
    featured: true,
  },
  {
    id: 'evt-2',
    title: 'Sacred Heart Mirror Work & Emotional Clearing Masterclass',
    description: 'A deeply personal online masterclass on rewiring inner dialogue, establishing unshakable self-compassion, and dissolving anxiety through Louise Hay heart meditations.',
    banner: 'assets/images/meditation.png',
    date: '2026-10-10',
    time: '10:00 AM – 01:30 PM IST',
    status: 'upcoming',
    locationType: 'online',
    locationAddress: 'Online via Virtual Zoom Sanctuary (Private link upon registration)',
    featured: false,
  },
  {
    id: 'evt-3',
    title: 'The Art of Loving: Inner Child Healing & Boundary Sanctuary',
    description: 'A private experiential circle dedicated to reconnecting with your inner child, rewriting childhood conditioning, and communicating boundaries with grace and confidence.',
    banner: 'assets/images/self-love.png',
    date: '2026-08-15',
    endDate: '2026-08-16',
    time: '09:30 AM – 05:30 PM IST',
    status: 'past',
    locationType: 'offline',
    locationAddress: 'Leela Palace Wellness Retreat Center, Old Airport Road, Bengaluru',
    featured: false,
  },
  {
    id: 'evt-4',
    title: 'Self-Love Awakening & Abundance Mindset Online Retreat',
    description: 'Global virtual gathering focusing on money energy, deservingness, and breaking fear barriers with Louise Hay guided mirror rituals and interactive group coaching.',
    banner: 'assets/images/connect.png',
    date: '2026-07-20',
    time: '06:00 PM – 09:30 PM IST',
    status: 'past',
    locationType: 'online',
    locationAddress: 'Online Zoom Interactive Room',
    featured: false,
  },
];

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize and load from LocalStorage
  useEffect(() => {
    let initialEvents: Event[] = [];
    try {
      const stored = localStorage.getItem(EVENTS_KEY);
      if (stored) {
        initialEvents = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse stored events', e);
    }

    if (!initialEvents || initialEvents.length === 0) {
      initialEvents = DEFAULT_EVENTS;
      localStorage.setItem(EVENTS_KEY, JSON.stringify(DEFAULT_EVENTS));
    }
    setEvents(initialEvents);

    try {
      const storedRegs = localStorage.getItem(REGISTRATIONS_KEY);
      if (storedRegs) {
        setRegistrations(JSON.parse(storedRegs));
      }
    } catch (e) {
      console.error('Failed to parse stored registrations', e);
    }

    setIsLoaded(true);
  }, []);

  const saveEvent = useCallback((eventData: Partial<Event> & { title: string; date: string; time: string; locationType: 'online' | 'offline' }) => {
    setEvents(prevEvents => {
      let updated: Event[];
      if (eventData.id) {
        updated = prevEvents.map(e => e.id === eventData.id ? { ...e, ...eventData } as Event : e);
      } else {
        const newEvent: Event = {
          id: 'evt-' + Date.now(),
          title: eventData.title,
          description: eventData.description || '',
          banner: eventData.banner || 'assets/images/workshop-1.png',
          date: eventData.date,
          endDate: eventData.endDate,
          time: eventData.time,
          status: eventData.status || 'upcoming',
          locationType: eventData.locationType,
          locationAddress: eventData.locationAddress || (eventData.locationType === 'online' ? 'Online via Zoom Sanctuary' : 'The Sanctuary Hall, Indiranagar, Bengaluru'),
          featured: Boolean(eventData.featured),
        };
        updated = [newEvent, ...prevEvents];
      }
      localStorage.setItem(EVENTS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteEvent = useCallback((eventId: string) => {
    setEvents(prev => {
      const updated = prev.filter(e => e.id !== eventId);
      localStorage.setItem(EVENTS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const registerUser = useCallback((data: {
    eventId: string;
    eventTitle: string;
    eventDate: string;
    locationType: string;
    locationAddress: string;
    name: string;
    email: string;
    phone: string;
    notes?: string;
  }) => {
    const newReg: EventRegistration = {
      id: 'reg-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      ...data,
      status: 'Registered',
    };

    setRegistrations(prev => {
      const updated = [newReg, ...prev];
      localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));
      return updated;
    });

    // Also forward to Google Sheets Webhook if configured
    const webhookUrl = localStorage.getItem('sireesha_sheets_webhook_url');
    if (webhookUrl) {
      try {
        fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newReg),
        }).catch(() => {});
      } catch (e) {}
    }

    return newReg;
  }, []);

  const updateRegistrationStatus = useCallback((regId: string, newStatus: EventRegistration['status']) => {
    setRegistrations(prev => {
      const updated = prev.map(r => r.id === regId ? { ...r, status: newStatus } : r);
      localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteRegistration = useCallback((regId: string) => {
    setRegistrations(prev => {
      const updated = prev.filter(r => r.id !== regId);
      localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const exportRegistrationsCSV = useCallback((filterEventId?: string) => {
    const target = filterEventId && filterEventId !== 'all' 
      ? registrations.filter(r => r.eventId === filterEventId)
      : registrations;

    if (target.length === 0) {
      alert('No registrations available to export.');
      return;
    }

    const headers = ['Registration ID', 'Date/Time', 'Event Title', 'Event Date', 'Location Mode', 'Address/Platform', 'Participant Name', 'Email', 'Phone', 'Notes', 'Status'];
    const rows = target.map(r => [
      `"${r.id}"`,
      `"${r.timestamp}"`,
      `"${(r.eventTitle || '').replace(/"/g, '""')}"`,
      `"${r.eventDate || ''}"`,
      `"${r.locationType || ''}"`,
      `"${(r.locationAddress || '').replace(/"/g, '""')}"`,
      `"${(r.name || '').replace(/"/g, '""')}"`,
      `"${r.email || ''}"`,
      `"${r.phone || ''}"`,
      `"${(r.notes || '').replace(/"/g, '""')}"`,
      `"${r.status || 'Registered'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Sireesha_Event_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [registrations]);

  return {
    events,
    registrations,
    isLoaded,
    saveEvent,
    deleteEvent,
    registerUser,
    updateRegistrationStatus,
    deleteRegistration,
    exportRegistrationsCSV,
  };
}
