'use client';

import React, { useState } from 'react';
import { Affirmation } from '@/types';
import { useAudio } from '@/hooks/useAudio';

const AFFIRMATIONS: Affirmation[] = [
  { id: 1, text: "I love and approve of myself exactly as I am right now.", principle: "Self-Acceptance", theme: "Mirror Work Core", reflection: "Look into your eyes. Smile gently. You do not need to change anything to earn your own love." },
  { id: 2, text: "I forgive everyone in my past for all perceived wrongs. I release them with love.", principle: "Forgiveness", theme: "Emotional Freedom", reflection: "Forgiveness is a gift you give to yourself. It dissolves the energetic cords of old pain." },
  { id: 3, text: "I am safe in the universe, and all life loves and supports me.", principle: "Trust", theme: "Spiritual Surrender", reflection: "Release the need to control. Trust that life has your back in every situation." },
  { id: 4, text: "My heart is open. I allow love to flow freely in and out.", principle: "Heart Opening", theme: "Love & Relationships", reflection: "Your heart is resilient. It is safe to feel, safe to care, and safe to receive." },
  { id: 5, text: "I release the need to criticize myself and others. I choose peace.", principle: "Non-Judgment", theme: "Inner Dialogue", reflection: "Catch self-criticism in the act. Replace every harsh thought with gentle appreciation." },
  { id: 6, text: "I am willing to see how wonderful I truly am.", principle: "Deservingness", theme: "Self-Worth", reflection: "Your divine essence is untarnished by anything that happened in the past." },
  { id: 7, text: "I lovingly nurture and comfort my inner child today.", principle: "Inner Child", theme: "Reparenting", reflection: "Imagine taking your younger self by the hand and saying: 'You are safe. I am here for you.'" },
  { id: 8, text: "Prosperity and abundance are my natural divine birthrights.", principle: "Abundance", theme: "Financial Healing", reflection: "Wealth flows when you realize you are inherently deserving of life's boundless goodness." },
  { id: 9, text: "I easily release the past and step joyfully into the new.", principle: "Renewal", theme: "Life Transitions", reflection: "Every breath is a fresh start. You are not defined by who you were yesterday." },
  { id: 10, text: "I communicate my truth with love, grace, and unshakable boundaries.", principle: "Boundaries", theme: "Authentic Voice", reflection: "Saying 'no' to others is often saying a sacred 'yes' to your own soul." },
  { id: 11, text: "My body is a sacred temple of vibrant health, vitality, and peace.", principle: "Body Love", theme: "Physical Healing", reflection: "Thank your body for carrying you faithfully through every chapter of life." },
  { id: 12, text: "I am in the right place, at the right time, doing the right thing.", principle: "Divine Timing", theme: "Patience", reflection: "Relax into the unfolding of your destiny. Everything is happening in perfect alignment." },
  { id: 13, text: "I release all guilt. I did the best I knew how at the time.", principle: "Self-Forgiveness", theme: "Guilt Release", reflection: "When you know better, you do better. Forgive yourself for having been a human learning." },
  { id: 14, text: "I radiate love, and love is reflected back to me multiplied.", principle: "Law of Attraction", theme: "Magnetic Presence", reflection: "Be the energy of warmth and kindness you wish to attract into your life." },
  { id: 15, text: "I trust my intuition. My inner guidance is always clear and loving.", principle: "Intuition", theme: "Inner Wisdom", reflection: "Silence the external noise for 5 minutes. The answers already dwell within your heart." }
];

export const MirrorWorkDeck: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const { playSingingBowlChime } = useAudio();

  const current = AFFIRMATIONS[currentIndex];

  const handleDrawNew = () => {
    setIsFlipped(false);
    playSingingBowlChime(528);
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * AFFIRMATIONS.length);
    } while (nextIndex === currentIndex && AFFIRMATIONS.length > 1);
    setCurrentIndex(nextIndex);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${current.text}" — Louise Hay Mirror Affirmation | Sireesha Puduru`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`✨ Daily Mirror Affirmation from Sireesha Puduru:\n\n"${current.text}"\n\n🌿 Principle: ${current.principle}\n💖 Reflection: ${current.reflection}\n\nExperience The Art of Loving: https://reddyprasadkv-sunsolv.github.io/sireeshapuduru/`)}`;

  return (
    <section className="mirror-work-section" id="mirror-work">
      <div className="container">
        <div className="section-header text-center">
          <span className="eyebrow">Interactive Sanctuary Tool</span>
          <h2 className="section-title">
            Daily Louise Hay <span className="gradient-text">Mirror Work Deck</span>
          </h2>
          <p className="section-subtitle">
            Click to draw your daily sacred affirmation. Flip the card to explore its deeper Louise Hay somatic reflection.
          </p>
        </div>

        <div className="mirror-deck-wrapper">
          <div
            className={`affirmation-card ${isFlipped ? 'flipped' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
            title="Click to flip card"
          >
            <div className="card-inner">
              {/* Front Side */}
              <div className="card-face card-front">
                <span className="card-theme-tag">{current.theme}</span>
                <div className="mirror-reflection-ring">🪞</div>
                <h3 className="affirmation-quote-text">"{current.text}"</h3>
                <span className="card-principle">Principle: {current.principle}</span>
                <div className="card-tap-hint">Tap card to read reflection ↻</div>
              </div>

              {/* Back Side */}
              <div className="card-face card-back">
                <span className="card-theme-tag">Somatic Mirror Exercise</span>
                <p className="reflection-text">{current.reflection}</p>
                <div className="mirror-mantra-box">
                  <strong>Mirror Ritual:</strong> Look directly into your left eye for 60 seconds while speaking this affirmation aloud 3 times.
                </div>
                <div className="card-tap-hint">Tap card to flip back ↻</div>
              </div>
            </div>
          </div>

          <div className="deck-controls">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleDrawNew}
            >
              ✨ Draw New Card
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              🔄 Flip Card
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCopy}
            >
              {copied ? '✓ Copied!' : '📋 Copy Mantra'}
            </button>

            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              💬 Share on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
