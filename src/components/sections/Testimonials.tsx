'use client';

import React from 'react';

export const Testimonials: React.FC = () => {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-header text-center">
          <span className="eyebrow">Echoes of Transformation</span>
          <h2 className="section-title">
            Words from the <span className="gradient-text">Heart Sanctuary</span>
          </h2>
          <p className="section-subtitle">
            Real stories from individuals who stepped across fear, looked in the mirror, and reclaimed their peace.
          </p>
        </div>

        <div className="testimonials-grid">
          {/* Testimonial 1 */}
          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">
              "Sireesha's 2-Day Heal Your Life workshop shifted something fundamental in my body. For 34 years, I could not look into a mirror without picking apart my flaws. During our guided mirror exercise, I wept tears of forgiveness. I am finally at peace with who I am."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">P</div>
              <div>
                <strong className="author-name">Pooja R.</strong>
                <span className="author-role">Corporate Leader, Bengaluru</span>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="testimonial-card featured-testimonial">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">
              "Working 1-on-1 with Sireesha was the best investment I ever made in my mental and emotional health. Her gentle presence created a container where I felt zero judgment. I resolved a 10-year resentment with my parents and stepped into a thriving new career chapter."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">A</div>
              <div>
                <strong className="author-name">Anand S.</strong>
                <span className="author-role">Tech Entrepreneur, Hyderabad</span>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="testimonial-card">
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">
              "The daily mirror affirmations and breathing meditations have completely replaced my morning anxiety. Sireesha's voice carries an authentic frequency of love that dissolves panic and anchors self-worth."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">M</div>
              <div>
                <strong className="author-name">Meera K.</strong>
                <span className="author-role">Author & Educator, Chennai</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
