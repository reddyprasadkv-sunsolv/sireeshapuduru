'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useAudio } from '@/hooks/useAudio';
import { getAssetPath } from '@/utils/assets';

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
            <img src={getAssetPath('assets/images/logo.png')} alt="Sireesha Puduru Emblem" width="44" height="44" />
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
              title={isPlaying ? 'Pause Ambient Sound' : 'Play 432Hz/528Hz Ambient Drone'}
              aria-label="Toggle Ambient Sanctuary Sound"
            >
              <div className="eq-animation">
                <span className="eq-bar" />
                <span className="eq-bar" />
                <span className="eq-bar" />
              </div>
              <span>{isPlaying ? 'Ambient: ON' : 'Ambient: 432Hz'}</span>
            </button>

            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title="Toggle Theme Mode"
              aria-label="Toggle Theme Mode"
            >
              {theme === 'dawn' ? '🌙' : '☀️'}
            </button>

            <a
              href="https://api.whatsapp.com/send?phone=919866157263&text=Hi%20Sireesha%2C%20I%20am%20reaching%20out%20from%20your%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="nav-whatsapp-pill"
              title="Chat with Sireesha on WhatsApp"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>+91 9866157263</span>
            </a>

            {onOpenDiscovery && (
              <button
                type="button"
                className="btn btn-primary btn-sm btn-nav"
                onClick={onOpenDiscovery}
              >
                Book Call
              </button>
            )}

            <button
              type="button"
              className="mobile-toggle"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Hidden on desktop) */}
      <div className={`mobile-menu ${isMobileOpen ? 'open' : ''}`}>
        <nav className="nav-links">
          <Link href="/#philosophy" className="nav-link" onClick={() => setIsMobileOpen(false)}>Philosophy</Link>
          <Link href="/#programs" className="nav-link" onClick={() => setIsMobileOpen(false)}>Offerings</Link>
          <Link href="/#events" className="nav-link" onClick={() => setIsMobileOpen(false)}>Events & Immersions</Link>
          <Link href="/#story" className="nav-link" onClick={() => setIsMobileOpen(false)}>About Sireesha</Link>
          <Link href="/#mirror-work" className="nav-link" onClick={() => setIsMobileOpen(false)}>Daily Affirmations</Link>
          <Link href="/#quiz" className="nav-link" onClick={() => setIsMobileOpen(false)}>Self-Love Assessment</Link>
          <Link href="/#connect" className="nav-link" onClick={() => setIsMobileOpen(false)}>Sanctuary Desk</Link>
        </nav>

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
    </>
  );
};
