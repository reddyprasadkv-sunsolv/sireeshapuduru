'use client';

import React, { useState } from 'react';
import { Event } from '@/types';
import { useEvents } from '@/hooks/useEvents';
import { EventFormModal } from './EventFormModal';

interface EventsManagerViewProps {
  onViewRegistrations: (eventId?: string) => void;
}

export const EventsManagerView: React.FC<EventsManagerViewProps> = ({ onViewRegistrations }) => {
  const { events, registrations, saveEvent, deleteEvent } = useEvents();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'online' | 'offline'>('all');
  const [search, setSearch] = useState('');
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const upcomingCount = events.filter(e => e.status === 'upcoming').length;
  const pastCount = events.filter(e => e.status === 'past').length;

  let filtered = events;
  if (filter === 'upcoming') filtered = filtered.filter(e => e.status === 'upcoming');
  if (filter === 'past') filtered = filtered.filter(e => e.status === 'past');
  if (filter === 'online') filtered = filtered.filter(e => (e.locationType || '').toLowerCase() === 'online');
  if (filter === 'offline') filtered = filtered.filter(e => (e.locationType || '').toLowerCase() === 'offline');

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.locationAddress.toLowerCase().includes(q)
    );
  }

  const handleOpenNew = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event? Existing registrations will remain preserved.')) {
      deleteEvent(id);
    }
  };

  return (
    <div className="admin-view-panel active">
      <div className="admin-header-bar">
        <div>
          <span className="eyebrow" style={{ color: 'var(--accent-gold)' }}>Academy Events Hub</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginTop: '0.25rem' }}>
            Manage Events & <span className="gradient-text">Immersions</span>
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Create, edit, and manage upcoming workshops, retreat immersions, and past event archives.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-primary" onClick={handleOpenNew}>
            ➕ Post New Event ✨
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => onViewRegistrations()}>
            👥 View All Registrations
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card" style={{ borderTopColor: 'var(--accent-gold)' }}>
          <span className="kpi-label">Total Events Posted</span>
          <div className="kpi-value">{events.length}</div>
        </div>
        <div className="kpi-card" style={{ borderTopColor: 'var(--accent-emerald)' }}>
          <span className="kpi-label">Active Upcoming Events</span>
          <div className="kpi-value" style={{ color: 'var(--accent-emerald)' }}>{upcomingCount}</div>
        </div>
        <div className="kpi-card" style={{ borderTopColor: 'var(--accent-rose)' }}>
          <span className="kpi-label">Past Event Archive</span>
          <div className="kpi-value" style={{ color: 'var(--accent-rose)' }}>{pastCount}</div>
        </div>
        <div className="kpi-card" style={{ borderTopColor: 'var(--accent-gold)' }}>
          <span className="kpi-label">Total Registrations</span>
          <div className="kpi-value" style={{ color: 'var(--accent-gold)' }}>{registrations.length}</div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="controls-bar">
        <div className="filter-pills">
          <button type="button" className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Events</button>
          <button type="button" className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`} onClick={() => setFilter('upcoming')}>🌟 Upcoming</button>
          <button type="button" className={`filter-btn ${filter === 'past' ? 'active' : ''}`} onClick={() => setFilter('past')}>🕊️ Past Archive</button>
          <button type="button" className={`filter-btn ${filter === 'online' ? 'active' : ''}`} onClick={() => setFilter('online')}>🌐 Online</button>
          <button type="button" className={`filter-btn ${filter === 'offline' ? 'active' : ''}`} onClick={() => setFilter('offline')}>📍 In-Person</button>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', minWidth: '260px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search events by title or venue..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '8px 12px', fontSize: '0.88rem' }}
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="admin-events-grid">
        {filtered.length > 0 ? (
          filtered.map(evt => {
            const isOnline = (evt.locationType || 'online').toLowerCase() === 'online';
            const isUpcoming = evt.status === 'upcoming';
            const eventRegs = registrations.filter(r => r.eventId === evt.id);

            return (
              <div key={evt.id} className="admin-event-card">
                <div className="admin-event-img-wrap">
                  <img src={evt.banner || 'assets/images/workshop-1.png'} alt={evt.title} className="admin-event-img" />
                  <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                    <span className={`type-badge ${isOnline ? 'event-type' : 'message'}`}>
                      {isOnline ? '🌐 Online' : '📍 In-Person'}
                    </span>
                    <span className={`type-badge ${isUpcoming ? 'discovery' : ''}`} style={{ background: !isUpcoming ? 'rgba(100,100,100,0.2)' : undefined }}>
                      {isUpcoming ? '🌟 Upcoming' : '🕊️ Past'}
                    </span>
                  </div>
                </div>

                <div className="admin-event-content">
                  <div style={{ fontSize: '0.82rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '4px' }}>
                    📅 {evt.date} | ⏰ {evt.time}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-primary)', lineHeight: '1.3' }}>
                    {evt.title}
                  </h3>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px', background: 'var(--bg-secondary)', padding: '6px 10px', borderRadius: 'var(--radius-sm)', borderLeft: '2px solid var(--accent-gold)' }}>
                    {isOnline ? '🌐 Online: Virtual Zoom Sanctuary' : `📍 Venue: ${evt.locationAddress}`}
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.45', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {evt.description}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => onViewRegistrations(evt.id)}>
                      👥 {eventRegs.length} Registrations
                    </button>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleEdit(evt)} title="Edit event">
                        ✏️ Edit
                      </button>
                      <button type="button" className="delete-lead-btn" onClick={() => handleDelete(evt.id)} title="Delete event">
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px dashed var(--border-medium)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📅</div>
            <h3>No Events Found</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>No events match your current filter or search criteria.</p>
            <button type="button" className="btn btn-primary" onClick={handleOpenNew}>➕ Post New Event</button>
          </div>
        )}
      </div>

      <EventFormModal
        isOpen={isModalOpen}
        event={editingEvent}
        onClose={() => setIsModalOpen(false)}
        onSave={saveEvent}
      />
    </div>
  );
};
