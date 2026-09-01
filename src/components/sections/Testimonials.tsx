'use client';

import React from 'react';

export const Testimonials: React.FC = () => {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-header text-center">
          <div className="eyebrow">
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Voices of Transformation
          </div>
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
            <div className="quote-stars">★★★★★</div>
            <p className="testimonial-quote">
              "Sireesha's 2-Day Heal Your Life workshop shifted something fundamental in my body. For 34 years, I could not look into a mirror without picking apart my flaws. During our guided mirror exercise, I wept tears of forgiveness. I am finally at peace with who I am."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">P</div>
              <div>
                <strong className="author-name">Pooja R.</strong>
                <div className="author-location">Corporate Leader, Bengaluru</div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="testimonial-card">
            <div className="quote-stars">★★★★★</div>
            <p className="testimonial-quote">
              "Working 1-on-1 with Sireesha was the best investment I ever made in my mental and emotional health. Her gentle presence created a container where I felt zero judgment. I resolved a 10-year resentment with my parents and stepped into a thriving new career chapter."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">A</div>
              <div>
                <strong className="author-name">Anand S.</strong>
                <div className="author-location">Tech Entrepreneur, Hyderabad</div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="testimonial-card">
            <div className="quote-stars">★★★★★</div>
            <p className="testimonial-quote">
              "The daily mirror affirmations and breathing meditations have completely replaced my morning anxiety. Sireesha's voice carries an authentic frequency of love that dissolves panic and anchors self-worth."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">M</div>
              <div>
                <strong className="author-name">Meera K.</strong>
                <div className="author-location">Author & Educator, Chennai</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
