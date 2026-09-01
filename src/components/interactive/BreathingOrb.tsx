'use client';

import React, { useState, useEffect } from 'react';
import { useAudio } from '@/hooks/useAudio';

export const BreathingOrb: React.FC = () => {
  const [phase, setPhase] = useState<'Inhale Peace' | 'Hold Presence' | 'Exhale Tension'>('Inhale Peace');
  const [timer, setTimer] = useState(4);
  const { playSingingBowlChime } = useAudio();

  useEffect(() => {
    let currentPhase: 'Inhale Peace' | 'Hold Presence' | 'Exhale Tension' = 'Inhale Peace';
    let timeLeft = 4;

    const interval = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        if (currentPhase === 'Inhale Peace') {
          currentPhase = 'Hold Presence';
          timeLeft = 4;
        } else if (currentPhase === 'Hold Presence') {
          currentPhase = 'Exhale Tension';
          timeLeft = 4;
        } else {
          currentPhase = 'Inhale Peace';
          timeLeft = 4;
        }
        setPhase(currentPhase);
      }
      setTimer(timeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pause-reflect-section">
      <div className="container" style={{ maxWidth: '860px' }}>
        <div className="breathing-box">
          <div className="eyebrow">
            <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Somatic Sanctuary Moment
          </div>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
            Pause & <span className="gradient-text">Breathe with Sireesha</span>
          </h2>
          <p style={{ maxWidth: '540px', margin: '0 auto' }}>
            Sync your breath with the expanding sacred sphere. Tap the core to sound the 528Hz singing bowl chime.
          </p>

          <div className="breathing-orb-container" onClick={() => playSingingBowlChime(528)} style={{ cursor: 'pointer' }} title="Tap to chime">
            <div className="breathing-orb-outer" />
            <div className="breathing-orb-inner">
              <span className="breath-phase-text">{phase}</span>
              <span className="breath-counter-text">{timer} Seconds</span>
            </div>
          </div>

          <div className="reflection-prompt-card">
            <div className="reflection-question">
              "What part of you is asking for forgiveness and gentle acceptance right now?"
            </div>
            <small style={{ color: 'var(--text-muted)' }}>
              Place your right hand on your heart and whisper: <em>"I am listening. You are safe with me."</em>
            </small>
          </div>
        </div>
      </div>
    </section>
  );
};
