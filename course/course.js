/* ============================================
   Assessment Redesign Framework — Course
   Interactive enhancements
   ============================================ */

(function () {
  'use strict';

  /* --- Mobile nav toggle --- */
  function initCourseNav() {
    var toggle = document.querySelector('.course-nav-toggle');
    var nav = document.querySelector('.course-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });

    // Close on link click
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && nav.classList.contains('open')) {
        nav.classList.remove('open');
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
      }
    });
  }

  /* --- Scenario Activity (toggle/re-selectable) --- */
  function initScenario() {
    var container = document.getElementById('scenario-activity');
    if (!container) return;

    var options = container.querySelectorAll('.option-card');
    var feedbacks = container.querySelectorAll('.feedback-card');
    var reflection = container.querySelector('.reflection-box');
    var currentChoice = null;

    options.forEach(function (card) {
      card.addEventListener('click', function () {
        var choice = card.getAttribute('data-option');

        // If clicking the already-selected card, deselect it
        if (currentChoice === choice) {
          currentChoice = null;
          card.classList.remove('selected');
          // Hide all feedback
          feedbacks.forEach(function (fb) { fb.classList.remove('visible'); });
          if (reflection) reflection.style.display = 'none';
          return;
        }

        currentChoice = choice;

        // Update selection visuals
        options.forEach(function (c) { c.classList.remove('selected'); });
        card.classList.add('selected');

        // Show only the matching feedback, hide others
        feedbacks.forEach(function (fb) {
          if (fb.getAttribute('data-for') === choice) {
            fb.classList.remove('visible');
            // Force reflow for re-animation
            void fb.offsetWidth;
            fb.classList.add('visible');
            setTimeout(function () {
              fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
          } else {
            fb.classList.remove('visible');
          }
        });

        // Show reflection box
        if (reflection) reflection.style.display = 'block';
      });
    });
  }

  /* --- Knowledge Check (re-selectable) --- */
  function initKnowledgeCheck() {
    var container = document.getElementById('knowledge-check');
    if (!container) return;

    var options = container.querySelectorAll('.kc-option');
    var submitBtn = container.querySelector('.kc-submit');
    var feedbacks = container.querySelectorAll('.feedback-card');
    var correctAnswer = container.getAttribute('data-correct');
    var selectedOption = null;

    function reset() {
      selectedOption = null;
      options.forEach(function (o) {
        o.classList.remove('selected', 'correct', 'incorrect', 'disabled');
      });
      feedbacks.forEach(function (fb) { fb.classList.remove('visible'); });
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.display = '';
        submitBtn.textContent = 'Check Answer';
      }
    }

    options.forEach(function (opt) {
      opt.addEventListener('click', function () {
        // If already showing results, reset to allow retry
        if (submitBtn && submitBtn.style.display === 'none') {
          reset();
        }

        selectedOption = opt.getAttribute('data-option');

        // Update visual selection
        options.forEach(function (o) { o.classList.remove('selected'); });
        opt.classList.add('selected');

        // Enable submit
        if (submitBtn) submitBtn.disabled = false;
      });
    });

    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        if (!selectedOption) return;

        // Mark correct/incorrect
        options.forEach(function (o) {
          o.classList.remove('selected');
          o.classList.add('disabled');
          var val = o.getAttribute('data-option');
          if (val === correctAnswer) {
            o.classList.add('correct');
          } else if (val === selectedOption) {
            o.classList.add('incorrect');
          }
        });

        // Show appropriate feedback
        var isCorrect = selectedOption === correctAnswer;
        feedbacks.forEach(function (fb) {
          fb.classList.remove('visible');
          var forVal = fb.getAttribute('data-for');
          if (forVal === 'correct' && isCorrect) {
            fb.classList.add('visible');
          } else if (forVal === 'incorrect' && !isCorrect) {
            fb.classList.add('visible');
          }
        });

        // Hide submit, allow clicking an option to try again
        submitBtn.style.display = 'none';
      });
    }
  }

  /* --- Risk Scenario Stepper (Module 2) --- */
  function initRiskScenarios() {
    var container = document.getElementById('risk-activity');
    if (!container) return;

    var slides = container.querySelectorAll('.scenario-slide');
    var dots = container.querySelectorAll('.scenario-dot');
    var progressText = container.querySelector('.scenario-progress-text');
    var reflection = document.getElementById('risk-reflection');
    var currentSlide = 0;
    var total = slides.length;

    // Init each slide's risk options
    slides.forEach(function (slide, slideIndex) {
      var options = slide.querySelectorAll('.risk-option');
      var feedback = slide.querySelector('.feedback-card');
      var nextBtn = slide.querySelector('.scenario-next-btn');
      var selected = null;

      options.forEach(function (opt) {
        opt.addEventListener('click', function () {
          var risk = opt.getAttribute('data-risk');

          // Toggle off if clicking same
          if (selected === risk) {
            selected = null;
            opt.classList.remove('selected');
            if (feedback) feedback.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
          }

          selected = risk;
          options.forEach(function (o) { o.classList.remove('selected'); });
          opt.classList.add('selected');

          // Show feedback
          if (feedback) {
            feedback.style.display = 'none';
            void feedback.offsetWidth;
            feedback.style.display = 'block';
            feedback.classList.add('visible');
            setTimeout(function () {
              feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
          }

          // Show next button
          if (nextBtn) nextBtn.style.display = '';

          // Mark dot as done
          if (dots[slideIndex]) dots[slideIndex].classList.add('done');
        });
      });

      // Next button
      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          if (slideIndex < total - 1) {
            goToSlide(slideIndex + 1);
          } else {
            // Last scenario - show reflection
            if (reflection) reflection.style.display = 'block';
          }
        });
      }
    });

    function goToSlide(index) {
      slides[currentSlide].classList.remove('active');
      currentSlide = index;
      slides[currentSlide].classList.add('active');

      // Update dots
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === currentSlide);
      });

      // Update progress text
      if (progressText) {
        progressText.textContent = 'Scenario ' + (currentSlide + 1) + ' of ' + total;
      }

      // Scroll to top of activity
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* --- Module 2 Knowledge Check (reflective, no right/wrong) --- */
  function initKnowledgeCheckM2() {
    var container = document.getElementById('knowledge-check-m2');
    if (!container) return;

    var riskOptions = container.querySelectorAll('.risk-option');
    var feedback = document.getElementById('kc-m2-feedback');
    var textareas = container.querySelectorAll('.open-text');

    riskOptions.forEach(function (opt) {
      opt.addEventListener('click', function () {
        var risk = opt.getAttribute('data-risk');

        // Toggle
        if (opt.classList.contains('selected')) {
          opt.classList.remove('selected');
          if (feedback) feedback.style.display = 'none';
          return;
        }

        riskOptions.forEach(function (o) { o.classList.remove('selected'); });
        opt.classList.add('selected');

        // Show feedback
        if (feedback) {
          feedback.style.display = 'none';
          void feedback.offsetWidth;
          feedback.style.display = 'block';
          feedback.classList.add('visible');
        }
      });
    });
  }

  /* --- Scroll to top --- */
  function initScrollToTop() {
    var btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 12 10 7 5 12"/></svg>';
    document.body.appendChild(btn);

    // Add CSS for scroll-top if not already present
    if (!document.querySelector('.scroll-top-styles')) {
      var style = document.createElement('style');
      style.className = 'scroll-top-styles';
      style.textContent = '.scroll-top{position:fixed;bottom:2rem;right:2rem;width:44px;height:44px;border-radius:50%;background:var(--color-primary);color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-md);opacity:0;transform:translateY(10px);transition:opacity .25s ease,transform .25s ease,background .15s ease;pointer-events:none;z-index:90}.scroll-top.visible{opacity:1;transform:translateY(0);pointer-events:auto}.scroll-top:hover{background:var(--color-accent)}';
      document.head.appendChild(style);
    }

    var visible = false;
    window.addEventListener('scroll', function () {
      var show = window.scrollY > 400;
      if (show !== visible) {
        visible = show;
        btn.classList.toggle('visible', show);
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Init --- */
  function init() {
    initCourseNav();
    initScenario();
    initKnowledgeCheck();
    initRiskScenarios();
    initKnowledgeCheckM2();
    initScrollToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
