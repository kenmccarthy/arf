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

  /* --- Strategy Explorer (Module 3) --- */
  function initStrategyExplorer() {
    var container = document.getElementById('strategy-explorer');
    if (!container) return;

    var cards = container.querySelectorAll('.strategy-exp-card');
    cards.forEach(function (card) {
      var header = card.querySelector('.strategy-exp-header');
      if (!header) return;

      header.addEventListener('click', function () {
        var isOpen = card.classList.contains('open');
        card.classList.toggle('open');
        header.setAttribute('aria-expanded', !isOpen);
      });

      // Keyboard support
      header.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });
    });
  }

  /* --- Module 3 Knowledge Check (scenario-based, per-option feedback) --- */
  function initKnowledgeCheckM3() {
    var container = document.getElementById('knowledge-check-m3');
    if (!container) return;

    var options = container.querySelectorAll('.option-card');
    var feedbacks = container.querySelectorAll('.feedback-card');
    var closingNote = container.querySelector('.closing-note');
    var currentChoice = null;

    options.forEach(function (card) {
      card.addEventListener('click', function () {
        var choice = card.getAttribute('data-option');

        // Toggle off if clicking same
        if (currentChoice === choice) {
          currentChoice = null;
          card.classList.remove('selected');
          feedbacks.forEach(function (fb) { fb.classList.remove('visible'); });
          if (closingNote) closingNote.style.display = 'none';
          return;
        }

        currentChoice = choice;

        // Update selection
        options.forEach(function (c) { c.classList.remove('selected'); });
        card.classList.add('selected');

        // Show matching feedback
        feedbacks.forEach(function (fb) {
          if (fb.getAttribute('data-for') === choice) {
            fb.classList.remove('visible');
            void fb.offsetWidth;
            fb.classList.add('visible');
            setTimeout(function () {
              fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
          } else {
            fb.classList.remove('visible');
          }
        });

        // Show closing note
        if (closingNote) closingNote.style.display = 'block';
      });
    });
  }

  /* --- Redesign Workbench (Module 4) --- */
  function initWorkbench() {
    var container = document.getElementById('redesign-workbench');
    if (!container) return;

    var steps = container.querySelectorAll('.workbench-step');
    var dots = container.querySelectorAll('.workbench-dot');
    var progressText = container.querySelector('.workbench-progress-text');
    var total = steps.length;
    var current = 0;

    function goToStep(index) {
      if (index < 0 || index >= total) return;

      // Mark completed steps
      if (index > current) {
        dots[current].classList.remove('active');
        dots[current].classList.add('done');
      }
      // Going back: remove done from steps after target
      if (index < current) {
        for (var i = index + 1; i <= current; i++) {
          dots[i].classList.remove('active', 'done');
        }
      }

      steps[current].classList.remove('active');
      current = index;
      steps[current].classList.add('active');

      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });

      if (progressText) {
        progressText.textContent = 'Step ' + (current + 1) + ' of ' + total;
      }

      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Next buttons
    container.querySelectorAll('.workbench-next').forEach(function (btn) {
      btn.addEventListener('click', function () {
        // If going to Step 4, update paths
        if (current === 2) {
          updatePaths();
        }
        goToStep(current + 1);
      });
    });

    // Back buttons
    container.querySelectorAll('.workbench-back').forEach(function (btn) {
      btn.addEventListener('click', function () {
        goToStep(current - 1);
      });
    });

    // Step 2: Opportunity selection with contextual feedback
    var step2 = steps[1];
    if (step2) {
      var opOptions = step2.querySelectorAll('.opportunity-option');
      var ctxFeedbacks = step2.querySelectorAll('.context-feedback');
      var selectedOp = null;

      opOptions.forEach(function (opt) {
        opt.addEventListener('click', function () {
          var value = opt.getAttribute('data-value');

          // Toggle off
          if (selectedOp === value) {
            selectedOp = null;
            opt.classList.remove('selected');
            ctxFeedbacks.forEach(function (fb) { fb.classList.remove('visible'); });
            return;
          }

          selectedOp = value;
          opOptions.forEach(function (o) { o.classList.remove('selected'); });
          opt.classList.add('selected');

          ctxFeedbacks.forEach(function (fb) {
            if (fb.getAttribute('data-for') === value) {
              fb.classList.remove('visible');
              void fb.offsetWidth;
              fb.classList.add('visible');
            } else {
              fb.classList.remove('visible');
            }
          });
        });
      });
    }

    // Step 3: Strategy checkbox styling
    var step3 = steps[2];
    if (step3) {
      var stratChecks = step3.querySelectorAll('.strategy-check');
      stratChecks.forEach(function (chk) {
        var input = chk.querySelector('input[type="checkbox"]');
        chk.addEventListener('click', function (e) {
          if (e.target !== input) {
            input.checked = !input.checked;
          }
          chk.classList.toggle('checked', input.checked);
        });
      });
    }

    // Step 4: Show/hide paths based on Step 3 selections
    function updatePaths() {
      var step4 = steps[3];
      if (!step4 || !step3) return;

      var paths = step4.querySelectorAll('.redesign-path');
      var anyVisible = false;

      paths.forEach(function (path) {
        var strategy = path.getAttribute('data-strategy');
        var matchCheck = step3.querySelector('.strategy-check[data-strategy="' + strategy + '"] input');
        var isSelected = matchCheck && matchCheck.checked;
        path.classList.toggle('visible', isSelected);
        if (isSelected) anyVisible = true;
      });

      var noMsg = step4.querySelector('.no-selection-msg');
      if (noMsg) noMsg.style.display = anyVisible ? 'none' : 'block';
    }
  }

  /* --- Module 4 Knowledge Check (reveal feedback) --- */
  function initKnowledgeCheckM4() {
    var container = document.getElementById('knowledge-check-m4');
    if (!container) return;

    var revealBtn = container.querySelector('.kc-reveal');
    var feedback = document.getElementById('kc-m4-feedback');

    if (revealBtn && feedback) {
      revealBtn.addEventListener('click', function () {
        feedback.style.display = 'block';
        feedback.classList.add('visible');
        revealBtn.style.display = 'none';
        setTimeout(function () {
          feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      });
    }
  }

  /* --- Action Plan (Module 5) --- */
  function initActionPlan() {
    var container = document.getElementById('action-plan');
    if (!container) return;

    // Section 1: Next step selection with contextual feedback
    var nextStepContainer = document.getElementById('action-nextstep');
    if (nextStepContainer) {
      var nsOptions = nextStepContainer.querySelectorAll('.opportunity-option');
      var nsFeedbacks = container.querySelectorAll('#action-nextstep ~ .context-feedback');
      var selectedNS = null;

      // Gather feedbacks that are siblings after #action-nextstep
      var parent = nextStepContainer.parentElement;
      nsFeedbacks = parent.querySelectorAll('.action-section:first-child .context-feedback');

      nsOptions.forEach(function (opt) {
        opt.addEventListener('click', function () {
          var value = opt.getAttribute('data-value');

          if (selectedNS === value) {
            selectedNS = null;
            opt.classList.remove('selected');
            nsFeedbacks.forEach(function (fb) { fb.classList.remove('visible'); });
            return;
          }

          selectedNS = value;
          nsOptions.forEach(function (o) { o.classList.remove('selected'); });
          opt.classList.add('selected');

          nsFeedbacks.forEach(function (fb) {
            if (fb.getAttribute('data-for') === value) {
              fb.classList.remove('visible');
              void fb.offsetWidth;
              fb.classList.add('visible');
            } else {
              fb.classList.remove('visible');
            }
          });
        });
      });
    }

    // Section 2: Stakeholder checkboxes with dynamic count
    var stakeholderSection = document.getElementById('stakeholder-section');
    if (stakeholderSection) {
      var sChecks = stakeholderSection.querySelectorAll('input[type="checkbox"]');
      var sMsg = stakeholderSection.querySelector('.stakeholder-msg');

      sChecks.forEach(function (chk) {
        chk.addEventListener('change', function () {
          var count = stakeholderSection.querySelectorAll('input:checked').length;
          if (sMsg) {
            if (count > 0) {
              sMsg.querySelector('p').textContent = 'You\u2019ve identified ' + count + ' stakeholder' + (count !== 1 ? 's' : '') + '. That\u2019s realistic. You don\u2019t need everyone\u2019s permission to pilot a redesign, but you may need their buy-in for sustainability. Start with your closest colleague, test ideas, then expand the circle.';
              sMsg.style.display = 'block';
              sMsg.classList.add('visible');
            } else {
              sMsg.style.display = 'none';
              sMsg.classList.remove('visible');
            }
          }
        });
      });
    }

    // Section 3: Support checkboxes with message
    var supportSection = document.getElementById('support-section');
    if (supportSection) {
      var supChecks = supportSection.querySelectorAll('input[type="checkbox"]');
      var supMsg = supportSection.querySelector('.support-msg');

      supChecks.forEach(function (chk) {
        chk.addEventListener('change', function () {
          var count = supportSection.querySelectorAll('input:checked').length;
          if (supMsg) {
            if (count > 0) {
              supMsg.style.display = 'block';
              supMsg.classList.add('visible');
            } else {
              supMsg.style.display = 'none';
              supMsg.classList.remove('visible');
            }
          }
        });
      });
    }

    // Section 4: Commitment reveal
    var commitBtn = container.querySelector('.commit-btn');
    var commitFeedback = container.querySelector('.commit-feedback');
    if (commitBtn && commitFeedback) {
      commitBtn.addEventListener('click', function () {
        commitFeedback.style.display = 'block';
        commitFeedback.classList.add('visible');
        commitBtn.style.display = 'none';
        setTimeout(function () {
          commitFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      });
    }
  }

  /* --- Module 5 Knowledge Check (reflective, reveal feedback) --- */
  function initKnowledgeCheckM5() {
    var container = document.getElementById('knowledge-check-m5');
    if (!container) return;

    var revealBtn = container.querySelector('.kc-reveal');
    var feedback = document.getElementById('kc-m5-feedback');

    if (revealBtn && feedback) {
      revealBtn.addEventListener('click', function () {
        feedback.style.display = 'block';
        feedback.classList.add('visible');
        revealBtn.style.display = 'none';
        setTimeout(function () {
          feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      });
    }
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
    initStrategyExplorer();
    initKnowledgeCheckM3();
    initWorkbench();
    initKnowledgeCheckM4();
    initActionPlan();
    initKnowledgeCheckM5();
    initScrollToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
