'use client';

import React, { useState } from 'react';
import { useLeads } from '@/hooks/useLeads';
import { useAudio } from '@/hooks/useAudio';

interface DiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledNotes?: string;
}

export const DiscoveryModal: React.FC<DiscoveryModalProps> = ({ isOpen, onClose, prefilledNotes = '' }) => {
  const { captureLead } = useLeads();
  const { playSingingBowlChime } = useAudio();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    slot: 'Weekday Morning (10 AM - 1 PM)',
    details: prefilledNotes,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill out your name and phone number.');
      return;
    }

    captureLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      type: 'Discovery Call Booking',
      details: `Preferred Slot: ${formData.slot} | Notes: ${formData.details || 'None'}`,
    });

    playSingingBowlChime(528);
    setSubmitted(true);
  };

  const whatsappUrl = `https://api.whatsapp.com/send?phone=919866157263&text=${encodeURIComponent(`Hi Sireesha, I just booked a Discovery Call. My name is ${formData.name}. Preferred slot: ${formData.slot}.`)}`;

  return (
    <div className="modal-overlay active" role="dialog" aria-modal="true">
      <div className="modal-card" style={{ maxWidth: '640px' }}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">✕</button>

        {!submitted ? (
          <>
            <div className="modal-header">
              <span className="eyebrow" style={{ color: 'var(--accent-gold)' }}>Sacred 1-on-1 Consultation</span>
              <h2 className="modal-title" style={{ fontSize: '1.8rem', marginTop: '0.4rem' }}>
                Book Your 20-Min Discovery Call
              </h2>
              <p className="modal-subtitle" style={{ fontSize: '0.92rem', marginTop: '6px' }}>
                A confidential, zero-pressure audio consultation with Sireesha to explore your healing intentions.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
              <div className="form-group" style={{ marginBottom: '1.1rem' }}>
                <label className="form-label" htmlFor="discName">Your Full Name *</label>
                <input
                  type="text"
                  id="discName"
                  required
                  className="form-control"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="discPhone">WhatsApp Phone Number *</label>
                  <input
                    type="tel"
                    id="discPhone"
                    required
                    className="form-control"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="discEmail">Email Address</label>
                  <input
                    type="email"
                    id="discEmail"
                    className="form-control"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.1rem' }}>
                <label className="form-label" htmlFor="discSlot">Preferred Time Window</label>
                <select
                  id="discSlot"
                  className="form-control"
                  value={formData.slot}
                  onChange={e => setFormData({ ...formData, slot: e.target.value })}
                >
                  <option value="Weekday Morning (10 AM - 1 PM)">Weekday Morning (10 AM - 1 PM IST)</option>
                  <option value="Weekday Evening (4 PM - 7 PM)">Weekday Evening (4 PM - 7 PM IST)</option>
                  <option value="Weekend Morning (11 AM - 2 PM)">Weekend Morning (11 AM - 2 PM IST)</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" htmlFor="discNotes">What would you like to explore? (Optional)</label>
                <textarea
                  id="discNotes"
                  className="form-control"
                  rows={2}
                  placeholder="e.g. Relationship healing, inner critic, 2-day workshop details..."
                  value={formData.details}
                  onChange={e => setFormData({ ...formData, details: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Request Call Schedule ✨
                </button>
              </div>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🕊️</div>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
              Discovery Request Received!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Thank you, <strong>{formData.name}</strong>. Sireesha's sanctuary desk will confirm your scheduled 20-minute audio slot directly on WhatsApp.
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                💬 Open WhatsApp to Confirm Immediately
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
