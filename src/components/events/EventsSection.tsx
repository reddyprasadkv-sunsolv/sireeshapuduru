'use client';

import React, { useState } from 'react';
import { Event } from '@/types';
import { useEvents } from '@/hooks/useEvents';
import { EventCard } from './EventCard';
import { EventRegistrationModal } from './EventRegistrationModal';

interface EventsSectionProps {
  onOpenDiscoveryWithEvent?: (eventTitle: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onOpenDiscoveryWithEvent }) => {
  const { events } = useEvents();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = events.filter(e => {
    if (activeTab === 'upcoming') {
      return e.status === 'upcoming' || (!e.status && new Date(e.date) >= new Date());
    } else {
      return e.status === 'past' || (e.status !== 'upcoming' && new Date(e.date) < new Date());
    }
  });

  return (
    <section className="events-section" id="events">
      <div className="container">
        <div className="section-header text-center">
          <span className="eyebrow">Sacred Immersions & Circles</span>
          <h2 className="section-title">
            Upcoming & Past <span className="gradient-text">Sanctuary Gatherings</span>
          </h2>
          <p className="section-subtitle">
            Join Sireesha in person in Hyderabad or virtually from anywhere in the world.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="events-tabs-wrap">
          <button
            type="button"
            className={`event-tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            🌟 Upcoming Gatherings
          </button>
          <button
            type="button"
            className={`event-tab-btn ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            🕊️ Past Events & Archive
          </button>
        </div>

        {/* Events Grid */}
        <div className="events-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(evt => (
              <EventCard
                key={evt.id}
                event={evt}
                onRegister={event => setSelectedEvent(event)}
                onInquirePast={event => {
                  if (onOpenDiscoveryWithEvent) {
                    onOpenDiscoveryWithEvent(event.title);
                  }
                }}
              />
            ))
          ) : (
            <div className="empty-events-state" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3.5rem 1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🕊️</div>
              <h3>{activeTab === 'upcoming' ? 'New Gatherings Announcing Soon' : 'No Past Events in Archive'}</h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 1.5rem auto' }}>
                {activeTab === 'upcoming'
                  ? 'Sireesha is preparing upcoming sacred workshops. Stay connected on WhatsApp to be notified first.'
                  : 'Past retreat recordings and retrospectives will appear here.'}
              </p>
              <a
                href="https://api.whatsapp.com/send?phone=919866157263&text=Hi%20Sireesha%2C%20please%20notify%20me%20of%20upcoming%20workshops."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                💬 Join WhatsApp Notification List
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Registration Modal */}
      {selectedEvent && (
        <EventRegistrationModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
};
