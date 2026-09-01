'use client';

import React from 'react';
import { getAssetPath } from '@/utils/assets';

interface HeroProps {
  onOpenDiscovery?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDiscovery }) => {
  return (
    <section className="hero-section" id="sanctuary">
      <div className="container hero-grid">
        <div className="hero-content">
          <h1 className="hero-title">
            Transform Your Pain Into <span className="gradient-text">Power</span>. Reconnect With Your <span className="gradient-text">Heart</span>.
          </h1>

          <p className="hero-description lead">
            Welcome to a sacred sanctuary where you are safe to feel, heal, and forgive. Learn how to look in the mirror with deep reverence, dismantle inner criticism, and awaken your boundless spiritual potential.
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onOpenDiscovery}
            >
              <span>Book 20-Min Discovery Call</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>

            <a
              href="https://api.whatsapp.com/send?phone=919866157263&text=Hi%20Sireesha%2C%20I%20would%20like%20to%20talk%20to%20you%20regarding%20healing."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Talk to me</span>
            </a>
          </div>

          <div className="hero-stats-row">
            <div className="stat-item">
              <span className="stat-num">500+</span>
              <span className="stat-label">Lives Touched</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">100%</span>
              <span className="stat-label">Safe Sanctuary</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">Louise Hay</span>
              <span className="stat-label">Certified Lineage</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img
              src={getAssetPath('assets/images/sireesha-portrait.jpg')}
              alt="Sireesha Puduru Spiritual Life Coach & Healer"
            />
          </div>
          <div className="hero-floating-card">
            <div className="floating-icon">💖</div>
            <div>
              <div className="floating-text">"I am worthy of unconditional love."</div>
              <div className="floating-subtext">Daily Louise Hay Mirror Ritual</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
