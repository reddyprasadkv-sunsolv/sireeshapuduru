'use client';

import React, { useState } from 'react';
import { QuizQuestion, QuizResult } from '@/types';
import { useAudio } from '@/hooks/useAudio';

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "When you look into a mirror, what is your immediate reflex thought?",
    options: [
      { text: "I pick apart my flaws, wrinkles, or perceived imperfections.", score: 1, subtext: "Self-Critical Lens" },
      { text: "I feel neutral or avoid looking for too long.", score: 2, subtext: "Disconnection / Avoidance" },
      { text: "I look with compassion, smile, and say something kind.", score: 3, subtext: "Grounded Self-Love" }
    ]
  },
  {
    id: 2,
    question: "When a colleague or friend asks for a favor that drains your energy, you:",
    options: [
      { text: "Say yes immediately because I fear disappointing them.", score: 1, subtext: "People-Pleasing Pattern" },
      { text: "Hesitate, say yes reluctantly, and feel resentful later.", score: 2, subtext: "Weak Boundary Signal" },
      { text: "Politely and firmly decline without guilt.", score: 3, subtext: "Sacred Boundary Mastery" }
    ]
  },
  {
    id: 3,
    question: "How do you respond internally when you make an embarrassing mistake?",
    options: [
      { text: "I replay it for days and berate myself as a failure.", score: 1, subtext: "Harsh Inner Critic" },
      { text: "I feel anxious and look for external reassurance.", score: 2, subtext: "External Validation Need" },
      { text: "I forgive myself gently: 'I am human and learning.'", score: 3, subtext: "Self-Compassion Pillar" }
    ]
  },
  {
    id: 4,
    question: "When someone offers you a sincere compliment or gift, you:",
    options: [
      { text: "Deflect it, downplay it, or feel uncomfortable.", score: 1, subtext: "Unworthiness Barrier" },
      { text: "Say thank you but secretly wonder if they mean it.", score: 2, subtext: "Conditional Deservingness" },
      { text: "Receive it with an open heart and deep gratitude.", score: 3, subtext: "Abundance Alignment" }
    ]
  },
  {
    id: 5,
    question: "How often do you dedicate guilt-free time solely for your own emotional healing and joy?",
    options: [
      { text: "Rarely or never; other people's needs always come first.", score: 1, subtext: "Self-Sacrifice Trap" },
      { text: "Occasionally, but only when I reach total burnout.", score: 2, subtext: "Emergency Self-Care" },
      { text: "Daily as a non-negotiable sacred commitment.", score: 3, subtext: "Sanctuary Living" }
    ]
  }
];

interface SelfLoveQuizProps {
  onOpenDiscovery: () => void;
}

export const SelfLoveQuiz: React.FC<SelfLoveQuizProps> = ({ onOpenDiscovery }) => {
  const [currentStep, setCurrentStep] = useState(0); // 0 to 4
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const { playSingingBowlChime } = useAudio();

  const handleSelectOption = (score: number) => {
    const updated = [...answers, score];
    setAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate Result
      const total = updated.reduce((a, b) => a + b, 0);
      const percentage = Math.round((total / 15) * 100);
      playSingingBowlChime(528);

      if (total <= 8) {
        setResult({
          title: "The Weary Caregiver (Heart Under Pressure)",
          tagline: "Your inner child is exhausted from prioritizing everyone else's approval.",
          description: "You carry a deep capacity for love, but you are channeling it entirely outward while starving your own soul. You are prone to people-pleasing, guilt, and harsh self-criticism. Mirror work and boundary restoration will be life-changing for you.",
          quote: "Remember, you have been criticizing yourself for years and it hasn't worked. Try approving of yourself and see what happens. — Louise Hay",
          score: total,
          percentage
        });
      } else if (total <= 12) {
        setResult({
          title: "The Awakening Seeker (Bridge of Self-Compassion)",
          tagline: "You are beginning to hear your heart's whisper, but old habits pull you back.",
          description: "You know in your mind that you deserve love, but somatic patterns of self-doubt and guilt still trigger during high stress. Deep 1-on-1 inner child integration and structured forgiveness rituals will anchor your transformation permanently.",
          quote: "Love is the great miracle cure. Loving ourselves works miracles in our lives. — Louise Hay",
          score: total,
          percentage
        });
      } else {
        setResult({
          title: "The Radiant Heart (Aligned in Sovereignty)",
          tagline: "You have built a loving relationship with yourself and honor your worth.",
          description: "You possess strong self-acceptance and healthy boundaries. Your next evolution is stepping into leadership, expanding abundance consciousness, and holding healing space for your family and community.",
          quote: "I am in the right place, at the right time, doing the right thing. — Louise Hay",
          score: total,
          percentage
        });
      }
    }
  };

  const handleRetake = () => {
    setAnswers([]);
    setCurrentStep(0);
    setResult(null);
  };

  const q = QUIZ_QUESTIONS[currentStep];

  return (
    <section className="quiz-section" id="quiz">
      <div className="container" style={{ maxWidth: '820px' }}>
        <div className="section-header text-center">
          <span className="eyebrow">2-Minute Diagnostic Assessment</span>
          <h2 className="section-title">
            Where Does Your <span className="gradient-text">Self-Love Frequency</span> Stand?
          </h2>
          <p className="section-subtitle">
            Answer 5 reflective questions based on Louise Hay's mirror work diagnostic framework to reveal your primary healing archetype.
          </p>
        </div>

        <div className="quiz-card-wrapper">
          {!result ? (
            <div className="quiz-question-card">
              <div className="quiz-progress-bar">
                <div
                  className="quiz-progress-fill"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              <div className="quiz-step-label">
                Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
              </div>

              <h3 className="quiz-question-title">{q.question}</h3>

              <div className="quiz-options-list">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="quiz-option-btn"
                    onClick={() => handleSelectOption(opt.score)}
                  >
                    <span className="option-subtext">{opt.subtext}</span>
                    <span className="option-text">{opt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="quiz-result-card">
              <div className="result-score-badge">
                <span className="score-num">{result.percentage}%</span>
                <span className="score-label">Self-Love Alignment Score</span>
              </div>

              <h3 className="result-title">{result.title}</h3>
              <p className="result-tagline">{result.tagline}</p>
              <p className="result-desc">{result.description}</p>

              <blockquote className="result-quote">
                "{result.quote}"
              </blockquote>

              <div className="result-cta-group">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onOpenDiscovery}
                >
                  Discuss Your Results with Sireesha ✨
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleRetake}
                >
                  🔄 Retake Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
