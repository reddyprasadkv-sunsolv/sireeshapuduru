/* ==========================================================================
   APP MAIN CONTROLLER
   Theme, Navigation, Breathing Cycle, Forms, Smooth Scroll
   Author: Sireesha Puduru Brand System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Switcher
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const rootHtml = document.documentElement;

  // Retrieve saved theme or default to twilight
  const savedTheme = localStorage.getItem('sireesha_theme') || 'twilight';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = rootHtml.getAttribute('data-theme') === 'dawn' ? 'twilight' : 'dawn';
      setTheme(current);
      if (window.sacredSound) window.sacredSound.playBellChime();
    });
  }

  function setTheme(theme) {
    if (theme === 'dawn') {
      rootHtml.setAttribute('data-theme', 'dawn');
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        `;
        themeToggleBtn.setAttribute('title', 'Switch to Sacred Twilight Mode');
      }
    } else {
      rootHtml.removeAttribute('data-theme');
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        `;
        themeToggleBtn.setAttribute('title', 'Switch to Ethereal Dawn Mode');
      }
    }
    localStorage.setItem('sireesha_theme', theme);
  }

  // 2. Ambient Sound Toggle
  const ambientBtn = document.getElementById('ambientSoundBtn');
  if (ambientBtn) {
    ambientBtn.addEventListener('click', () => {
      window.sacredSound.toggleAmbient(ambientBtn);
    });
  }

  // 3. Navbar Scrolled State & Active Link Spy
  const navbar = document.querySelector('.navbar-wrapper');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Active link highlighting
    let currentId = '';
    const scrollPos = window.scrollY + 200;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // 4. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.innerHTML = '☰';
      });
    });
  }

  // 5. Guided Breathing Cycle Text Controller (12s total: 4s Inhale, 4s Hold, 4s Exhale)
  const breathPhaseText = document.getElementById('breathPhaseText');
  const breathCounterText = document.getElementById('breathCounterText');

  if (breathPhaseText && breathCounterText) {
    let second = 0;
    setInterval(() => {
      const cycleSec = second % 12;

      if (cycleSec < 4) {
        breathPhaseText.textContent = 'Inhale Love';
        breathCounterText.textContent = `Breathe In (${4 - cycleSec}s)`;
      } else if (cycleSec < 8) {
        breathPhaseText.textContent = 'Hold Peace';
        breathCounterText.textContent = `Hold Gently (${8 - cycleSec}s)`;
      } else {
        breathPhaseText.textContent = 'Exhale Fear';
        breathCounterText.textContent = `Release (${12 - cycleSec}s)`;
      }
      second++;
    }, 1000);
  }

  // 6. Contact Form Submission & Direct WhatsApp Message Generator
  const contactForm = document.getElementById('mainContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || '';
      const message = formData.get('message') || '';

      if (window.sacredSound) window.sacredSound.playBellChime();

      // Capture into Leads Ledger
      if (window.leadsManager) {
        window.leadsManager.captureLead({
          type: 'Contact Inquiry Message',
          name: name,
          email: email,
          phone: phone,
          details: message
        });
      }

      // Show success feedback
      const formContainer = contactForm.parentElement;
      formContainer.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1.5rem; animation: fadeInUp 0.5s ease;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🕊️</div>
          <span class="eyebrow" style="color: var(--accent-emerald-light);">Message Received</span>
          <h3 style="font-size: 2rem; margin-top: 0.5rem; margin-bottom: 1rem;">Thank You, ${name}</h3>
          <p style="font-size: 1.05rem; color: var(--text-secondary); max-width: 480px; margin: 0 auto 1.5rem auto;">
            Your message has been received into our sacred space. Sireesha reads every message with deep care and will respond personally.
          </p>
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <a href="https://api.whatsapp.com/send?phone=919866157263&text=${encodeURIComponent(`Hi Sireesha, I sent a message through your website:\n\n"${message}"\n\nName: ${name}\nPhone: ${phone}`)}" target="_blank" class="btn btn-whatsapp">
              Send via WhatsApp Immediately 💬
            </a>
          </div>
        </div>
      `;
    });
  }

  // 7. Scroll Reveal Animation Observer
  const revealElements = document.querySelectorAll('.reveal-init');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
});
