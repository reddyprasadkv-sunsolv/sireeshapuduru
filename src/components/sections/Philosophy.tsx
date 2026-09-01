'use client';

import React from 'react';

export const Philosophy: React.FC = () => {
  return (
    <section className="philosophy-section" id="philosophy">
      <div className="container">
        <div className="section-header text-center">
          <span className="eyebrow">The Sacred Framework</span>
          <h2 className="section-title">
            The 4 Pillars of <span className="gradient-text">Heart Restoration</span>
          </h2>
          <p className="section-subtitle">
            Drawing upon Louise Hay's timeless principles, Eastern somatic awareness, and subconscious reprogramming, we guide you through a gentle yet radical return to self-worth.
          </p>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon">🪞</div>
            <span className="pillar-number">01</span>
            <h3 className="pillar-title">Sacred Mirror Work</h3>
            <p className="pillar-text">
              Looking directly into your own eyes to confront and dissolve inner judgment, guilt, and the inherited belief that you are "not enough."
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">🕊️</div>
            <span className="pillar-number">02</span>
            <h3 className="pillar-title">Forgiveness as Freedom</h3>
            <p className="pillar-text">
              Forgiveness is not about condoning someone else's actions—it is about reclaiming your personal power and cutting the invisible energetic cord to past trauma.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">🌱</div>
            <span className="pillar-number">03</span>
            <h3 className="pillar-title">Inner Child Integration</h3>
            <p className="pillar-text">
              Going back to the little boy or girl within you who was frightened, criticized, or abandoned, and giving them the fierce love and validation they crave.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">✨</div>
            <span className="pillar-number">04</span>
            <h3 className="pillar-title">Subconscious Rewiring</h3>
            <p className="pillar-text">
              Replacing chronic anxiety, fear of abandonment, and scarcity conditioning with high-frequency affirmations and daily somatic grounding rituals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
