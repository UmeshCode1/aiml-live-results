/* =============================================
   AI & ML Club OCT — Live Updates Portal
   script.js — Lean, performant, clean
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. LOADING SCREEN ── */
  const loadingScreen = document.getElementById('loading-screen');
  const progressBar   = document.querySelector('.progress-bar');
  const percentageEl  = document.querySelector('.percentage');

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => { loadingScreen.style.display = 'none'; }, 750);
        // Start typewriter after loader completes
        typeWriter();
      }, 400);
    }
    progressBar.style.width = `${Math.min(progress, 100)}%`;
    percentageEl.textContent = `${Math.floor(Math.min(progress, 100))}%`;
  }, 120);


  /* ── 2. LIVE CLOCK ── */
  const timeEl = document.getElementById('current-time');
  function updateClock() {
    if (timeEl) timeEl.textContent = new Date().toLocaleTimeString();
  }
  updateClock();
  setInterval(updateClock, 1000);


  /* ── 3. TYPEWRITER EFFECT ── */
  const typingEl = document.getElementById('typing-text');
  const typePhrase = 'Receiving live updates from control center...';

  function typeWriter() {
    if (!typingEl) return;
    typingEl.textContent = '';
    let i = 0;
    const type = () => {
      if (i < typePhrase.length) {
        typingEl.textContent += typePhrase.charAt(i++);
        setTimeout(type, 48);
      } else {
        // Remove caret after pause
        setTimeout(() => {
          typingEl.style.borderRight = 'none';
        }, 1500);
      }
    };
    type();
  }


  /* ── 4. IFRAME SKELETON + LOAD ── */
  const docsIframe = document.getElementById('docs-iframe');
  const skeleton   = document.getElementById('skeleton-loader');

  if (docsIframe && skeleton) {
    docsIframe.addEventListener('load', () => {
      // Fade skeleton out
      skeleton.style.opacity = '0';
      skeleton.style.transition = 'opacity 0.5s ease';
      // Fade iframe in
      docsIframe.classList.add('loaded');
      setTimeout(() => { skeleton.style.display = 'none'; }, 500);
    });
  }


  /* ── 5. REFRESH BUTTON ── */
  const refreshBtn = document.getElementById('refresh-btn');
  const spinIcon   = refreshBtn ? refreshBtn.querySelector('.spin-icon') : null;

  if (refreshBtn && docsIframe && skeleton) {
    refreshBtn.addEventListener('click', () => {
      // Spin icon
      spinIcon && spinIcon.classList.add('fa-spin');
      // Show skeleton again
      docsIframe.classList.remove('loaded');
      skeleton.style.display = 'flex';
      skeleton.style.opacity  = '1';
      // Reload iframe (append timestamp to bust cache)
      const url = new URL(docsIframe.src);
      url.searchParams.set('t', Date.now());
      docsIframe.src = url.href;
      // Stop spin
      setTimeout(() => { spinIcon && spinIcon.classList.remove('fa-spin'); }, 1600);
    });
  }


  /* ── 6. MOUSE SPOTLIGHT ── */
  const glassEls = document.querySelectorAll('.glass-header, .glass-panel, .glass-footer');
  glassEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
      el.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
    });
  });


  /* ── 7. SCROLL PROGRESS BAR ── */
  const scrollProgressEl = document.getElementById('scroll-progress');
  let scrollTicking = false;

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollProgressEl && total > 0) {
          scrollProgressEl.style.width = `${(scrolled / total) * 100}%`;
        }
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });


  /* ── 8. BACK TO TOP BUTTON ── */
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.style.display = window.scrollY > 350 ? 'flex' : 'none';
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
