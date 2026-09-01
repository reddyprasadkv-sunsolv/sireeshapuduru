'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();
  const [webhookUrl, setWebhookUrl] = useState('');
  const [newPasscode, setNewPasscode] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWebhookUrl(localStorage.getItem('sireesha_sheets_webhook_url') || '');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (webhookUrl) {
      localStorage.setItem('sireesha_sheets_webhook_url', webhookUrl);
    }
    if (newPasscode) {
      localStorage.setItem('sireesha_admin_passcode', newPasscode);
      alert('Admin passcode updated successfully!');
    }
    onClose();
    alert('Settings saved successfully.');
  };

  return (
    <div className="modal-overlay active" role="dialog" aria-modal="true">
      <div className="modal-card">
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">✕</button>

        <div style={{ marginBottom: '1.5rem' }}>
          <span className="eyebrow" style={{ color: 'var(--accent-gold)' }}>Admin Configuration</span>
          <h2 style={{ fontSize: '1.8rem', marginTop: '0.5rem' }}>Google Sheets & Webhook Setup</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            Automatically stream new discovery call bookings and messages into a live Google Sheet.
          </p>
        </div>

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label" htmlFor="webhook">Google Sheets Webhook / Apps Script URL</label>
            <input
              type="url"
              id="webhook"
              className="form-control"
              placeholder="https://script.google.com/macros/s/.../exec"
              value={webhookUrl}
              onChange={e => setWebhookUrl(e.target.value)}
            />
            <small style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'block', marginTop: '4px' }}>
              Optional: Leave empty to download CSV spreadsheets directly from this dashboard.
            </small>
          </div>

          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label className="form-label" htmlFor="newPass">Change Admin Passcode (Optional)</label>
            <input
              type="password"
              id="newPass"
              className="form-control"
              placeholder="Enter new passcode to update"
              value={newPasscode}
              onChange={e => setNewPasscode(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label className="form-label">Academy Ambiance & Theme Mode</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="themeRadio"
                  value="twilight"
                  checked={theme === 'twilight'}
                  onChange={() => setTheme('twilight')}
                />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--accent-gold)' }}>🌙 Sacred Twilight</strong>
                  <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Midnight Indigo & Gold</small>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="themeRadio"
                  value="dawn"
                  checked={theme === 'dawn'}
                  onChange={() => setTheme('dawn')}
                />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--accent-gold)' }}>☀️ Ethereal Dawn</strong>
                  <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Warm Ivory & Champagne</small>
                </div>
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
            Save Admin Settings
          </button>
        </form>
      </div>
    </div>
  );
};
