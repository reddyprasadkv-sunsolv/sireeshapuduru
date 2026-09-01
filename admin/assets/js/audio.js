/* ==========================================================================
   WEB AUDIO API SOUND GENERATOR & MEDITATION PLAYER
   Author: Sireesha Puduru Brand System
   ========================================================================== */

class SacredSoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.ambientGain = null;
    this.oscillators = [];
    this.activeTrack = 'binaural'; // 'binaural', 'bowls', 'ocean'
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleAmbient(buttonEl) {
    this.init();
    if (this.isPlaying) {
      this.stopAmbient();
      this.isPlaying = false;
      if (buttonEl) {
        buttonEl.classList.remove('playing');
        const textSpan = buttonEl.querySelector('.sound-btn-text');
        if (textSpan) textSpan.textContent = 'Ambient: Off';
      }
    } else {
      this.startAmbient();
      this.isPlaying = true;
      if (buttonEl) {
        buttonEl.classList.add('playing');
        const textSpan = buttonEl.querySelector('.sound-btn-text');
        if (textSpan) textSpan.textContent = 'Ambient: 432Hz';
      }
    }
  }

  startAmbient() {
    if (!this.audioCtx) return;
    this.stopAmbient();

    // Create Master Gain
    this.ambientGain = this.audioCtx.createGain();
    this.ambientGain.gain.setValueAtTime(0.01, this.audioCtx.currentTime);
    this.ambientGain.gain.exponentialRampToValueAtTime(0.12, this.audioCtx.currentTime + 2.5);
    this.ambientGain.connect(this.audioCtx.destination);

    // Sacred 432Hz Root Drone
    const osc1 = this.audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(216, this.audioCtx.currentTime); // Sub-octave 216Hz

    const osc2 = this.audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(432, this.audioCtx.currentTime); // 432Hz Heart frequency

    const osc3 = this.audioCtx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(436, this.audioCtx.currentTime); // 4Hz Theta Binaural beat

    // Gentle low-pass filter
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(480, this.audioCtx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(this.ambientGain);

    osc1.start();
    osc2.start();
    osc3.start();

    this.oscillators = [osc1, osc2, osc3];
  }

  stopAmbient() {
    if (this.ambientGain && this.audioCtx) {
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1);
      setTimeout(() => {
        this.oscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch (e) {}
        });
        this.oscillators = [];
      }, 1000);
    }
  }

  playBellChime() {
    this.init();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, now); // 528Hz Transformation / Miracles tone
    osc.frequency.exponentialRampToValueAtTime(264, now + 3);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 3);
  }
}

// Global Sound Engine Instance
window.sacredSound = new SacredSoundEngine();

// Guided Meditation Player Simulation
document.addEventListener('DOMContentLoaded', () => {
  const playerCard = document.querySelector('.player-card');
  const playBtn = document.getElementById('meditationPlayBtn');
  const timeDisplay = document.getElementById('playerTime');
  const waveBars = document.querySelectorAll('.wave-bar');

  if (!playerCard || !playBtn) return;

  let isMeditationPlaying = false;
  let meditationSeconds = 0;
  const totalDuration = 600; // 10 minutes
  let timerInterval = null;
  let waveInterval = null;

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  playBtn.addEventListener('click', () => {
    isMeditationPlaying = !isMeditationPlaying;

    if (isMeditationPlaying) {
      window.sacredSound.init();
      window.sacredSound.playBellChime();
      playerCard.classList.add('active');
      playBtn.innerHTML = `
        <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
      `;

      // Start timer
      timerInterval = setInterval(() => {
        meditationSeconds++;
        if (meditationSeconds > totalDuration) meditationSeconds = 0;
        timeDisplay.textContent = `${formatTime(meditationSeconds)} / 10:00`;
      }, 1000);

      // Animate wave bars
      waveInterval = setInterval(() => {
        waveBars.forEach((bar) => {
          const height = Math.floor(Math.random() * 80) + 20;
          bar.style.height = `${height}%`;
        });
      }, 150);

    } else {
      playerCard.classList.remove('active');
      playBtn.innerHTML = `
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      `;
      clearInterval(timerInterval);
      clearInterval(waveInterval);
      waveBars.forEach(bar => bar.style.height = '20%');
    }
  });
});
