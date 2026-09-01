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
          <div className="connect-info">
            <div className="eyebrow">
              <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Direct Sanctuary Line
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '1rem', lineHeight: '1.2' }}>
              Let Us Begin Your <span className="gradient-text">Sacred Return</span>
            </h2>
            <p className="lead" style={{ marginBottom: '2rem' }}>
              Have a question about an upcoming workshop, 1-on-1 mentorship, or feeling called to explore if this space is right for you? Sireesha and her sanctuary team are here to listen with an open heart.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>💬</div>
                <div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '1rem' }}>WhatsApp Sanctuary Desk</strong>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-secondary)' }}>+91 9866157263 (Instant response & private audio connect)</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>📍</div>
                <div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '1rem' }}>In-Person Sanctuary Hall</strong>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-secondary)' }}>Indiranagar, Bengaluru, Karnataka 560038, India</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>🌐</div>
                <div>
                  <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '1rem' }}>Global Virtual Sessions</strong>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-secondary)' }}>Worldwide via Zoom encrypted sanctuary links</p>
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={onOpenDiscovery}
              >
                Book 20-Min Discovery Call ✨
              </button>
            </div>
          </div>

          {/* Right Column: Contact Form Card */}
          <div className="connect-card">
            {!submitted ? (
              <>
                <h3 style={{ fontSize: '1.65rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                  Send a Heart Message
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                  Every message is received in strict confidence by Sireesha.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
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

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
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

                    <div className="form-group" style={{ marginBottom: 0 }}>
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

                  <div className="form-group">
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

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Send Message to Sanctuary ✨
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🕊️</div>
                <h3 style={{ fontSize: '1.7rem', color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>
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
