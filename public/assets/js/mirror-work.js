/* ==========================================================================
   LOUISE HAY MIRROR-WORK AFFIRMATION DECK ENGINE
   Author: Sireesha Puduru Brand System
   ========================================================================== */

const AFFIRMATIONS_DECK = [
  {
    id: 1,
    category: "Self-Worth & Love",
    text: "I love and approve of myself exactly as I am right now. I am worthy of all the good life has to offer.",
    prompt: "Look deeply into your own eyes in the mirror and say your name followed by: 'I love you, I really, really love you.'"
  },
  {
    id: 2,
    category: "Forgiveness & Freedom",
    text: "I release the past with love and step into the radiant present. Forgiveness is my gift to myself.",
    prompt: "Place your hand on your heart, take a deep breath, and whisper: 'I forgive myself for not knowing better then.'"
  },
  {
    id: 3,
    category: "Emotional Healing",
    text: "My emotions are safe with me. I no longer react from old pain; I respond from a place of deep inner peace.",
    prompt: "Acknowledge whatever you are feeling without judgment. Tell yourself: 'It is safe for me to feel this.'"
  },
  {
    id: 4,
    category: "Abundance & Prosperity",
    text: "Life loves me, and all my needs are taken care of. I am open and receptive to boundless blessings.",
    prompt: "Open your palms upward toward the sky and affirm: 'I welcome ease, abundance, and grace into every corner of my life.'"
  },
  {
    id: 5,
    category: "Breaking Old Patterns",
    text: "I choose to drop the heavy burden of perfection. Being authentically me is more than enough.",
    prompt: "Smile gently at your reflection in the mirror and say: 'Today, I choose myself without apology.'"
  },
  {
    id: 6,
    category: "Inner Child Healing",
    text: "I hold my inner child with tender love. You are safe now, you are seen, and you are cherished.",
    prompt: "Imagine wrapping your younger self in a warm, protective embrace. Tell them: 'I will never abandon you again.'"
  },
  {
    id: 7,
    category: "Trusting Life",
    text: "All is well in my world. Out of every situation, only good will come, and I am divinely protected.",
    prompt: "Breathe in trust, exhale worry. Remind yourself: 'The Universe has my back at every moment.'"
  },
  {
    id: 8,
    category: "Relationship Healing",
    text: "I radiate love, and love surrounds me everywhere. The way I speak to myself is the way life speaks back to me.",
    prompt: "Send a silent blessing of light to someone with whom you need emotional closure, then bless yourself."
  }
];

class MirrorWorkDeck {
  constructor() {
    this.deck = [...AFFIRMATIONS_DECK];
    this.currentIndex = 0;
    this.cardContainer = document.getElementById('mirrorCard');
    this.categoryEl = document.getElementById('affirmationCategory');
    this.textEl = document.getElementById('affirmationText');
    this.promptEl = document.getElementById('affirmationPrompt');
    this.drawBtn = document.getElementById('drawCardBtn');
    this.flipBtn = document.getElementById('flipCardBtn');
    this.copyBtn = document.getElementById('copyAffirmationBtn');
    this.shareBtn = document.getElementById('shareAffirmationBtn');

    this.init();
  }

  init() {
    if (!this.cardContainer || !this.drawBtn) return;

    this.drawBtn.addEventListener('click', () => this.drawNewCard());
    
    if (this.flipBtn) {
      this.flipBtn.addEventListener('click', () => this.toggleFlip());
    }

    this.cardContainer.addEventListener('click', () => this.toggleFlip());

    if (this.copyBtn) {
      this.copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.copyToClipboard();
      });
    }

    if (this.shareBtn) {
      this.shareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.shareWhatsApp();
      });
    }

    // Load initial card
    this.renderCard(this.deck[0]);
  }

  toggleFlip() {
    this.cardContainer.classList.toggle('flipped');
    if (window.sacredSound) {
      window.sacredSound.playBellChime();
    }
  }

  drawNewCard() {
    if (window.sacredSound) {
      window.sacredSound.playBellChime();
    }

    // Animate draw
    this.cardContainer.classList.remove('flipped');
    
    setTimeout(() => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * this.deck.length);
      } while (nextIndex === this.currentIndex && this.deck.length > 1);

      this.currentIndex = nextIndex;
      this.renderCard(this.deck[this.currentIndex]);
      this.cardContainer.classList.add('flipped');
    }, 300);
  }

  renderCard(item) {
    if (this.categoryEl) this.categoryEl.textContent = item.category;
    if (this.textEl) this.textEl.textContent = `"${item.text}"`;
    if (this.promptEl) this.promptEl.textContent = item.prompt;
  }

  copyToClipboard() {
    const current = this.deck[this.currentIndex];
    const text = `✨ Louise Hay Mirror Work by Sireesha Puduru:\n\n"${current.text}"\n\nDaily Practice: ${current.prompt}\n\nJoin the sanctuary: https://sireeshapuduru.com`;
    
    navigator.clipboard.writeText(text).then(() => {
      if (this.copyBtn) {
        const original = this.copyBtn.innerHTML;
        this.copyBtn.innerHTML = `<span>Copied with Love! ✨</span>`;
        setTimeout(() => {
          this.copyBtn.innerHTML = original;
        }, 2000);
      }
    });
  }

  shareWhatsApp() {
    const current = this.deck[this.currentIndex];
    const text = encodeURIComponent(`✨ *Daily Healing Affirmation* (The Art of Loving Academy):\n\n"${current.text}"\n\n🧘 *Mirror Practice:* ${current.prompt}\n\nHeal with Sireesha Puduru: https://sireeshapuduru.com`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new MirrorWorkDeck();
});
