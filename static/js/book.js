/**
 * A Little World of Letters — Interactive Diary Page Turn & Book-Closing Animation
 * Handles 3D page flip effects, keyboard shortcuts, touch gestures,
 * and realistic 3D book closing with return to the birthday homepage.
 */

document.addEventListener('DOMContentLoaded', () => {
  const diarySheet = document.getElementById('diarySheet');
  const prevBtn = document.getElementById('prevPageBtn');
  const nextBtn = document.getElementById('nextPageBtn');
  const bookCover = document.getElementById('bookCover');
  const openBookBtn = document.getElementById('openBookBtn');

  // Close book buttons on the final page
  const closeBookMainBtn = document.getElementById('closeBookMainBtn');
  const closeBookNavBtn = document.getElementById('closeBookNavBtn');
  const closingTheater = document.getElementById('closingTheater');
  const closingRig = document.getElementById('closingRig');
  const vintageViewport = document.getElementById('vintageViewport');

  let isAnimating = false;

  // -------------------------------------------------------------------------
  // 1. Incoming page arrival animation from sessionStorage
  // -------------------------------------------------------------------------
  if (diarySheet) {
    const arrivalType = sessionStorage.getItem('diary_turn_dir');
    if (arrivalType === 'next') {
      diarySheet.classList.add('arriving-forward');
    } else if (arrivalType === 'prev') {
      diarySheet.classList.add('arriving-backward');
    }
    sessionStorage.removeItem('diary_turn_dir');

    setTimeout(() => {
      diarySheet.classList.remove('arriving-forward', 'arriving-backward');
    }, 800);
  }

  // -------------------------------------------------------------------------
  // 2. Realistic 3D Page Turn Handler
  // -------------------------------------------------------------------------
  function navigateWithFlip(targetUrl, direction) {
    if (!targetUrl || isAnimating) return;
    isAnimating = true;

    if (diarySheet) {
      sessionStorage.setItem('diary_turn_dir', direction);

      if (direction === 'next') {
        diarySheet.classList.add('turning-forward');
      } else {
        diarySheet.classList.add('turning-backward');
      }

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 650);
    } else {
      window.location.href = targetUrl;
    }
  }

  // Attach navigation events
  if (prevBtn && prevBtn.getAttribute('href')) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateWithFlip(prevBtn.getAttribute('href'), 'prev');
    });
  }

  if (nextBtn && nextBtn.getAttribute('href')) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateWithFlip(nextBtn.getAttribute('href'), 'next');
    });
  }

  // Cover opening animation
  if (openBookBtn && bookCover) {
    openBookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetUrl = openBookBtn.getAttribute('href');
      bookCover.style.transition = 'transform 0.75s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease';
      bookCover.style.transform = 'rotateY(-85deg) scale(0.95)';
      bookCover.style.opacity = '0.2';
      sessionStorage.setItem('diary_turn_dir', 'next');
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 650);
    });
  }

  // -------------------------------------------------------------------------
  // 3. Realistic 3D Book Closing Animation
  // -------------------------------------------------------------------------
  function triggerBookClosing(homeUrl) {
    if (isAnimating) return;
    isAnimating = true;

    // 1. Temporarily disable all close buttons
    const closeBtns = [closeBookMainBtn, closeBookNavBtn].filter(Boolean);
    closeBtns.forEach(btn => {
      btn.disabled = true;
      btn.style.pointerEvents = 'none';
      btn.classList.add('closing-active');
      const textSpan = btn.querySelector('.close-btn-text') || btn.querySelector('.nav-btn-text');
      if (textSpan) textSpan.textContent = 'Closing Book... ♡';
    });

    if (closingTheater && closingRig && vintageViewport) {
      // 2. Activate theater & fade out current page view
      closingTheater.classList.add('theater-active');
      vintageViewport.style.transition = 'opacity 0.4s ease';
      vintageViewport.style.opacity = '0';

      // 3. Stage 1: Both wings fold together towards spine (0 to 600ms)
      requestAnimationFrame(() => {
        closingRig.classList.add('folding');
      });

      // 4. Stage 2: Hardcover swings shut over the closed book (600ms to 1100ms)
      setTimeout(() => {
        closingRig.classList.add('shut');
      }, 600);

      // 5. Stage 3: Closed book hovers, scales down and fades away (1100ms to 1750ms)
      setTimeout(() => {
        closingRig.classList.add('disappear');
      }, 1100);

      // 6. Stage 4: Smoothly navigate to the original birthday homepage (1800ms)
      setTimeout(() => {
        window.location.href = homeUrl || '/';
      }, 1800);

    } else if (diarySheet) {
      // Fallback 3D fold on the sheet directly if theater elements are absent
      diarySheet.style.transition = 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s ease';
      diarySheet.style.transform = 'rotateY(-110deg) scale(0.85)';
      diarySheet.style.opacity = '0';

      setTimeout(() => {
        window.location.href = homeUrl || '/';
      }, 1600);
    } else {
      window.location.href = homeUrl || '/';
    }
  }

  // Attach Close Book triggers
  if (closeBookMainBtn) {
    closeBookMainBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetUrl = closeBookMainBtn.getAttribute('data-home-url') || '/';
      triggerBookClosing(targetUrl);
    });
  }

  if (closeBookNavBtn) {
    closeBookNavBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetUrl = closeBookNavBtn.getAttribute('data-home-url') || '/';
      triggerBookClosing(targetUrl);
    });
  }

  // -------------------------------------------------------------------------
  // 4. Keyboard Navigation (Arrow Keys)
  // -------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (isAnimating) return;
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.key === 'ArrowLeft') {
      if (prevBtn && prevBtn.getAttribute('href')) {
        navigateWithFlip(prevBtn.getAttribute('href'), 'prev');
      }
    } else if (e.key === 'ArrowRight') {
      if (nextBtn && nextBtn.getAttribute('href')) {
        navigateWithFlip(nextBtn.getAttribute('href'), 'next');
      }
    }
  });

  // -------------------------------------------------------------------------
  // 5. Mobile Touch Swipe Gesture Support
  // -------------------------------------------------------------------------
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  const minSwipeDistance = 50;
  const maxPerpendicularDistance = 80;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (isAnimating) return;
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;

    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaY) > maxPerpendicularDistance) return;

    if (deltaX < -minSwipeDistance) {
      if (nextBtn && nextBtn.getAttribute('href')) {
        navigateWithFlip(nextBtn.getAttribute('href'), 'next');
      }
    } else if (deltaX > minSwipeDistance) {
      if (prevBtn && prevBtn.getAttribute('href')) {
        navigateWithFlip(prevBtn.getAttribute('href'), 'prev');
      }
    }
  }
});
