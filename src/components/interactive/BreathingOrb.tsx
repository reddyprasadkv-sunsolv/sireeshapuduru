'use client';

import React, { useState, useEffect } from 'react';
import { useAudio } from '@/hooks/useAudio';

export const BreathingOrb: React.FC = () => {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [timer, setTimer] = useState(4);
  const { playSingingBowlChime } = useAudio();

  useEffect(() => {
    let currentPhase: 'Inhale' | 'Hold' | 'Exhale' = 'Inhale';
    let timeLeft = 4;

    const interval = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        if (currentPhase === 'Inhale') {
          currentPhase = 'Hold';
          timeLeft = 4;
        } else if (currentPhase === 'Hold') {
          currentPhase = 'Exhale';
          timeLeft = 4;
        } else {
          currentPhase = 'Inhale';
          timeLeft = 4;
        }
        setPhase(currentPhase);
      }
      setTimer(timeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="breathing-orb-container">
      <div className="breathing-outer-ring">
        <div className="breathing-inner-orb" onClick={() => playSingingBowlChime(432)}>
          <div className="orb-pulse-core">
            <span className="breathing-phase-text">{phase}</span>
            <span className="breathing-counter">{timer}s</span>
          </div>
        </div>
      </div>
      <p className="breathing-instruction">
        Sync your breath with the glowing sacred circle. Inhale peace, hold presence, exhale tension.
      </p>
    </div>
  );
};
