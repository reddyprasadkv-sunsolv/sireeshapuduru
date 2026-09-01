/**
 * EVENTS & IMMERSIONS MANAGEMENT SYSTEM
 * The Art of Loving Academy - Sireesha Puduru
 * 
 * Handles upcoming/past event listings, user event registrations,
 * admin CRUD operations (create, read, update, delete), and attendee tracking.
 */

class EventsManager {
  constructor() {
    this.EVENTS_KEY = 'sireesha_events_v1';
    this.REGISTRATIONS_KEY = 'sireesha_event_registrations_v1';
    this.init();
  }

  init() {
    // Seed default events if not present in localStorage
    if (!localStorage.getItem(this.EVENTS_KEY)) {
      this.seedDefaultEvents();
    }
  }

  /**
   * Seed curated initial events (upcoming and past)
   */
  seedDefaultEvents() {
    const defaultEvents = [
      {
        id: 'evt_heal_your_life_blr',
        title: '2-Day Heal Your Life Immersion Workshop',
        description: 'A deeply transformative weekend intensive based on Louise Hay’s world-renowned philosophy. Release old emotional burdens, dissolve self-limiting patterns, and awaken unconditional self-love in a safe, nurturing sanctuary.',
        banner: 'assets/images/workshop-1.png',
        date: '2026-09-26',
        endDate: '2026-09-27',
        time: '09:30 AM – 05:30 PM IST',
        locationType: 'offline',
        locationAddress: 'The Sanctuary Hall, Indiranagar, Bengaluru, Karnataka 560038',
        capacity: '20 Seats Only',
        status: 'upcoming',
        featured: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'evt_mirror_work_online',
        title: 'Sacred Heart & Mirror Work Global Masterclass',
        description: 'An intimate virtual gathering dedicated to somatic healing and deep mirror-work catharsis. Learn daily energetic rituals to quiet your inner critic, dissolve anxiety, and reconnect with your pure authentic heart.',
        banner: 'assets/images/workshop-2.png',
        date: '2026-10-04',
        endDate: '2026-10-04',
        time: '06:00 PM – 08:30 PM IST',
        locationType: 'online',
        locationAddress: 'Online via Zoom Sanctuary (Link shared upon registration)',
        capacity: 'Open Global Access',
        status: 'upcoming',
        featured: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 'evt_inner_child_hyd',
        title: 'Inner Child Healing & Somatic Release Retreat',
        description: 'Step into a sanctuary of warmth, healing sound baths, and gentle inner-child reconnection. Discover how to hold your vulnerable self with compassion and release generational grief.',
        banner: 'assets/images/sanctuary.png',
        date: '2026-10-18',
        endDate: '2026-10-18',
        time: '10:00 AM – 04:30 PM IST',
        locationType: 'offline',
        locationAddress: 'Heritage Wellness Sanctuary, Jubilee Hills, Hyderabad, Telangana 500033',
        capacity: '15 Seats Only',
        status: 'upcoming',
        featured: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 'evt_solstice_past',
        title: 'Global Self-Love Solstice Immersion',
        description: 'Over 150 souls gathered virtually from across 12 countries for an evening of heart-opening meditation, Louise Hay affirmations, and collective healing.',
        banner: 'assets/images/workshop-1.png',
        date: '2026-06-21',
        endDate: '2026-06-21',
        time: '05:00 PM – 08:00 PM IST',
        locationType: 'online',
        locationAddress: 'Online via Zoom Sanctuary',
        capacity: '150 Participants',
        status: 'past',
        featured: false,
        createdAt: new Date('2026-06-21').toISOString()
      },
      {
        id: 'evt_circle_blr_past',
        title: 'Louise Hay Transformational Healing Circle',
        description: 'A soulful full-day in-person workshop focused on emotional catharsis, forgiveness letters, somatic breathwork, and stepping into personal sovereignty.',
        banner: 'assets/images/workshop-2.png',
        date: '2026-05-10',
        endDate: '2026-05-10',
        time: '10:00 AM – 05:00 PM IST',
        locationType: 'offline',
        locationAddress: 'The Kensington Sanctuary, MG Road, Bengaluru',
        capacity: '25 Participants',
        status: 'past',
        featured: false,
        createdAt: new Date('2026-05-10').toISOString()
      }
    ];

    localStorage.setItem(this.EVENTS_KEY, JSON.stringify(defaultEvents));
  }

  /**
   * Get all events
   */
  getEvents() {
    try {
      const stored = localStorage.getItem(this.EVENTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('[EventsManager] Error loading events:', e);
      return [];
    }
  }

  /**
   * Save or update an event
   */
  saveEvent(eventData) {
    const events = this.getEvents();
    if (eventData.id) {
      const index = events.findIndex(e => e.id === eventData.id);
      if (index !== -1) {
        events[index] = { ...events[index], ...eventData, updatedAt: new Date().toISOString() };
      } else {
        events.unshift({ ...eventData, id: eventData.id || 'evt_' + Date.now(), createdAt: new Date().toISOString() });
      }
    } else {
      const newEvent = {
        ...eventData,
        id: 'evt_' + Date.now(),
        createdAt: new Date().toISOString()
      };
      events.unshift(newEvent);
    }

    localStorage.setItem(this.EVENTS_KEY, JSON.stringify(events));
    return true;
  }

  /**
   * Delete an event by ID
   */
  deleteEvent(id) {
    let events = this.getEvents();
    events = events.filter(e => e.id !== id);
    localStorage.setItem(this.EVENTS_KEY, JSON.stringify(events));
    return true;
  }

  /**
   * Get event by ID
   */
  getEventById(id) {
    const events = this.getEvents();
    return events.find(e => e.id === id) || null;
  }

  /**
   * Register a user for an event
   */
  registerUser(eventId, userData) {
    const event = this.getEventById(eventId);
    const registrations = this.getRegistrations();

    const newReg = {
      id: 'REG-' + Date.now().toString(36).toUpperCase(),
      eventId: eventId,
      eventTitle: event ? event.title : 'General Event',
      eventDate: event ? event.date : '',
      locationType: event ? event.locationType : 'online',
      locationAddress: event ? event.locationAddress : '',
      name: userData.name || 'Anonymous',
      email: userData.email || '',
      phone: userData.phone || '',
      notes: userData.notes || '',
      status: 'Registered',
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      isoDate: new Date().toISOString()
    };

    registrations.unshift(newReg);
    localStorage.setItem(this.REGISTRATIONS_KEY, JSON.stringify(registrations));

    // Also push into Leads Manager so it displays in main CRM and streams to Google Sheets webhook if enabled
    if (window.leadsManager) {
      window.leadsManager.captureLead({
        type: `Event Registration: ${newReg.eventTitle}`,
        name: newReg.name,
        email: newReg.email,
        phone: newReg.phone,
        details: `Event: ${newReg.eventTitle} (${newReg.eventDate}) | Mode: ${newReg.locationType.toUpperCase()} | Location: ${newReg.locationAddress} | Notes: ${newReg.notes || 'None'}`
      });
    }

    return newReg;
  }

  /**
   * Get all registrations (optionally filtered by eventId)
   */
  getRegistrations(eventId = null) {
    try {
      const stored = localStorage.getItem(this.REGISTRATIONS_KEY);
      const all = stored ? JSON.parse(stored) : [];
      if (eventId) {
        return all.filter(r => r.eventId === eventId);
      }
      return all;
    } catch (e) {
      console.error('[EventsManager] Error loading registrations:', e);
      return [];
    }
  }

  /**
   * Update registration status
   */
  updateRegistrationStatus(regId, newStatus) {
    const regs = this.getRegistrations();
    const item = regs.find(r => r.id === regId);
    if (item) {
      item.status = newStatus;
      localStorage.setItem(this.REGISTRATIONS_KEY, JSON.stringify(regs));
      return true;
    }
    return false;
  }

  /**
   * Delete registration
   */
  deleteRegistration(regId) {
    let regs = this.getRegistrations();
    regs = regs.filter(r => r.id !== regId);
    localStorage.setItem(this.REGISTRATIONS_KEY, JSON.stringify(regs));
    return true;
  }

  /**
   * Export registrations to CSV
   */
  exportRegistrationsToCSV(eventId = null) {
    const regs = this.getRegistrations(eventId);
    if (!regs.length) {
      alert('No registrations found to export.');
      return;
    }

    const headers = ['Registration ID', 'Date/Time', 'Event Title', 'Event Date', 'Location Mode', 'Address/Platform', 'Participant Name', 'Email', 'Phone', 'Notes', 'Status'];
    const rows = regs.map(r => [
      `"${r.id}"`,
      `"${r.timestamp}"`,
      `"${(r.eventTitle || '').replace(/"/g, '""')}"`,
      `"${r.eventDate || ''}"`,
      `"${r.locationType || ''}"`,
      `"${(r.locationAddress || '').replace(/"/g, '""')}"`,
      `"${(r.name || '').replace(/"/g, '""')}"`,
      `"${r.email || ''}"`,
      `"${r.phone || ''}"`,
      `"${(r.notes || '').replace(/"/g, '""')}"`,
      `"${r.status || 'Registered'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Sireesha_Event_Registrations_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Format date for user display (e.g. 26 Sep 2026)
   */
  formatDisplayDate(dateStr) {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      }
      return dateStr;
    } catch (e) {
      return dateStr;
    }
  }

  /**
   * Render User Portal Events in index.html
   */
  renderUserEvents(containerId = 'eventsGrid', activeTab = 'upcoming') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const allEvents = this.getEvents();
    const filtered = allEvents.filter(e => {
      if (activeTab === 'upcoming') {
        return e.status === 'upcoming' || (!e.status && new Date(e.date) >= new Date());
      } else {
        return e.status === 'past' || (e.status !== 'upcoming' && new Date(e.date) < new Date());
      }
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-events-state">
          <div class="empty-icon">🕊️</div>
          <h3>${activeTab === 'upcoming' ? 'New Gatherings Announcing Soon' : 'No Past Events in Archive'}</h3>
          <p>${activeTab === 'upcoming' ? 'Sireesha is preparing upcoming sacred workshops and retreats. Stay connected or join our WhatsApp community to be notified first.' : 'Past retreat retrospectives and event recordings will appear here.'}</p>
          <a href="#connect" class="btn btn-secondary">Inquire with Sireesha</a>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(event => {
      const isOnline = (event.locationType || 'online').toLowerCase() === 'online';
      const isUpcoming = (event.status || 'upcoming') === 'upcoming';
      const displayDate = this.formatDisplayDate(event.date);
      const isMultiDay = event.endDate && event.endDate !== event.date;
      const displayEndDate = isMultiDay ? ' – ' + this.formatDisplayDate(event.endDate) : '';

      return `
        <article class="event-card ${event.featured ? 'featured-event' : ''} ${!isUpcoming ? 'past-event-card' : ''}" data-id="${event.id}">
          <div class="event-banner-wrap">
            <img src="${event.banner || 'assets/images/workshop-1.png'}" alt="${event.title}" class="event-banner-img" loading="lazy" onerror="this.src='assets/images/workshop-1.png'">
            <div class="event-type-badge ${isOnline ? 'badge-online' : 'badge-offline'}">
              ${isOnline ? `
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                Online Webinar
              ` : `
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                In-Person Venue
              `}
            </div>
            ${!isUpcoming ? `<div class="event-past-stamp">Completed Archive</div>` : ''}
          </div>

          <div class="event-body">
            <div class="event-meta-bar">
              <span class="event-date-pill">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                ${displayDate}${displayEndDate}
              </span>
              ${event.time ? `
                <span class="event-time-pill">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  ${event.time}
                </span>
              ` : ''}
            </div>

            <h3 class="event-title">${event.title}</h3>

            <div class="event-location-box">
              <span class="loc-icon">
                ${isOnline ? '🌐' : '📍'}
              </span>
              <span class="loc-text">
                ${isOnline ? '<strong>Online:</strong> Virtual Zoom Sanctuary' : `<strong>Venue:</strong> ${event.locationAddress || 'In-Person Sanctuary'}`}
              </span>
            </div>

            <p class="event-description">${event.description || ''}</p>

            <div class="event-footer">
              ${isUpcoming ? `
                <button type="button" class="btn btn-primary btn-event-register" onclick="window.eventsManager.openRegistrationModal('${event.id}')">
                  Register for Event ✨
                </button>
              ` : `
                <a href="#connect" class="btn btn-secondary btn-event-past" onclick="if(window.openInquiryForEvent) window.openInquiryForEvent('${event.title}')">
                  Inquire About Next Edition 🕊️
                </a>
              `}
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /**
   * Open the Event Registration Modal in User Portal
   */
  openRegistrationModal(eventId) {
    const event = this.getEventById(eventId);
    if (!event) return;

    const modal = document.getElementById('eventRegistrationModal');
    if (!modal) return;

    const titleEl = document.getElementById('modalEventTitle');
    const dateEl = document.getElementById('modalEventDate');
    const locEl = document.getElementById('modalEventLocation');
    const eventIdInput = document.getElementById('regEventId');

    if (titleEl) titleEl.textContent = event.title;
    if (dateEl) dateEl.textContent = `📅 ${this.formatDisplayDate(event.date)}${event.endDate && event.endDate !== event.date ? ' – ' + this.formatDisplayDate(event.endDate) : ''} | ⏰ ${event.time || ''}`;
    
    const isOnline = (event.locationType || 'online').toLowerCase() === 'online';
    if (locEl) {
      locEl.innerHTML = isOnline 
        ? `🌐 <strong>Online Sanctuary:</strong> Zoom Link will be shared upon registration`
        : `📍 <strong>In-Person Address:</strong> ${event.locationAddress || 'Sanctuary Hall'}`;
    }
    if (eventIdInput) eventIdInput.value = event.id;

    // Reset feedback
    const msgEl = document.getElementById('eventRegFeedback');
    if (msgEl) {
      msgEl.style.display = 'none';
      msgEl.textContent = '';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close the Event Registration Modal
   */
  closeRegistrationModal() {
    const modal = document.getElementById('eventRegistrationModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

// Global Singleton
window.eventsManager = new EventsManager();
