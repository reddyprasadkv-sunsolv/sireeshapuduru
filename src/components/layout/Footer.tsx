'use client';

import React from 'react';
import Link from 'next/link';
import { getAssetPath } from '@/utils/assets';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <img src={getAssetPath('assets/images/logo.png')} alt="Sireesha Puduru Emblem" width="48" height="48" />
              <div>
                <span className="footer-brand-title">Sireesha Puduru</span>
                <span className="footer-brand-sub">The Art of Loving Academy</span>
              </div>
            </div>
            <p className="footer-desc">
              A sacred space of Louise Hay philosophy, heart-centered mirror work, and transformational life immersion. Guiding souls from pain into peace, self-forgiveness, and boundless prosperity.
            </p>
            <div className="footer-social-links">
              <a href="https://api.whatsapp.com/send?phone=919866157263" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="WhatsApp Sanctuary Direct">
                💬
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram Academy Space">
                📷
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="YouTube Healing Guided Meditations">
                ▶️
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn Executive Presence">
                💼
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Academy Offerings</h4>
            <ul className="footer-menu">
              <li><Link href="/#programs">Heal Your Life® 2-Day Immersion</Link></li>
              <li><Link href="/#programs">1-on-1 Deep Heart Alchemy</Link></li>
              <li><Link href="/#programs">Sacred Mirror Work Mastery</Link></li>
              <li><Link href="/#events">Upcoming Workshops & Retreats</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Sacred Sanctuary</h4>
            <ul className="footer-menu">
              <li><Link href="/#philosophy">Louise Hay Philosophy</Link></li>
              <li><Link href="/#mirror-work">Daily Affirmations Deck</Link></li>
              <li><Link href="/#quiz">Self-Love Diagnostic Assessment</Link></li>
              <li><Link href="/#story">Sireesha's Awakening Story</Link></li>
              <li><Link href="/privacy-policy">Privacy & Confidentiality</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Direct Connect</h4>
            <div className="footer-contact-item">
              <span>📍 Hyderabad</span>
            </div>
            <div className="footer-contact-item">
              <span>📱 +91 9866157263 (WhatsApp Sanctuary)</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Sireesha Puduru | The Art of Loving Academy. All Sacred Rights Reserved.</p>
          <div className="footer-bottom-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/#connect">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
