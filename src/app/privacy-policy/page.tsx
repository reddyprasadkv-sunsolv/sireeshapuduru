'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AmbientCanvas } from '@/components/layout/AmbientCanvas';

export default function PrivacyPolicyPage() {
  return (
    <main style={{ minHeight: '100vh', position: 'relative' }}>
      <AmbientCanvas />
      <Navbar />

      <section style={{ padding: '140px 1.5rem 80px 1.5rem', maxWidth: '860px', margin: '0 auto', color: 'var(--text-primary)' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
            ← Back to Sanctuary
          </Link>
        </div>

        <span className="eyebrow" style={{ color: 'var(--accent-gold)' }}>Sacred Trust & Ethics</span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          Privacy Policy & <span className="gradient-text">Confidentiality Charter</span>
        </h1>

        <div style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-medium)', lineHeight: '1.8', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>1. The Sanctuary Commitment</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            At <strong>The Art of Loving Academy</strong> and in every coaching session with <strong>Sireesha Puduru</strong>, your emotional, psychological, and personal disclosures are treated as sacred. We adhere to the highest international ethical standards of personal life coaching and Louise Hay facilitation confidentiality.
          </p>

          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>2. Information We Collect</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            When you register for a workshop, book a 20-minute discovery call, or submit an inquiry, we collect only the essential details you provide: your name, email address, WhatsApp contact number, and your stated intentions. We never sell, rent, or trade your contact information with any third party.
          </p>

          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>3. Session Notes & Reflections</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Any insights, mirror work assessments, or notes shared during private coaching calls or in-person immersions remain strictly confidential between you and Sireesha.
          </p>

          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>4. Direct WhatsApp Communication</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            By submitting your WhatsApp number on our site, you give consent for Sireesha Puduru and the Sanctuary Desk to contact you regarding your booking, event reminders, and relevant academy announcements. You may opt out at any time by replying "STOP".
          </p>

          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>5. Contact Our Sanctuary Desk</h2>
          <p>
            For questions regarding your data or to request deletion of your records, contact us directly via WhatsApp at <strong>+91 9866157263</strong>.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
