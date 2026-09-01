'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { AdminAuthGate } from '@/components/admin/AdminAuthGate';
import { EventsManagerView } from '@/components/admin/EventsManagerView';
import { RegistrationsLedgerView } from '@/components/admin/RegistrationsLedgerView';
import { LeadsLedgerView } from '@/components/admin/LeadsLedgerView';
import { SettingsModal } from '@/components/admin/SettingsModal';
import { getAssetPath } from '@/utils/assets';

export default function AdminPage() {
  const { theme, toggleTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<'events' | 'registrations' | 'leads'>('events');
  const [selectedEventFilter, setSelectedEventFilter] = useState<string>('all');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const logged = sessionStorage.getItem('sireesha_admin_logged_in') === 'true';
      setIsAuthenticated(logged);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('sireesha_admin_logged_in');
    setIsAuthenticated(false);
  };

  const handleViewRegistrations = (eventId?: string) => {
    setSelectedEventFilter(eventId || 'all');
    setActiveView('registrations');
  };

  if (!isAuthenticated) {
    return <AdminAuthGate onUnlock={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="admin-dashboard unlocked">
      {/* Sticky Top Admin Header */}
      <header className="admin-sticky-nav">
        <div className="nav-container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="brand-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={getAssetPath('assets/images/logo.png')} alt="Logo" width="40" height="40" />
            <div className="brand-text">
              <span className="brand-name" style={{ fontWeight: 700, fontSize: '1.05rem', display: 'block', color: 'var(--text-primary)' }}>Sireesha Puduru</span>
              <span className="brand-tagline" style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', letterSpacing: '0.05em' }}>Admin Sanctuary Desk</span>
            </div>
          </div>

          <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={toggleTheme}
              title="Switch Ambiance Theme Mode"
            >
              {theme === 'dawn' ? '☀️ Ethereal Dawn Mode' : '🌙 Sacred Twilight Mode'}
            </button>
            <Link href="/" target="_blank" className="btn btn-secondary btn-sm">
              View Live Site ↗
            </Link>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setIsSettingsOpen(true)}
            >
              ⚙️ Settings
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleLogout}
              style={{ color: 'var(--accent-rose)' }}
            >
              Lock / Logout 🔒
            </button>
          </div>
        </div>
      </header>

      <div className="container" style={{ maxWidth: '1240px', paddingTop: '1rem' }}>
        {/* Navigation Tabs */}
        <div className="admin-nav-tabs">
          <button
            type="button"
            className={`admin-tab-btn ${activeView === 'events' ? 'active' : ''}`}
            onClick={() => setActiveView('events')}
          >
            📅 Events & Workshops Manager
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeView === 'registrations' ? 'active' : ''}`}
            onClick={() => {
              setSelectedEventFilter('all');
              setActiveView('registrations');
            }}
          >
            🎟️ Event Registrations & Attendees
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeView === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveView('leads')}
          >
            📥 Discovery Calls & Client Inquiries
          </button>
        </div>

        {/* Views */}
        {activeView === 'events' && (
          <EventsManagerView onViewRegistrations={handleViewRegistrations} />
        )}

        {activeView === 'registrations' && (
          <RegistrationsLedgerView initialEventId={selectedEventFilter} />
        )}

        {activeView === 'leads' && (
          <LeadsLedgerView />
        )}
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
