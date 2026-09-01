'use client';

import React, { useState, useEffect } from 'react';
import { Event } from '@/types';

interface EventFormModalProps {
  isOpen: boolean;
  event: Event | null;
  onClose: () => void;
  onSave: (eventData: Partial<Event> & { title: string; date: string; time: string; locationType: 'online' | 'offline' }) => void;
}

export const EventFormModal: React.FC<EventFormModalProps> = ({ isOpen, event, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    banner: 'assets/images/workshop-1.png',
    date: '',
    endDate: '',
    time: '09:30 AM – 05:30 PM IST',
    status: 'upcoming' as 'upcoming' | 'past',
    locationType: 'offline' as 'online' | 'offline',
    locationAddress: 'The Sanctuary Hall, Indiranagar, Bengaluru, Karnataka 560038',
  });

  useEffect(() => {
    if (event) {
      setFormData({
        id: event.id,
        title: event.title,
        description: event.description,
        banner: event.banner || 'assets/images/workshop-1.png',
        date: event.date,
        endDate: event.endDate || '',
        time: event.time,
        status: event.status,
        locationType: event.locationType,
        locationAddress: event.locationAddress,
      });
    } else {
      setFormData({
        id: '',
        title: '',
        description: '',
        banner: 'assets/images/workshop-1.png',
        date: '',
        endDate: '',
        time: '09:30 AM – 05:30 PM IST',
        status: 'upcoming',
        locationType: 'offline',
        locationAddress: 'The Sanctuary Hall, Indiranagar, Bengaluru, Karnataka 560038',
      });
    }
  }, [event, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) {
      alert('Please fill out all required fields.');
      return;
    }

    onSave(formData);
    onClose();
  };

  const handleLocationTypeChange = (type: 'online' | 'offline') => {
    const address = type === 'online'
      ? 'Online via Zoom Sanctuary (Link shared upon registration)'
      : 'The Sanctuary Hall, Indiranagar, Bengaluru, Karnataka 560038';
    setFormData({ ...formData, locationType: type, locationAddress: address });
  };

  return (
    <div className="modal-overlay active" role="dialog" aria-modal="true">
      <div className="modal-card" style={{ maxWidth: '720px' }}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">✕</button>

        <div style={{ marginBottom: '1.5rem' }}>
          <span className="eyebrow" style={{ color: 'var(--accent-gold)' }}>Events Management</span>
          <h2 style={{ fontSize: '1.8rem', marginTop: '0.4rem' }}>
            {formData.id ? 'Edit Event Details' : 'Post New Event'}
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            Publish an upcoming workshop or archive a past gathering.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label" htmlFor="evTitle">Event Title *</label>
            <input
              type="text"
              id="evTitle"
              required
              className="form-control"
              placeholder="e.g. 2-Day Heal Your Life Immersion Workshop"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label" htmlFor="evDesc">Event Description *</label>
            <textarea
              id="evDesc"
              required
              rows={3}
              className="form-control"
              placeholder="Describe the focus, Louise Hay exercises, and transformation benefits..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label" htmlFor="evBanner">Banner Image URL / Path *</label>
            <input
              type="text"
              id="evBanner"
              required
              className="form-control"
              value={formData.banner}
              onChange={e => setFormData({ ...formData, banner: e.target.value })}
            />
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px', flexWrap: 'wrap' }}>
              <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Quick presets:</small>
              <button type="button" className="preset-chip" onClick={() => setFormData({ ...formData, banner: 'assets/images/workshop-1.png' })}>Workshop 1</button>
              <button type="button" className="preset-chip" onClick={() => setFormData({ ...formData, banner: 'assets/images/workshop-2.png' })}>Workshop 2</button>
              <button type="button" className="preset-chip" onClick={() => setFormData({ ...formData, banner: 'assets/images/sanctuary.png' })}>Sanctuary</button>
              <button type="button" className="preset-chip" onClick={() => setFormData({ ...formData, banner: 'assets/images/hero-sireesha.png' })}>Sireesha Portrait</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="evDate">Start Date *</label>
              <input
                type="date"
                id="evDate"
                required
                className="form-control"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="evEndDate">End Date (Optional)</label>
              <input
                type="date"
                id="evEndDate"
                className="form-control"
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="evTime">Time / Duration *</label>
              <input
                type="text"
                id="evTime"
                required
                className="form-control"
                placeholder="09:30 AM – 05:30 PM IST"
                value={formData.time}
                onChange={e => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="evStatus">Event Status *</label>
              <select
                id="evStatus"
                className="form-control"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as 'upcoming' | 'past' })}
              >
                <option value="upcoming">🌟 Upcoming Gathering</option>
                <option value="past">🕊️ Past Event Archive</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">Location Type *</label>
            <div style={{ display: 'flex', gap: '20px', marginTop: '6px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="locType"
                  value="online"
                  checked={formData.locationType === 'online'}
                  onChange={() => handleLocationTypeChange('online')}
                />
                🌐 Online (Virtual Zoom Sanctuary)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="locType"
                  value="offline"
                  checked={formData.locationType === 'offline'}
                  onChange={() => handleLocationTypeChange('offline')}
                />
                📍 Offline (In-Person Venue)
              </label>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label" htmlFor="evLocAddress">
              {formData.locationType === 'online' ? 'Online Platform & Link Instructions *' : 'In-Person Venue & Full Address *'}
            </label>
            <input
              type="text"
              id="evLocAddress"
              required
              className="form-control"
              value={formData.locationAddress}
              onChange={e => setFormData({ ...formData, locationAddress: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Event ✨
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
