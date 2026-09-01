'use client';

import React, { useState } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { EventRegistration } from '@/types';

interface RegistrationsLedgerViewProps {
  initialEventId?: string;
}

export const RegistrationsLedgerView: React.FC<RegistrationsLedgerViewProps> = ({ initialEventId = 'all' }) => {
  const { events, registrations, updateRegistrationStatus, deleteRegistration, exportRegistrationsCSV } = useEvents();
  const [eventFilter, setEventFilter] = useState(initialEventId);
  const [search, setSearch] = useState('');

  let filtered = registrations;
  if (eventFilter && eventFilter !== 'all') {
    filtered = filtered.filter(r => r.eventId === eventFilter);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      r.eventTitle.toLowerCase().includes(q) ||
      (r.notes && r.notes.toLowerCase().includes(q))
    );
  }

  return (
    <div className="admin-view-panel active">
      <div className="admin-header-bar">
        <div>
          <span className="eyebrow" style={{ color: 'var(--accent-gold)' }}>Attendee Management</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginTop: '0.25rem' }}>
            Event Registrations & <span className="gradient-text">Attendees</span>
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            View and manage participants who registered for your upcoming and past events.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-primary" onClick={() => exportRegistrationsCSV(eventFilter)}>
            📥 Export Registrations (.csv)
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="controls-bar">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <label htmlFor="regEventFilter" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Filter by Event:
          </label>
          <select
            id="regEventFilter"
            className="form-control"
            style={{ maxWidth: '320px', padding: '6px 12px', fontSize: '0.88rem' }}
            value={eventFilter}
            onChange={e => setEventFilter(e.target.value)}
          >
            <option value="all">All Events</option>
            {events.map(e => (
              <option key={e.id} value={e.id}>{e.title}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', minWidth: '260px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by attendee name, email, phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '8px 12px', fontSize: '0.88rem' }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Date / Time</th>
              <th>Participant Name</th>
              <th>WhatsApp Contact</th>
              <th>Email Address</th>
              <th>Event Registered</th>
              <th>Location / Mode</th>
              <th>Notes / Intentions</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map(reg => {
                const cleanPhone = (reg.phone || '').replace(/[^0-9]/g, '');
                const isOnline = (reg.locationType || 'online').toLowerCase() === 'online';
                const whatsappLink = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(`Hi ${reg.name || ''}, this is Sireesha Puduru regarding your registration for "${reg.eventTitle}".`)}`;

                return (
                  <tr key={reg.id}>
                    <td style={{ whiteSpace: 'nowrap', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {reg.timestamp}
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {reg.name}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {cleanPhone ? (
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-btn" title="Open WhatsApp Chat">
                          💬 {reg.phone}
                        </a>
                      ) : '—'}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {reg.email ? (
                        <a href={`mailto:${reg.email}`} style={{ color: 'var(--accent-gold)', textDecoration: 'underline' }}>
                          {reg.email}
                        </a>
                      ) : '—'}
                    </td>
                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                      {reg.eventTitle}
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{reg.eventDate}</div>
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>
                      <span className={`type-badge ${isOnline ? 'event-type' : 'message'}`}>
                        {isOnline ? '🌐 Online' : '📍 Venue'}
                      </span>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>{reg.locationAddress}</div>
                    </td>
                    <td style={{ maxWidth: '220px', fontSize: '0.85rem', lineHeight: 1.4 }}>
                      {reg.notes || '—'}
                    </td>
                    <td>
                      <select
                        className="status-select"
                        value={reg.status}
                        onChange={e => updateRegistrationStatus(reg.id, e.target.value as EventRegistration['status'])}
                      >
                        <option value="Registered">🟡 Registered</option>
                        <option value="Confirmed">🟢 Confirmed</option>
                        <option value="Attended">✨ Attended</option>
                        <option value="Cancelled">✕ Cancelled</option>
                      </select>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        className="delete-lead-btn"
                        onClick={() => {
                          if (confirm('Delete this registration record?')) deleteRegistration(reg.id);
                        }}
                        title="Delete record"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  No participant registrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing {filtered.length} of {registrations.length} registrations
        </span>
      </div>
    </div>
  );
};
