'use client';

import React from 'react';
import { Event } from '@/types';
import { getAssetPath } from '@/utils/assets';

interface EventCardProps {
  event: Event;
  onRegister: (event: Event) => void;
  onInquirePast?: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onRegister, onInquirePast }) => {
  const isOnline = (event.locationType || 'online').toLowerCase() === 'online';
  const isUpcoming = (event.status || 'upcoming') === 'upcoming';

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  const displayDate = formatDisplayDate(event.date);
  const displayEndDate = event.endDate && event.endDate !== event.date ? ' – ' + formatDisplayDate(event.endDate) : '';

  return (
    <article className={`event-card ${event.featured ? 'featured-event' : ''} ${!isUpcoming ? 'past-event-card' : ''}`}>
      <div className="event-banner-wrap">
        <img
          src={getAssetPath(event.banner || 'assets/images/sanctuary.png')}
          alt={event.title}
          className="event-banner-img"
          loading="lazy"
        />
        <div className={`event-type-badge ${isOnline ? 'badge-online' : 'badge-offline'}`}>
          {isOnline ? (
            <>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
              Online Webinar
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              In-Person Venue
            </>
          )}
        </div>
        {!isUpcoming && <div className="event-past-stamp">Completed Archive</div>}
      </div>

      <div className="event-body">
        <div className="event-meta-bar">
          <span className="event-date-pill">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            {displayDate}{displayEndDate}
          </span>
          {event.time && (
            <span className="event-time-pill">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              {event.time}
            </span>
          )}
        </div>

        <h3 className="event-title">{event.title}</h3>

        <div className="event-location-box">
          <div className="location-icon">{isOnline ? '🌐' : '📍'}</div>
          <div className="location-details">
            <strong className="location-type-label">{isOnline ? 'Virtual Sanctuary' : 'Sanctuary Address'}</strong>
            <p className="location-address-text">{event.locationAddress}</p>
          </div>
        </div>

        <p className="event-desc">{event.description}</p>

        <div className="event-footer">
          {isUpcoming ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onRegister(event)}
              style={{ width: '100%' }}
            >
              <span>Register for Event</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onInquirePast && onInquirePast(event)}
              style={{ width: '100%' }}
            >
              Inquire About Next Edition 🕊️
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
