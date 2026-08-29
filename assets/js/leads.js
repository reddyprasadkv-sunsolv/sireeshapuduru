/**
 * LEADS & FORM DATA CAPTURE ENGINE
 * The Art of Loving Academy - Sireesha Puduru
 * 
 * Captures Discovery Call bookings & Contact Messages, stores in local ledger,
 * provides one-click Excel (.csv) export, and supports Google Sheets Webhooks.
 */

class LeadsManager {
  constructor() {
    this.STORAGE_KEY = 'sireesha_academy_leads_v1';
    // Optional Google Apps Script or Zapier/Make Webhook URL to stream directly into Google Sheets
    this.GOOGLE_SHEETS_WEBHOOK_URL = localStorage.getItem('sireesha_sheets_webhook_url') || ''; 
    this.init();
  }

  init() {
    // Attach listener for Admin / Export Leads triggers
    document.querySelectorAll('[data-action="export-leads"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openLeadsDashboard();
      });
    });
  }

  /**
   * Save a new lead entry
   * @param {Object} lead - { type, name, email, phone, details, extra }
   */
  captureLead(lead) {
    const leads = this.getLeads();
    const newEntry = {
      id: 'SP-' + Date.now().toString(36).toUpperCase(),
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      isoDate: new Date().toISOString(),
      type: lead.type || 'General Inquiry',
      name: lead.name || 'Anonymous',
      email: lead.email || '',
      phone: lead.phone || '',
      details: lead.details || '',
      status: 'New'
    };

    leads.unshift(newEntry);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(leads));

    // If a Google Sheets Webhook is configured, stream data asynchronously
    if (this.GOOGLE_SHEETS_WEBHOOK_URL) {
      this.sendToGoogleSheet(newEntry);
    }

    console.log('[LeadsManager] Lead captured successfully:', newEntry);
    return newEntry;
  }

  /**
   * Get all captured leads
   * @returns {Array}
   */
  getLeads() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('[LeadsManager] Error reading leads storage:', e);
      return [];
    }
  }

  /**
   * Export all captured leads to a formatted CSV / Excel file
   */
  exportToExcel() {
    const leads = this.getLeads();
    if (leads.length === 0) {
      alert('No leads recorded yet. As visitors book calls or send messages, they will appear here!');
      return;
    }

    // CSV Headers
    const headers = [
      'Lead ID',
      'Date & Time (IST)',
      'Inquiry Type',
      'Full Name',
      'Email Address',
      'WhatsApp Number',
      'Details / Preferred Slot / Message',
      'Status'
    ];

    // Escape CSV cell text
    const escapeCsv = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = leads.map(item => [
      escapeCsv(item.id),
      escapeCsv(item.timestamp),
      escapeCsv(item.type),
      escapeCsv(item.name),
      escapeCsv(item.email),
      escapeCsv(item.phone),
      escapeCsv(item.details),
      escapeCsv(item.status)
    ].join(','));

    // Prepend UTF-8 Byte Order Mark (\uFEFF) so Excel opens multilingual content correctly
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const filename = `Sireesha_Puduru_Leads_${dateStr}.csv`;

    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  /**
   * Open the visual Lead Ledger Modal
   */
  openLeadsDashboard() {
    const leads = this.getLeads();
    const discoveryCount = leads.filter(l => l.type.includes('Discovery')).length;
    const messageCount = leads.filter(l => l.type.includes('Message') || l.type.includes('Inquiry')).length;

    const html = `
      <div style="margin-bottom: 1.5rem;">
        <span class="eyebrow" style="color: var(--accent-gold);">Admin Sanctuary Desk</span>
        <h2 style="font-size: 2rem; margin-top: 0.5rem; margin-bottom: 0.5rem;">Lead Ledger & Excel Export</h2>
        <p style="font-size: 0.95rem; color: var(--text-secondary);">
          All website inquiries, discovery call bookings, and messages captured in real-time.
        </p>
      </div>

      <!-- Stats Summary -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div style="background: var(--bg-glass); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 1rem; text-align: center;">
          <div style="font-size: 1.8rem; font-weight: 700; color: var(--accent-gold);">${leads.length}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Total Leads</div>
        </div>
        <div style="background: var(--bg-glass); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 1rem; text-align: center;">
          <div style="font-size: 1.8rem; font-weight: 700; color: var(--accent-rose-light);">${discoveryCount}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Discovery Calls</div>
        </div>
        <div style="background: var(--bg-glass); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 1rem; text-align: center;">
          <div style="font-size: 1.8rem; font-weight: 700; color: var(--accent-emerald-light);">${messageCount}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Messages</div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
        <button type="button" class="btn btn-primary btn-sm" onclick="window.leadsManager.exportToExcel()">
          📥 Download Excel Sheet (.csv)
        </button>
        <button type="button" class="btn btn-secondary btn-sm" onclick="window.leadsManager.clearLeads()">
          🗑️ Clear Test Data
        </button>
      </div>

      <!-- Leads Table -->
      <div style="max-height: 320px; overflow-y: auto; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); background: var(--bg-card);">
        ${leads.length === 0 ? `
          <div style="padding: 2.5rem; text-align: center; color: var(--text-muted);">
            No leads recorded yet. Submissions from the Discovery Call modal and Contact Form will automatically appear here!
          </div>
        ` : `
          <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem; text-align: left;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-medium); background: var(--bg-secondary);">
                <th style="padding: 10px 12px; color: var(--accent-gold);">Date</th>
                <th style="padding: 10px 12px;">Type</th>
                <th style="padding: 10px 12px;">Name</th>
                <th style="padding: 10px 12px;">WhatsApp</th>
                <th style="padding: 10px 12px;">Details</th>
              </tr>
            </thead>
            <tbody>
              ${leads.map(l => `
                <tr style="border-bottom: 1px solid var(--border-glass);">
                  <td style="padding: 10px 12px; font-size: 0.8rem; white-space: nowrap; color: var(--text-muted);">${l.timestamp}</td>
                  <td style="padding: 10px 12px; font-weight: 600; white-space: nowrap; color: ${l.type.includes('Discovery') ? 'var(--accent-rose-light)' : 'var(--accent-emerald-light)'};">${l.type}</td>
                  <td style="padding: 10px 12px; font-weight: 600;">${l.name}</td>
                  <td style="padding: 10px 12px; white-space: nowrap;"><a href="https://api.whatsapp.com/send?phone=${l.phone.replace(/[^0-9]/g, '')}" target="_blank" style="color: var(--accent-emerald); text-decoration: underline;">${l.phone}</a></td>
                  <td style="padding: 10px 12px; max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${l.details}">${l.details}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `}
      </div>
    `;

    if (window.modalManager) {
      window.modalManager.open(html);
    }
  }

  /**
   * Clear test records
   */
  clearLeads() {
    if (confirm('Are you sure you want to clear all stored test leads?')) {
      localStorage.removeItem(this.STORAGE_KEY);
      this.openLeadsDashboard();
    }
  }

  /**
   * Optional async post to Google Sheets webhook
   */
  async sendToGoogleSheet(data) {
    try {
      await fetch(this.GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.warn('[LeadsManager] Async webhook dispatch error:', err);
    }
  }
}

// Global instance
window.leadsManager = new LeadsManager();
