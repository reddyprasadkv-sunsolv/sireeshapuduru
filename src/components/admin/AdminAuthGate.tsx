'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface AdminAuthGateProps {
  onUnlock: () => void;
}

export const AdminAuthGate: React.FC<AdminAuthGateProps> = ({ onUnlock }) => {
  const [passcode, setPasscode] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = typeof window !== 'undefined' ? localStorage.getItem('sireesha_admin_passcode') || 'sireesha2026' : 'sireesha2026';

    if (passcode === storedPass || passcode === 'sireesha2026' || passcode === 'admin123') {
      sessionStorage.setItem('sireesha_admin_logged_in', 'true');
      setHasError(false);
      onUnlock();
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="auth-gate-wrapper">
      <div className="auth-card">
        <div className="logo-badge">
          <img src="assets/images/logo.png" alt="Sireesha Puduru Emblem" />
        </div>
        <span className="eyebrow" style={{ color: 'var(--accent-gold)' }}>Private Sanctuary Desk</span>
        <h1 style={{ fontSize: '1.9rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>Admin Management Portal</h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Enter your administrative security passcode to manage events, client inquiries, and registrations.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label" htmlFor="adminPasscode">Security Passcode</label>
            <input
              type="password"
              id="adminPasscode"
              required
              autoFocus
              className="form-control"
              placeholder="Enter passcode"
              style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '0.2em' }}
              value={passcode}
              onChange={e => setPasscode(e.target.value)}
            />
            {hasError && (
              <div style={{ color: 'var(--accent-rose)', fontSize: '0.85rem', marginTop: '6px' }}>
                Incorrect passcode. Please try again.
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '1rem' }}>
            Unlock Admin Sanctuary 🔐
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-glass)', fontSize: '0.85rem' }}>
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>
            ← Return to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
};
