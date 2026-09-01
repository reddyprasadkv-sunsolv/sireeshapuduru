'use client';

import React from 'react';
import { getAssetPath } from '@/utils/assets';

export const Story: React.FC = () => {
  return (
    <section className="story-section" id="story">
      <div className="container story-grid">
        <div className="story-image-box">
          <div className="story-image-card">
            <img src={getAssetPath('assets/images/sanctuary.png')} alt="Sireesha Puduru Teaching Sanctuary Workshop" />
            <div className="story-quote-overlay">
              <p className="quote-highlight">"The moment you choose to love yourself, miracles start to flood your life."</p>
              <div style={{ fontSize: '0.85rem', color: '#ffffff', opacity: 0.9, marginTop: '4px' }}>— Sireesha Puduru</div>
            </div>
          </div>
        </div>

        <div className="story-content">
          <div className="eyebrow">
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            The Sacred Awakening
          </div>

          <h2>
            "I spent years looking for love everywhere, until I found it in the <span className="gradient-text">Mirror</span>."
          </h2>

          <p>
            Like many of the seekers who walk through my doors, my journey did not begin on a mountain peak of serenity. It began in the dense fog of people-pleasing, perfectionism, chronic self-criticism, and the exhausting burden of trying to prove my worth to the world.
          </p>

          <p>
            When I discovered the profound wisdom of <strong>Louise Hay</strong> and began practicing genuine, teardrop-stained Mirror Work, my inner architecture shifted. I realized that until we heal the relationship we have with the person staring back at us in the mirror, every external success is hollow.
          </p>

          <p>
            Today, as the founder of <strong>The Art of Loving Academy</strong>, my sole calling is to create a safe, compassionate, and unconditionally loving space where you can lay down your heavy armor and remember who you truly are.
          </p>

          <div className="milestones-grid">
            <div className="milestone-item">
              <div className="milestone-icon">📜</div>
              <span>Authorized Louise Hay Heal Your Life® Facilitator</span>
            </div>
            <div className="milestone-item">
              <div className="milestone-icon">💖</div>
              <span>Trauma-Informed Inner Child & Somatic Coach</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
