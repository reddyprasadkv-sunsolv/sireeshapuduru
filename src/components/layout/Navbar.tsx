'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useAudio } from '@/hooks/useAudio';

interface NavbarProps {
  onOpenDiscovery?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDiscovery }) => {
  const { theme, toggleTheme } = useTheme();
  const { isPlaying, toggleAmbientSound } = useAudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link href="/" className="brand-logo" aria-label="Sireesha Puduru Home">
            <img src="assets/images/logo.png" alt="Sireesha Puduru Emblem" width="48" height="48" className="logo-img" />
            <div className="brand-text">
              <span className="brand-name">Sireesha Puduru</span>
              <span className="brand-tagline">The Art of Loving Academy</span>
            </div>
          </Link>

          <nav className="nav-links" aria-label="Primary Navigation">
            <Link href="/#philosophy" className="nav-link">Philosophy</Link>
            <Link href="/#programs" className="nav-link">Offerings</Link>
            <Link href="/#events" className="nav-link">Events</Link>
            <Link href="/#story" className="nav-link">About Sireesha</Link>
            <Link href="/#mirror-work" className="nav-link">Affirmations</Link>
            <Link href="/#quiz" className="nav-link">Self-Love Quiz</Link>
            <Link href="/#connect" className="nav-link">Connect</Link>
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className={`ambient-sound-btn ${isPlaying ? 'playing' : ''}`}
              onClick={toggleAmbientSound}
              title={isPlaying ? 'Pause Ambient Sound' : 'Play 528Hz Ambient Drone'}
              aria-label="Toggle Ambient Sanctuary Sound"
            >
              <div className="eq-bars">
                <span className="eq-bar" />
                <span className="eq-bar" />
                <span className="eq-bar" />
              </div>
              <span className="ambient-label">{isPlaying ? 'Sanctuary Ambient: ON' : 'Ambient Sound'}</span>
            </button>

            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title="Toggle Theme Mode"
              aria-label="Toggle Theme Mode"
            >
              <span className="theme-icon-sun" style={{ display: theme === 'dawn' ? 'block' : 'none' }}>☀️</span>
              <span className="theme-icon-moon" style={{ display: theme === 'twilight' ? 'block' : 'none' }}>🌙</span>
            </button>

            {onOpenDiscovery && (
              <button
                type="button"
                className="btn btn-primary btn-sm btn-nav"
                onClick={onOpenDiscovery}
              >
                Book Discovery Call
              </button>
            )}

            <button
              type="button"
              className={`mobile-menu-toggle ${isMobileOpen ? 'active' : ''}`}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle Menu"
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-nav-drawer ${isMobileOpen ? 'active' : ''}`}>
        <div className="mobile-nav-links">
          <Link href="/#philosophy" className="mobile-link" onClick={() => setIsMobileOpen(false)}>Philosophy</Link>
          <Link href="/#programs" className="mobile-link" onClick={() => setIsMobileOpen(false)}>Offerings</Link>
          <Link href="/#events" className="mobile-link" onClick={() => setIsMobileOpen(false)}>Events & Immersions</Link>
          <Link href="/#story" className="mobile-link" onClick={() => setIsMobileOpen(false)}>About Sireesha</Link>
          <Link href="/#mirror-work" className="mobile-link" onClick={() => setIsMobileOpen(false)}>Daily Affirmations</Link>
          <Link href="/#quiz" className="mobile-link" onClick={() => setIsMobileOpen(false)}>Self-Love Assessment</Link>
          <Link href="/#connect" className="mobile-link" onClick={() => setIsMobileOpen(false)}>Sanctuary Desk</Link>
          
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {onOpenDiscovery && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setIsMobileOpen(false);
                  onOpenDiscovery();
                }}
              >
                Book 20-Min Discovery Call
              </button>
            )}

            <a
              href="https://api.whatsapp.com/send?phone=919866157263&text=Hi%20Sireesha%2C%20I%20am%20reaching%20out%20from%20your%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              onClick={() => setIsMobileOpen(false)}
            >
              💬 Talk to me
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
