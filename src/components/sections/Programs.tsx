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
          <span className="eyebrow">Guided Pathways</span>
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
            <div className="program-header">
              <span className="program-type">2-Day Intensive Weekend</span>
              <h3 className="program-title">Heal Your Life® Immersion Workshop</h3>
              <p className="program-desc">
                An experiential weekend grounded in Louise Hay's world-renowned philosophy. Release deep grief, heal relationship fractures, and practice guided mirror work in a confidential circle.
              </p>
            </div>

            <ul className="program-features">
              <li><span>✓</span> Sacred Louise Hay certified curriculum</li>
              <li><span>✓</span> Deep emotional release & forgiveness rituals</li>
              <li><span>✓</span> Inner child healing & mirror work exercises</li>
              <li><span>✓</span> Intimate group size with direct facilitation</li>
            </ul>

            <button
              type="button"
              className="btn btn-primary"
              onClick={onOpenDiscovery}
              style={{ width: '100%', marginTop: '1.5rem' }}
            >
              Apply for Next Cohort
            </button>
          </div>

          {/* Program 2 */}
          <div className="program-card">
            <div className="program-header">
              <span className="program-type">1-on-1 Bespoke Container</span>
              <h3 className="program-title">Deep Heart Alchemy Mentorship</h3>
              <p className="program-desc">
                A private 3-month or 6-month transformational partnership with Sireesha. Tailored somatic practices, belief-barrier breakthroughs, and ongoing WhatsApp support.
              </p>
            </div>

            <ul className="program-features">
              <li><span>✓</span> Weekly 60-min deep dive coaching calls</li>
              <li><span>✓</span> Custom subconscious meditation recordings</li>
              <li><span>✓</span> Priority WhatsApp voice note access</li>
              <li><span>✓</span> Personalized lifestyle & emotional health roadmap</li>
            </ul>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={onOpenDiscovery}
              style={{ width: '100%', marginTop: '1.5rem' }}
            >
              Book Discovery Call
            </button>
          </div>

          {/* Program 3 */}
          <div className="program-card">
            <div className="program-header">
              <span className="program-type">Online Masterclass Series</span>
              <h3 className="program-title">Sacred Mirror Work Mastery</h3>
              <p className="program-desc">
                A self-paced online video masterclass coupled with live monthly Q&A circles. Master the 21-day mirror work habit to conquer anxiety and foster unshakable self-worth.
              </p>
            </div>

            <ul className="program-features">
              <li><span>✓</span> 21 step-by-step video lessons & guided audio</li>
              <li><span>✓</span> Printable Louise Hay reflection workbook</li>
              <li><span>✓</span> Monthly live group coaching with Sireesha</li>
              <li><span>✓</span> Lifetime sanctuary community membership</li>
            </ul>

            <a
              href="https://api.whatsapp.com/send?phone=919866157263&text=Hi%20Sireesha%2C%20I%20am%20interested%20in%20Mirror%20Work%20Mastery."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ width: '100%', marginTop: '1.5rem' }}
            >
              Inquire via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
