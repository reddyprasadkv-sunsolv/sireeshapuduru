/* ==========================================================================
   MODAL CONTROLLER & ARTICLE / BOOKING ENGINE
   Author: Sireesha Puduru Brand System
   ========================================================================== */

const ARTICLES_DATA = {
  article1: {
    tag: "Self-Compassion & Resilience",
    title: "How I Learned to Forgive Myself After Failure",
    readTime: "5 min read",
    content: `
      <p class="lead">The journey from self-blame to self-compassion was the hardest and most important work I have ever done in my life.</p>
      
      <p>There was a time when everything I touched seemed to crumble. I had invested my life savings, my identity, and my sleepless nights into multiple businesses that ultimately failed. But the true tragedy wasn't the loss of money; it was the ferocious, unforgiving voice in my own mind that declared, <em>"You are a failure. You aren't smart enough. You ruined everything."</em></p>

      <h4>The Trap of Self-Condemnation</h4>
      <p>When we make mistakes, society teaches us to punish ourselves. We replay every conversation, every bad decision, every wrong turn on an endless mental loop, believing that if we punish ourselves enough, we will somehow redeem the past. But guilt never rewrites history; it only paralyzes our present.</p>

      <blockquote style="border-left: 3px solid var(--accent-gold); padding-left: 1.25rem; font-family: var(--font-serif); font-style: italic; font-size: 1.2rem; color: var(--accent-gold-light); margin: 1.5rem 0;">
        "Forgiveness is not excusing poor choices; it is giving up the hope that the past could have been any different."
      </blockquote>

      <h4>The 3 Practices That Set Me Free</h4>
      <p><strong>1. Separating My Worth From My Circumstances:</strong> Your balance sheet is not your soul. Your failed relationship is an event, not your identity. When I started seeing failure as feedback rather than a character flaw, the shame began to dissolve.</p>
      
      <p><strong>2. Louise Hay Mirror Work:</strong> Standing in front of the mirror, looking into my own tired eyes, and saying: <em>"Sireesha, I forgive you for not knowing what you know now. I love you, and you did the best you could."</em> It brought tears for weeks, but it rebuilt my heart.</p>

      <p><strong>3. Honoring the Lessons as Sacred Initiation:</strong> Today, the very failures that once brought me to my knees are the bedrock of my wisdom. What healed me now heals hundreds of others across the globe.</p>

      <h4>A Gentle Prompt for You:</h4>
      <p>Place both hands on your chest right now. Take a deep, slow breath in. As you exhale, whisper to yourself: <em>"I release what I didn't know then, and I embrace the person I am becoming today."</em></p>
    `
  },
  article2: {
    tag: "Subconscious Healing",
    title: "The Truth About Emotional Blocks",
    readTime: "6 min read",
    content: `
      <p class="lead">What are emotional blocks, really? And why do they have such immense power over our happiness, wealth, and love?</p>

      <p>Have you ever felt like you're driving through life with one foot on the gas pedal and the other firmly slammed on the emergency brake? You set goals, visualize success, make vision boards, yet whenever you get close to a breakthrough, an invisible wall stops you in your tracks.</p>

      <h4>The Anatomy of an Emotional Block</h4>
      <p>An emotional block is not a lack of willpower or laziness. It is an unprocessed, unresolved emotional wound—usually formed in childhood or during a moment of intense trauma—that formed a protective belief system to keep you safe.</p>

      <p>For instance, if you were criticized or rejected as a child whenever you spoke up, your subconscious mind created a rule: <em>"Visibility equals danger. If I stay hidden and small, I won't get hurt."</em> Decades later, as an adult entrepreneur or leader, you find yourself procrastinating on launching your business or speaking in public.</p>

      <h4>Why External "Fixes" Never Work</h4>
      <p>We try desperately to fix emotional blocks through external changes: we change careers, switch partners, move to new cities, buy new productivity tools. But wherever you go, you take your subconscious emotional blueprint with you.</p>

      <blockquote style="border-left: 3px solid var(--accent-rose); padding-left: 1.25rem; font-family: var(--font-serif); font-style: italic; font-size: 1.2rem; color: var(--accent-rose-light); margin: 1.5rem 0;">
        "Until you make the unconscious conscious, it will direct your life and you will call it fate." — C.G. Jung
      </blockquote>

      <h4>How to Dissolve Emotional Blocks</h4>
      <p><strong>1. Awareness Without Judgment:</strong> Notice the trigger without reacting. When you feel anxiety or procrastination rising, ask: <em>"How old is the part of me that is feeling scared right now?"</em></p>
      
      <p><strong>2. Somatic Release:</strong> Emotions are physical energy trapped in the body. Crying, breathwork, and vocal release allow suppressed feelings to complete their cycle.</p>

      <p><strong>3. Rewriting Core Beliefs:</strong> In my 2-Day Heal Your Life workshops, we gently locate the root belief (e.g., 'I am not safe', 'I am not worthy') and replace it with unconditional truth.</p>
    `
  },
  article3: {
    tag: "Conscious Living & Awakening",
    title: "When You Finally Choose Yourself, Everything Changes",
    readTime: "4 min read",
    content: `
      <p class="lead">There comes a defining moment in every healing journey when you stop waiting for permission, stop waiting for others to change, and make the radical decision to choose yourself first.</p>

      <p>For most of our lives, we are trained to be chronic people-pleasers. We sacrifice our boundaries, swallow our true feelings, and exhaust our life force trying to keep everyone around us comfortable. We believe that self-sacrifice is nobility, only to end up depleted, resentful, and hollow inside.</p>

      <h4>The Myth of Selfishness</h4>
      <p>One of the biggest obstacles people face when entering my coaching sanctuary is the fear of being "selfish." But let me clarify this with all my heart:</p>
      
      <p><strong>Selfishness</strong> is demanding that others live their lives according to your desires.<br>
      <strong>Self-Love</strong> is taking responsibility for your own emotional well-being so that you can overflow with authentic love for the world.</p>

      <blockquote style="border-left: 3px solid var(--accent-emerald); padding-left: 1.25rem; font-family: var(--font-serif); font-style: italic; font-size: 1.2rem; color: var(--accent-emerald-light); margin: 1.5rem 0;">
        "You cannot pour from an empty cup, and you cannot heal the world by breaking your own heart."
      </blockquote>

      <h4>What Happens When You Choose Yourself:</h4>
      <ul>
        <li><strong>Relationships Transform:</strong> Toxic dynamics naturally fall away, while genuine, reciprocal connections deepen.</li>
        <li><strong>Peace Replaces Anxiety:</strong> You no longer obsess over what others think because you have anchored your validation within.</li>
        <li><strong>Abundance Flows:</strong> When your energy shifts from scarcity and seeking to wholeness and presence, opportunities flow effortlessly.</li>
      </ul>

      <p>Choosing yourself is not a one-time event; it is a sacred daily commitment. Every time you say no to what drains you, you say yes to the miracle of your own life.</p>
    `
  }
};

class ModalManager {
  constructor() {
    this.overlay = document.getElementById('generalModalOverlay');
    this.modalContent = document.getElementById('generalModalContent');
    this.closeBtn = document.getElementById('generalModalCloseBtn');

    this.init();
  }

  init() {
    if (!this.overlay) return;

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
        this.close();
      }
    });

    // Attach article triggers
    document.querySelectorAll('[data-article-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const articleId = btn.getAttribute('data-article-id');
        this.openArticle(articleId);
      });
    });

    // Attach discovery call booking triggers
    document.querySelectorAll('[data-modal-target="discovery"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDiscoveryBooking();
      });
    });

    // Attach free gift triggers
    document.querySelectorAll('[data-modal-target="free-gift"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openFreeGiftModal();
      });
    });
  }

  open(html) {
    if (!this.modalContent) return;
    this.modalContent.innerHTML = html;
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  openArticle(articleId) {
    const data = ARTICLES_DATA[articleId];
    if (!data) return;

    const html = `
      <div style="margin-bottom: 1.5rem;">
        <span class="eyebrow" style="margin-bottom: 0.5rem;">${data.tag} • ${data.readTime}</span>
        <h2 style="font-size: 2rem; margin-top: 0.5rem; margin-bottom: 1rem;">${data.title}</h2>
        <div style="height: 2px; width: 60px; background: var(--accent-gold); margin-bottom: 1.5rem;"></div>
      </div>
      <div class="article-body" style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);">
        ${data.content}
      </div>
      <div style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <span style="font-size: 0.9rem; color: var(--text-muted);">Written with Love by Sireesha Puduru</span>
        <a href="#connect" class="btn btn-primary btn-sm" onclick="window.modalManager.close()">Connect with Sireesha →</a>
      </div>
    `;

    this.open(html);
  }

  openDiscoveryBooking() {
    const today = new Date();
    const dates = [];
    for (let i = 1; i <= 5; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      dates.push(d);
    }

    const html = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <span class="eyebrow">The Art of Loving Sanctuary</span>
        <h2 style="font-size: 2.2rem; margin-top: 0.5rem;">Book Your Free Discovery Call</h2>
        <p style="font-size: 1rem; color: var(--text-secondary); max-width: 480px; margin-inline: auto;">
          A 20-minute sacred 1-on-1 confidential conversation to understand where you are, pinpoint emotional blocks, and see how we can guide your transformation.
        </p>
      </div>

      <form id="discoveryBookingForm" onsubmit="event.preventDefault(); window.modalManager.handleBookingSubmit(this);">
        <div style="margin-bottom: 1.5rem;">
          <label class="form-label">1. Select Preferred Date:</label>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 8px;">
            ${dates.map((d, idx) => `
              <label style="display: block; cursor: pointer;">
                <input type="radio" name="bookingDate" value="${d.toDateString()}" ${idx === 0 ? 'checked' : ''} style="display: none;" onchange="document.querySelectorAll('.date-slot-pill').forEach(el=>el.classList.remove('selected')); this.parentElement.querySelector('.date-slot-pill').classList.add('selected');">
                <div class="date-slot-pill ${idx === 0 ? 'selected' : ''}" style="border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 10px; text-align: center; background: var(--bg-glass); transition: all 0.2s;">
                  <div style="font-size: 0.75rem; color: var(--accent-gold); font-weight: 600;">${d.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary);">${d.getDate()} ${d.toLocaleDateString('en-US', { month: 'short' })}</div>
                </div>
              </label>
            `).join('')}
          </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <label class="form-label">2. Select Convenient Time Slot (IST):</label>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 8px;">
            {slots}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
          <div>
            <label class="form-label">Your Full Name *</label>
            <input type="text" name="name" class="form-control" placeholder="e.g. Radhika Sharma" required>
          </div>
          <div>
            <label class="form-label">WhatsApp Number *</label>
            <input type="tel" name="phone" class="form-control" placeholder="+91 98661 57263" required>
          </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <label class="form-label">Email Address *</label>
          <input type="email" name="email" class="form-control" placeholder="radhika@example.com" required>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <label class="form-label">What is the primary area you wish to heal?</label>
          <select name="focusArea" class="form-control" style="background: var(--bg-secondary);">
            <option value="Self-Love & Self-Worth">Self-Love & Rebuilding Self-Worth</option>
            <option value="Emotional Release & Past Wounds">Emotional Release & Past Wounds</option>
            <option value="Relationships & Heartbreak">Relationships & Heartbreak</option>
            <option value="Money Mindset & Business Blocks">Money Mindset & Business Blocks</option>
            <option value="General Spiritual Awakening">General Spiritual Awakening</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
          Confirm Free Discovery Call ✨
        </button>
      </form>
    `.replace('{slots}', `
      <label style="cursor: pointer;"><input type="radio" name="timeSlot" value="10:00 AM IST" checked style="display:none;" onchange="document.querySelectorAll('.time-slot-pill').forEach(el=>el.classList.remove('selected')); this.parentElement.querySelector('.time-slot-pill').classList.add('selected');"><div class="time-slot-pill selected" style="border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 8px; text-align: center; font-size: 0.85rem;">10:00 AM IST</div></label>
      <label style="cursor: pointer;"><input type="radio" name="timeSlot" value="02:00 PM IST" style="display:none;" onchange="document.querySelectorAll('.time-slot-pill').forEach(el=>el.classList.remove('selected')); this.parentElement.querySelector('.time-slot-pill').classList.add('selected');"><div class="time-slot-pill" style="border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 8px; text-align: center; font-size: 0.85rem;">02:00 PM IST</div></label>
      <label style="cursor: pointer;"><input type="radio" name="timeSlot" value="05:30 PM IST" style="display:none;" onchange="document.querySelectorAll('.time-slot-pill').forEach(el=>el.classList.remove('selected')); this.parentElement.querySelector('.time-slot-pill').classList.add('selected');"><div class="time-slot-pill" style="border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 8px; text-align: center; font-size: 0.85rem;">05:30 PM IST</div></label>
      <label style="cursor: pointer;"><input type="radio" name="timeSlot" value="07:30 PM IST" style="display:none;" onchange="document.querySelectorAll('.time-slot-pill').forEach(el=>el.classList.remove('selected')); this.parentElement.querySelector('.time-slot-pill').classList.add('selected');"><div class="time-slot-pill" style="border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 8px; text-align: center; font-size: 0.85rem;">07:30 PM IST</div></label>
    `);

    this.open(html);
  }

  handleBookingSubmit(form) {
    const formData = new FormData(form);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const date = formData.get('bookingDate');
    const time = formData.get('timeSlot');
    const area = formData.get('focusArea');

    if (window.sacredSound) window.sacredSound.playBellChime();

    // Capture in Leads Ledger
    if (window.leadsManager) {
      window.leadsManager.captureLead({
        type: 'Discovery Call Booking',
        name: name,
        email: email,
        phone: phone,
        details: `Slot: ${date} at ${time} | Healing Area: ${area}`
      });
    }

    const confirmedHtml = `
      <div style="text-align: center; padding: 2rem 1rem;">
        <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--accent-emerald-glow); color: var(--accent-emerald-light); font-size: 2.2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; border: 1px solid var(--accent-emerald);">
          ✓
        </div>
        <span class="eyebrow" style="color: var(--accent-emerald-light);">Call Confirmed</span>
        <h2 style="font-size: 2.2rem; margin-top: 0.5rem; margin-bottom: 1rem;">We're Honored to Connect With You, ${name}</h2>
        <p style="font-size: 1.05rem; color: var(--text-secondary); max-width: 480px; margin: 0 auto 1.5rem auto;">
          Your discovery session is reserved for <strong>${date} at ${time}</strong>.
        </p>

        <div style="background: var(--bg-glass); border: 1px solid var(--border-medium); border-radius: var(--radius-lg); padding: 1.25rem; max-width: 440px; margin: 0 auto 2rem auto; text-align: left; font-size: 0.92rem;">
          <div style="margin-bottom: 6px;">📅 <strong>Date & Time:</strong> ${date} (${time})</div>
          <div style="margin-bottom: 6px;">🎯 <strong>Focus:</strong> ${area}</div>
          <div style="margin-bottom: 6px;">📱 <strong>WhatsApp:</strong> ${phone}</div>
          <div>✉️ <strong>Confirmation sent to:</strong> ${email}</div>
        </div>

        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="https://api.whatsapp.com/send?phone=919866157263&text=${encodeURIComponent(`Hi Sireesha, I just booked my Free Discovery Call for ${date} at ${time} (Name: ${name}, Focus: ${area}). Looking forward to connecting!`)}" target="_blank" class="btn btn-whatsapp">
            Chat on WhatsApp Directly →
          </a>
          <button type="button" class="btn btn-secondary" onclick="window.modalManager.close()">Close Sanctuary Window</button>
        </div>
      </div>
    `;

    this.open(confirmedHtml);
  }

  openFreeGiftModal() {
    const html = `
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <span class="eyebrow">A Sacred Gift For Your Soul</span>
        <h2 style="font-size: 2.2rem; margin-top: 0.5rem; margin-bottom: 0.75rem;">Download Free Self-Love Audio Meditation</h2>
        <p style="font-size: 1.05rem; color: var(--text-secondary); max-width: 460px; margin-inline: auto;">
          A gentle 10-minute guided audio meditation by Sireesha Puduru designed to melt self-criticism, calm your nervous system, and reconnect with your heart.
        </p>
      </div>

      <div style="background: var(--bg-glass); border: 1px solid var(--border-medium); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.5rem;">
        <h4 style="color: var(--accent-gold); margin-bottom: 0.5rem;">✨ What's Inside This Meditation:</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.92rem; color: var(--text-secondary); text-align: left;">
          <li>🌿 432Hz Heart Chakra Binaural Frequency</li>
          <li>💖 Guided Louise Hay Mirror-Work Affirmations</li>
          <li>🧘 Somatic Breathing & Nervous System Reset</li>
        </ul>
      </div>

      <form onsubmit="event.preventDefault(); window.modalManager.handleGiftDownload(this);">
        <div style="margin-bottom: 1.25rem;">
          <label class="form-label">Your Name</label>
          <input type="text" name="name" class="form-control" placeholder="Your Name" required>
        </div>
        <div style="margin-bottom: 1.5rem;">
          <label class="form-label">Your WhatsApp / Email to Receive Audio</label>
          <input type="text" name="contact" class="form-control" placeholder="email@domain.com or +91..." required>
        </div>
        <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">
          Instant Access & Download MP3 ✨
        </button>
      </form>
    `;

    this.open(html);
  }

  handleGiftDownload(form) {
    if (window.sacredSound) window.sacredSound.playBellChime();
    const html = `
      <div style="text-align: center; padding: 2rem 1rem;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🎁</div>
        <h2 style="font-size: 2rem; margin-bottom: 0.75rem;">Your Meditation is Ready!</h2>
        <p style="font-size: 1.05rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
          May this sacred recording bring stillness, comfort, and unconditional love into your day.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="#free-gift" class="btn btn-primary" onclick="window.modalManager.close(); document.getElementById('meditationPlayBtn').click();">
            Play In Browser Now 🎵
          </a>
          <a href="https://chat.whatsapp.com/sireeshapuduru" target="_blank" class="btn btn-whatsapp">
            Join Daily WhatsApp Circle 💬
          </a>
        </div>
      </div>
    `;
    this.open(html);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.modalManager = new ModalManager();
});
