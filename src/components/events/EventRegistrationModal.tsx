'use client';

import React, { useState } from 'react';
import { Event } from '@/types';
import { useEvents } from '@/hooks/useEvents';
import { useAudio } from '@/hooks/useAudio';

interface EventRegistrationModalProps {
  event: Event | null;
  onClose: () => void;
}

export const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({ event, onClose }) => {
  const { registerUser } = useEvents();
  const { playSingingBowlChime } = useAudio();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and phone number.');
      return;
    }

    registerUser({
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      locationType: event.locationType,
      locationAddress: event.locationAddress,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      notes: formData.notes,
    });

    playSingingBowlChime(528);
    setSubmitted(true);
  };

  const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://api.whatsapp.com/send?phone=919866157263&text=${encodeURIComponent(`Hi Sireesha, I just registered for "${event.title}". My name is ${formData.name}.`)}`;

  return (
    <div className="modal-overlay active" role="dialog" aria-modal="true">
      <div className="modal-card" style={{ maxWidth: '640px' }}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">✕</button>

        {!submitted ? (
          <>
            <div className="modal-header">
              <span className="eyebrow" style={{ color: 'var(--accent-gold)' }}>Event Registration</span>
              <h2 className="modal-title" style={{ fontSize: '1.75rem', marginTop: '0.4rem' }}>{event.title}</h2>
              <p className="modal-subtitle" style={{ fontSize: '0.92rem', marginTop: '6px' }}>
                📅 {event.date} | ⏰ {event.time} | {event.locationType === 'online' ? '🌐 Online Zoom Sanctuary' : `📍 ${event.locationAddress}`}
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
              <div className="form-group" style={{ marginBottom: '1.1rem' }}>
                <label className="form-label" htmlFor="regName">Full Name *</label>
                <input
                  type="text"
                  id="regName"
                  required
                  className="form-control"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="regPhone">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    id="regPhone"
                    required
                    className="form-control"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="regEmail">Email Address (Optional)</label>
                  <input
                    type="email"
                    id="regEmail"
                    className="form-control"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" htmlFor="regNotes">Your Intention / Questions (Optional)</label>
                <textarea
                  id="regNotes"
                  className="form-control"
                  rows={2}
                  placeholder="What is your heart seeking from this workshop?"
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm Registration ✨
                </button>
              </div>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🕊️</div>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
              Registration Confirmed!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Thank you, <strong>{formData.name}</strong>. Your place for <strong>"{event.title}"</strong> has been reserved in Sireesha's sanctuary register.
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                💬 Connect on WhatsApp with Sireesha
              </a>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
