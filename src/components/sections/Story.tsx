'use client';

import React from 'react';

export const Story: React.FC = () => {
  return (
    <section className="story-section" id="story">
      <div className="container story-container">
        <div className="story-media-wrap">
          <div className="story-image-stack">
            <div className="story-img-card card-main">
              <img src="assets/images/sanctuary.png" alt="Sireesha Puduru Teaching Sanctuary Workshop" className="story-img" />
              <div className="story-quote-overlay">
                <p className="story-overlay-quote">"The moment you choose to love yourself, miracles start to flood your life."</p>
                <span className="story-overlay-author">— Sireesha Puduru</span>
              </div>
            </div>
            <div className="story-experience-badge">
              <span className="badge-years">Louise Hay</span>
              <span className="badge-desc">Certified Facilitator</span>
            </div>
          </div>
        </div>

        <div className="story-content">
          <span className="eyebrow">The Sacred Awakening</span>
          <h2 className="story-title">
            "I spent years looking for love everywhere, until I found it in the <span className="gradient-text">Mirror</span>."
          </h2>

          <div className="story-body">
            <p>
              Like many of the seekers who walk through my doors, my journey did not begin on a mountain peak of serenity. It began in the dense fog of people-pleasing, perfectionism, chronic self-criticism, and the exhausting burden of trying to prove my worth to the world.
            </p>
            <p>
              When I discovered the profound wisdom of <strong>Louise Hay</strong> and began practicing genuine, teardrop-stained Mirror Work, my inner architecture shifted. I realized that until we heal the relationship we have with the person staring back at us in the mirror, every external success is hollow.
            </p>
            <p>
              Today, as the founder of <strong>The Art of Loving Academy</strong>, my sole calling is to create a safe, compassionate, and unconditionally loving space where you can lay down your heavy armor and remember who you truly are.
            </p>
          </div>

          <div className="story-credentials-grid">
            <div className="cred-item">
              <span className="cred-icon">📜</span>
              <div>
                <strong>Heal Your Life® Facilitator</strong>
                <p>Authorized Louise Hay Training Lineage</p>
              </div>
            </div>

            <div className="cred-item">
              <span className="cred-icon">💖</span>
              <div>
                <strong>Inner Child & Somatic Coach</strong>
                <p>Trauma-Informed Emotional Alchemy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
