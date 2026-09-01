'use client';

import React, { useState } from 'react';
import { useLeads } from '@/hooks/useLeads';
import { Lead } from '@/types';

export const LeadsLedgerView: React.FC = () => {
  const { leads, updateLeadStatus, deleteLead, exportLeadsCSV } = useLeads();
  const [filter, setFilter] = useState<'all' | 'discovery' | 'message' | 'new'>('all');
  const [search, setSearch] = useState('');

  let filtered = leads;
  if (filter === 'discovery') filtered = filtered.filter(l => l.type && l.type.includes('Discovery'));
  if (filter === 'message') filtered = filtered.filter(l => l.type && (l.type.includes('Message') || l.type.includes('Contact')));
  if (filter === 'new') filtered = filtered.filter(l => l.status === 'New');

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(l =>
      l.name.toLowerCase().includes(q) ||
      (l.phone && l.phone.toLowerCase().includes(q)) ||
      (l.email && l.email.toLowerCase().includes(q)) ||
      (l.details && l.details.toLowerCase().includes(q))
    );
  }

  const handleClearAll = () => {
    if (confirm('Are you sure you want to permanently clear all inquiry records?')) {
      localStorage.removeItem('sireesha_leads_v1');
      window.location.reload();
    }
  };

  return (
    <div className="admin-view-panel active">
      <div className="admin-header-bar">
        <div>
          <span className="eyebrow" style={{ color: 'var(--accent-gold)' }}>Client Discovery & Inquiries</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginTop: '0.25rem' }}>
            Discovery Calls & <span className="gradient-text">General Inquiries</span>
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            20-min discovery call bookings and direct contact messages from the website.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-primary" onClick={exportLeadsCSV}>
            📥 Export Inquiries (.csv)
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="controls-bar">
        <div className="filter-pills">
          <button type="button" className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Inquiries</button>
          <button type="button" className={`filter-btn ${filter === 'discovery' ? 'active' : ''}`} onClick={() => setFilter('discovery')}>Discovery Calls</button>
          <button type="button" className={`filter-btn ${filter === 'message' ? 'active' : ''}`} onClick={() => setFilter('message')}>Messages</button>
          <button type="button" className={`filter-btn ${filter === 'new' ? 'active' : ''}`} onClick={() => setFilter('new')}>New / Uncontacted</button>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', minWidth: '260px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search inquiries..."
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
              <th>Date & Time (IST)</th>
              <th>Type</th>
              <th>Client Name</th>
              <th>WhatsApp Number</th>
              <th>Email</th>
              <th>Details / Preferred Slot / Message</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map(lead => {
                const isDiscovery = lead.type && lead.type.includes('Discovery');
                const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
                const whatsappLink = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(`Hi ${lead.name || ''}, this is Sireesha Puduru regarding your inquiry.`)}`;

                return (
                  <tr key={lead.id}>
                    <td style={{ whiteSpace: 'nowrap', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {lead.timestamp}
                    </td>
                    <td>
                      <span className={`type-badge ${isDiscovery ? 'discovery' : 'message'}`}>
                        {isDiscovery ? '📅 Discovery Call' : '✉️ Message'}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {lead.name}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {cleanPhone ? (
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-btn" title="Open WhatsApp Chat">
                          💬 {lead.phone}
                        </a>
                      ) : '—'}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      {lead.email ? (
                        <a href={`mailto:${lead.email}`} style={{ color: 'var(--accent-gold)', textDecoration: 'underline' }}>
                          {lead.email}
                        </a>
                      ) : '—'}
                    </td>
                    <td style={{ maxWidth: '320px', fontSize: '0.88rem', lineHeight: 1.4 }}>
                      {lead.details || '—'}
                    </td>
                    <td>
                      <select
                        className="status-select"
                        value={lead.status}
                        onChange={e => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                      >
                        <option value="New">🟡 New</option>
                        <option value="Contacted">🟢 Contacted</option>
                        <option value="Session Scheduled">✨ Scheduled</option>
                        <option value="Completed">✓ Completed</option>
                      </select>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        className="delete-lead-btn"
                        onClick={() => {
                          if (confirm('Delete this inquiry record?')) deleteLead(lead.id);
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
                <td colSpan={8} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  No inquiries found matching current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing {filtered.length} of {leads.length} total inquiries
        </span>

        <button type="button" className="btn btn-secondary btn-sm" onClick={handleClearAll} style={{ color: 'var(--accent-rose)' }}>
          🗑️ Clear All Test Records
        </button>
      </div>
    </div>
  );
};
