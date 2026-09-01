'use client';

import React from 'react';
import { getAssetPath } from '@/utils/assets';

export const Philosophy: React.FC = () => {
  return (
    <section className="philosophy-section" id="philosophy">
      <div className="container">
        <div className="section-header text-center">
          <div className="eyebrow">
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            The Sacred Framework
          </div>
          <h2 className="section-title">
            The 4 Pillars of <span className="gradient-text">Heart Restoration</span>
          </h2>
          <p className="section-subtitle">
            Drawing upon Louise Hay's timeless principles, Eastern somatic awareness, and subconscious reprogramming, we guide you through a gentle yet radical return to self-worth.
          </p>
        </div>

        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-img-thumb">
              <img src={getAssetPath('assets/images/self-love.png')} alt="Sacred Mirror Work Louise Hay" />
            </div>
            <h3 className="pillar-title">01. Sacred Mirror Work</h3>
            <p>
              Looking directly into your own eyes to confront and dissolve inner judgment, guilt, and the inherited belief that you are "not enough."
            </p>
            <div className="pillar-quote">
              "The mirror reflects back to you the feelings you have about yourself."
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-img-thumb">
              <img src={getAssetPath('assets/images/meditation.png')} alt="Forgiveness Emotional Freedom" />
            </div>
            <h3 className="pillar-title">02. Forgiveness as Freedom</h3>
            <p>
              Forgiveness is not about condoning someone else's actions—it is about reclaiming your personal power and cutting the invisible energetic cord to past trauma.
            </p>
            <div className="pillar-quote">
              "Forgiveness is the golden key to the prison of resentment."
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-img-thumb">
              <img src={getAssetPath('assets/images/sanctuary.png')} alt="Inner Child Integration Reparenting" />
            </div>
            <h3 className="pillar-title">03. Inner Child Integration</h3>
            <p>
              Going back to the little boy or girl within you who was frightened, criticized, or abandoned, and giving them the fierce love and validation they crave.
            </p>
            <div className="pillar-quote">
              "Your inner child only wants to know that you will never abandon them again."
            </div>
          </div>

          <div className="pillar-card">
            <div className="pillar-img-thumb">
              <img src={getAssetPath('assets/images/connect.png')} alt="Subconscious Rewiring Affirmations" />
            </div>
            <h3 className="pillar-title">04. Subconscious Rewiring</h3>
            <p>
              Replacing chronic anxiety, fear of abandonment, and scarcity conditioning with high-frequency affirmations and daily somatic grounding rituals.
            </p>
            <div className="pillar-quote">
              "Every thought you think is creating your future reality."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
