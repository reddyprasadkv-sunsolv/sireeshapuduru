'use client';

import { useState, useEffect, useCallback } from 'react';
import { Lead } from '@/types';

const LEADS_KEY = 'sireesha_leads_v1';

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LEADS_KEY);
      if (stored) {
        setLeads(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load leads', e);
    }
    setIsLoaded(true);
  }, []);

  const captureLead = useCallback((data: {
    name: string;
    email?: string;
    phone?: string;
    type: string;
    details?: string;
    source?: string;
  }) => {
    const newLead: Lead = {
      id: 'lead-' + Date.now(),
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      status: 'New',
      ...data,
    };

    setLeads(prev => {
      const updated = [newLead, ...prev];
      localStorage.setItem(LEADS_KEY, JSON.stringify(updated));
      return updated;
    });

    // Forward to webhook if present
    const webhookUrl = localStorage.getItem('sireesha_sheets_webhook_url');
    if (webhookUrl) {
      try {
        fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLead),
        }).catch(() => {});
      } catch (e) {}
    }

    return newLead;
  }, []);

  const updateLeadStatus = useCallback((id: string, status: Lead['status']) => {
    setLeads(prev => {
      const updated = prev.map(l => l.id === id ? { ...l, status } : l);
      localStorage.setItem(LEADS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteLead = useCallback((id: string) => {
    setLeads(prev => {
      const updated = prev.filter(l => l.id !== id);
      localStorage.setItem(LEADS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const exportLeadsCSV = useCallback(() => {
    if (leads.length === 0) {
      alert('No inquiries available to export.');
      return;
    }

    const headers = ['Inquiry ID', 'Date/Time (IST)', 'Type', 'Client Name', 'Phone', 'Email', 'Details', 'Status'];
    const rows = leads.map(l => [
      `"${l.id}"`,
      `"${l.timestamp}"`,
      `"${l.type}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${l.phone || ''}"`,
      `"${l.email || ''}"`,
      `"${(l.details || '').replace(/"/g, '""')}"`,
      `"${l.status || 'New'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Sireesha_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [leads]);

  return {
    leads,
    isLoaded,
    captureLead,
    updateLeadStatus,
    deleteLead,
    exportLeadsCSV,
  };
}
