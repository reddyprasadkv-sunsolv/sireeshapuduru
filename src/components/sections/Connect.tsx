'use client';

import React, { useState } from 'react';
import { useLeads } from '@/hooks/useLeads';
import { useAudio } from '@/hooks/useAudio';

interface ConnectProps {
  onOpenDiscovery: () => void;
}

export const Connect: React.FC<ConnectProps> = ({ onOpenDiscovery }) => {
  const { captureLead } = useLeads();
  const { playSingingBowlChime } = useAudio();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    captureLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      type: 'Direct Contact Message',
      details: formData.message,
    });

    playSingingBowlChime(528);
    setSubmitted(true);
  };

  return (
    <section className="connect-section" id="connect">
      <div className="container">
        <div className="connect-grid">
          {/* Left Column */}
          <div className="connect-info-col">
            <span className="eyebrow">Direct Sanctuary Line</span>
            <h2 className="connect-title">
              Let Us Begin Your <span className="gradient-text">Sacred Return</span>
            </h2>
            <p className="connect-desc">
              Have a question about an upcoming workshop, 1-on-1 mentorship, or feeling called to explore if this space is right for you? Sireesha and her sanctuary team are here to listen with an open heart.
            </p>

            <div className="contact-details-list">
              <div className="contact-detail-item">
                <span className="detail-icon">💬</span>
                <div>
                  <strong>WhatsApp Sanctuary Desk</strong>
                  <p>+91 9866157263 (Instant response & private audio connect)</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <span className="detail-icon">📍</span>
                <div>
                  <strong>In-Person Sanctuary Hall</strong>
                  <p>Indiranagar, Bengaluru, Karnataka 560038, India</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <span className="detail-icon">🌐</span>
                <div>
                  <strong>Global Virtual Sessions</strong>
                  <p>Worldwide via Zoom encrypted sanctuary links</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={onOpenDiscovery}
              >
                Book 20-Min Discovery Call ✨
              </button>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="connect-form-card">
            {!submitted ? (
              <>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  Send a Heart Message
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Every message is received in strict confidence by Sireesha.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="form-group" style={{ marginBottom: '1.2rem' }}>
                    <label className="form-label" htmlFor="contactName">Your Name *</label>
                    <input
                      type="text"
                      id="contactName"
                      required
                      className="form-control"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contactPhone">WhatsApp Phone *</label>
                      <input
                        type="tel"
                        id="contactPhone"
                        required
                        className="form-control"
                        placeholder="+91 9866157263"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contactEmail">Email Address</label>
                      <input
                        type="email"
                        id="contactEmail"
                        className="form-control"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label" htmlFor="contactMessage">How can Sireesha support your journey?</label>
                    <textarea
                      id="contactMessage"
                      className="form-control"
                      rows={3}
                      placeholder="Share a few words about what you are going through..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Send Message to Sanctuary ✨
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🕊️</div>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
                  Message Received in Peace
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Thank you, <strong>{formData.name}</strong>. Sireesha will personally review your note and connect with you via WhatsApp.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', message: '' });
                  }}
                >
                  Send Another Note
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
