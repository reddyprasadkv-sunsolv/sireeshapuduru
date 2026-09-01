'use client';

import React from 'react';

export const AmbientCanvas: React.FC = () => {
  return (
    <div className="ambient-canvas" aria-hidden="true">
      <div className="ambient-orb orb-gold" />
      <div className="ambient-orb orb-rose" />
      <div className="ambient-orb orb-emerald" />
    </div>
  );
};
