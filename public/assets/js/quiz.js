/* ==========================================================================
   HEALING ASSESSMENT QUIZ WIZARD
   "Where Is Your Heart Today?" — Interactive Pathway Finder
   Author: Sireesha Puduru Brand System
   ========================================================================== */

const QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "1. What is the heaviest emotion or burden you are carrying right now?",
    options: [
      { text: "Lingering guilt or self-blame from past business, career, or personal failures.", type: "mirror" },
      { text: "Deep emotional blocks, anxiety, or recurring relationship friction and heartbreak.", type: "workshop" },
      { text: "Feeling disconnected from my true purpose, financial ceiling, or need for deep 1-on-1 private breakthrough.", type: "coaching" },
      { text: "Exhaustion from putting everyone else first and neglecting my own soul.", type: "mirror" }
    ]
  },
  {
    id: 2,
    title: "2. How would you honestly describe your current daily inner dialogue?",
    options: [
      { text: "Often critical, harsh, or questioning if I am truly good enough.", type: "mirror" },
      { text: "Swinging between optimism and sudden overwhelming emotional triggers.", type: "workshop" },
      { text: "Ready to step into my highest potential, but blocked by subconscious limiting beliefs.", type: "coaching" },
      { text: "Quietly numb or detached after years of holding things together.", type: "workshop" }
    ]
  },
  {
    id: 3,
    title: "3. What healing experience calls most to your spirit?",
    options: [
      { text: "Daily gentle rituals, mirror work, and cultivating unconditional self-compassion from home.", type: "mirror" },
      { text: "An intensive in-person weekend immersion where I can cry, release, and breakthrough with a sacred group.", type: "workshop" },
      { text: "A high-touch, confidential 3-month private mentorship tailored directly to my unique journey.", type: "coaching" },
      { text: "Starting small with guided meditations to quiet my mind and soothe my nervous system.", type: "mirror" }
    ]
  },
  {
    id: 4,
    title: "4. How ready are you to release what hurts and choose yourself?",
    options: [
      { text: "I am ready for a 21-day gentle step-by-step habit shift.", type: "mirror" },
      { text: "I want a complete weekend reset to break free from years of emotional baggage.", type: "workshop" },
      { text: "I am 100% committed to a profound life and mindset overhaul.", type: "coaching" },
      { text: "I am cautiously hopeful and seeking a safe space to begin.", type: "mirror" }
    ]
  }
];

const PROGRAM_RESULTS = {
  mirror: {
    badge: "Recommended Starting Sanctuary",
    title: "21-Day Self-Love with Mirror Work",
    subtitle: "Daily Online Transformation based on Louise Hay Wisdom",
    description: "Your answers reveal that your heart is ready to heal its inner dialogue and rebuild your self-worth from within. The 21-Day Mirror Work journey will help you release self-criticism, nurture your inner child, and fall in love with who you see in the mirror.",
    features: [
      "21 Daily Guided Audio Practices & Prompts",
      "Louise Hay Mirror Work Affirmation Formula",
      "Private WhatsApp Circle for Daily Accountability",
      "Lifetime Access to Reflection Workbooks"
    ],
    ctaText: "Enroll in 21-Day Program",
    ctaLink: "#programs"
  },
  workshop: {
    badge: "Recommended Breakthrough Experience",
    title: "2-Day Heal Your Life Immersive Workshop",
    subtitle: "Weekend In-Person Sacred Breakthrough",
    description: "Your spirit is asking for a deep, cathartic emotional release. In this powerful weekend immersion, you will identify and uproot the subconscious beliefs that have kept you stuck, and experience an unforgettable rebirth in a safe, loving container.",
    features: [
      "2 Full Days of Immersive In-Person Transformation",
      "Guided Louise Hay Emotional Release Rituals",
      "Subconscious Belief Reprogramming",
      "Personal Interaction & Energy Clearing with Sireesha"
    ],
    ctaText: "Reserve Workshop Seat",
    ctaLink: "#programs"
  },
  coaching: {
    badge: "Recommended Private Mentorship",
    title: "1-to-1 Personal Coaching Sanctuary",
    subtitle: "3-Month Confidential Private Journey",
    description: "You are ready for rapid, high-level transformation in your relationships, money mindset, and authentic self-expression. Sireesha will personally hold space for your unique soul blueprint with dedicated weekly sessions and direct mentorship.",
    features: [
      "Weekly 1-on-1 Deep Dive Private Sessions (Online/In-Person)",
      "Customized Emotional Root-Cause Analysis",
      "Direct WhatsApp VIP Access to Sireesha",
      "Tailored Practices for Money & Relationship Breakthroughs"
    ],
    ctaText: "Apply for 1-to-1 Coaching",
    ctaLink: "#connect"
  }
};

class HealingQuiz {
  constructor() {
    this.currentStep = 0;
    this.answers = [];
    this.container = document.getElementById('quizWizard');
    this.progressBar = document.getElementById('quizProgressFill');
    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderStep();
  }

  renderStep() {
    if (this.currentStep < QUIZ_QUESTIONS.length) {
      const q = QUIZ_QUESTIONS[this.currentStep];
      const progress = ((this.currentStep + 1) / QUIZ_QUESTIONS.length) * 100;
      if (this.progressBar) this.progressBar.style.width = `${progress}%`;

      this.container.innerHTML = `
        <div class="quiz-step active">
          <h3 class="quiz-question-title">${q.title}</h3>
          <div class="quiz-options-list">
            ${q.options.map((opt, idx) => `
              <div class="quiz-option-card" data-type="${opt.type}" data-idx="${idx}">
                <div class="quiz-radio"></div>
                <span class="quiz-option-text">${opt.text}</span>
              </div>
            `).join('')}
          </div>
          ${this.currentStep > 0 ? `<button type="button" class="btn btn-secondary btn-sm" id="quizBackBtn">← Previous Question</button>` : ''}
        </div>
      `;

      // Attach option listeners
      const optionCards = this.container.querySelectorAll('.quiz-option-card');
      optionCards.forEach(card => {
        card.addEventListener('click', () => {
          const type = card.getAttribute('data-type');
          this.answers[this.currentStep] = type;
          card.classList.add('selected');
          if (window.sacredSound) window.sacredSound.playBellChime();
          setTimeout(() => {
            this.currentStep++;
            this.renderStep();
          }, 350);
        });
      });

      const backBtn = this.container.querySelector('#quizBackBtn');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          this.currentStep--;
          this.renderStep();
        });
      }
    } else {
      this.renderResults();
    }
  }

  renderResults() {
    if (this.progressBar) this.progressBar.style.width = `100%`;

    // Calculate majority type
    const counts = { mirror: 0, workshop: 0, coaching: 0 };
    this.answers.forEach(ans => {
      if (counts[ans] !== undefined) counts[ans]++;
    });

    let bestType = 'mirror';
    if (counts.workshop > counts.mirror && counts.workshop >= counts.coaching) {
      bestType = 'workshop';
    } else if (counts.coaching > counts.mirror && counts.coaching > counts.workshop) {
      bestType = 'coaching';
    }

    const result = PROGRAM_RESULTS[bestType];

    this.container.innerHTML = `
      <div class="quiz-result-card animate-fadeInUp">
        <div class="result-badge">${result.badge}</div>
        <h3 class="result-title">${result.title}</h3>
        <p class="gold-text" style="font-size: 1.1rem; margin-bottom: 1rem;">${result.subtitle}</p>
        <p style="font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.5rem; max-width: 600px; margin-inline: auto;">
          ${result.description}
        </p>

        <div style="background: var(--bg-glass); border: 1px solid var(--border-medium); border-radius: var(--radius-lg); padding: 1.5rem; max-width: 500px; margin: 0 auto 2rem auto; text-align: left;">
          <h4 style="font-size: 1.1rem; margin-bottom: 0.75rem; color: var(--accent-gold);">What You'll Experience:</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
            ${result.features.map(f => `
              <li style="font-size: 0.92rem; color: var(--text-secondary); display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-gold);">✨</span> ${f}
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="${result.ctaLink}" class="btn btn-primary btn-lg">${result.ctaText} →</a>
          <button type="button" class="btn btn-secondary" id="retakeQuizBtn">Retake Assessment</button>
        </div>
      </div>
    `;

    const retakeBtn = this.container.querySelector('#retakeQuizBtn');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        this.currentStep = 0;
        this.answers = [];
        this.renderStep();
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new HealingQuiz();
});
