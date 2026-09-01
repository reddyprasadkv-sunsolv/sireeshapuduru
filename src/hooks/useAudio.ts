'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playSingingBowlChime = useCallback((freq = 528) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 3.6);
    } catch (e) {
      console.warn('Audio chime failed', e);
    }
  }, [getAudioContext]);

  const toggleAmbientSound = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (isPlaying) {
      // Stop
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {}
      });
      oscillatorsRef.current = [];
      setIsPlaying(false);
    } else {
      // Start 432Hz / 528Hz Ambient Drone
      try {
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        const freqs = [108, 216, 432, 528];
        const oscs: OscillatorNode[] = [];

        freqs.forEach(freq => {
          const osc = ctx.createOscillator();
          const panner = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          
          panner.gain.value = 0.5;
          osc.connect(panner);
          panner.connect(masterGain);
          osc.start();
          oscs.push(osc);
        });

        oscillatorsRef.current = oscs;
        setIsPlaying(true);
      } catch (e) {
        console.warn('Ambient sound failed to start', e);
      }
    }
  }, [isPlaying, getAudioContext]);

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {}
      });
    };
  }, []);

  return {
    isPlaying,
    toggleAmbientSound,
    playSingingBowlChime,
  };
}
