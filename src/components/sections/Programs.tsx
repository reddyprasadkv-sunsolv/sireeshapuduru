'use client';

import React from 'react';

interface ProgramsProps {
  onOpenDiscovery: () => void;
}

export const Programs: React.FC<ProgramsProps> = ({ onOpenDiscovery }) => {
  return (
    <section className="programs-section" id="programs">
      <div className="container">
        <div className="section-header text-center">
          <div className="eyebrow">
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Guided Pathways
          </div>
          <h2 className="section-title">
            Signature Immersion & <span className="gradient-text">Coaching Offerings</span>
          </h2>
          <p className="section-subtitle">
            Whether through intimate 2-day in-person sanctuary workshops or bespoke 1-on-1 coaching containers, find the sacred container that resonates with your current soul journey.
          </p>
        </div>

        <div className="programs-grid">
          {/* Program 1 */}
          <div className="program-card featured">
            <div className="program-badge">Signature In-Person Immersion</div>
            <h3 className="program-title">Heal Your Life® Immersion Workshop</h3>
            <div className="program-type">2-Day Intensive Weekend Sanctuary</div>
            <p className="program-description">
              An experiential weekend grounded in Louise Hay's world-renowned philosophy. Release deep grief, heal relationship fractures, and practice guided mirror work in a confidential circle.
            </p>
            <div className="program-perfect-for">
              <strong>Perfect for:</strong> Anyone seeking deep emotional release, forgiving past hurts, and cultivating unconditional self-love.
            </div>
            <ul className="program-highlights">
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Sacred Louise Hay certified curriculum</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Deep emotional release & forgiveness rituals</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Inner child healing & mirror work exercises</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Intimate group size with direct facilitation</span>
              </li>
            </ul>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onOpenDiscovery}
            >
              Apply for Next Cohort
            </button>
          </div>

          {/* Program 2 */}
          <div className="program-card">
            <div className="program-badge">1-on-1 Bespoke Container</div>
            <h3 className="program-title">Deep Heart Alchemy Mentorship</h3>
            <div className="program-type">3-Month Private Mentorship</div>
            <p className="program-description">
              A private transformational partnership with Sireesha. Tailored somatic practices, belief-barrier breakthroughs, and ongoing WhatsApp support.
            </p>
            <div className="program-perfect-for">
              <strong>Perfect for:</strong> Leaders and seekers desiring focused, customized guidance for trauma healing and life transitions.
            </div>
            <ul className="program-highlights">
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Weekly 60-min deep dive coaching calls</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Custom subconscious meditation recordings</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Priority WhatsApp voice note access</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Personalized emotional health roadmap</span>
              </li>
            </ul>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onOpenDiscovery}
            >
              Book Discovery Call
            </button>
          </div>

          {/* Program 3 */}
          <div className="program-card">
            <div className="program-badge">Online Masterclass Series</div>
            <h3 className="program-title">Sacred Mirror Work Mastery</h3>
            <div className="program-type">21-Day Guided Digital Immersion</div>
            <p className="program-description">
              A self-paced online video masterclass coupled with live monthly Q&A circles. Master the 21-day mirror work habit to conquer anxiety and foster unshakable self-worth.
            </p>
            <div className="program-perfect-for">
              <strong>Perfect for:</strong> Building a sustainable daily self-love ritual from home at your own gentle pace.
            </div>
            <ul className="program-highlights">
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>21 step-by-step video lessons & guided audio</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Printable Louise Hay reflection workbook</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Monthly live group coaching with Sireesha</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span>Lifetime sanctuary community access</span>
              </li>
            </ul>
            <a
              href="https://api.whatsapp.com/send?phone=919866157263&text=Hi%20Sireesha%2C%20I%20am%20interested%20in%20Mirror%20Work%20Mastery."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              Inquire via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
