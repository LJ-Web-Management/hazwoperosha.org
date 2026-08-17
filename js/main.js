document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Highlight the current page in the main nav
  var currentPath = window.location.pathname.replace(/index\.html$/, '');
  document.querySelectorAll('.main-nav a[href]').forEach(function (link) {
    var linkPath = link.getAttribute('href').split('#')[0].split('?')[0];
    if (!linkPath) return;
    var resolved = new URL(linkPath, window.location.href).pathname.replace(/index\.html$/, '');
    if (resolved && resolved === currentPath) {
      link.classList.add('is-current');
    }
  });

  // FAQ accordion (click-based, one open item per container)
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var answer = btn.nextElementSibling;
      var container = btn.closest('.faq-list, .faq-page-list') || document;

      container.querySelectorAll('.faq-question').forEach(function (other) {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.style.maxHeight = null;
        }
      });

      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      answer.style.maxHeight = expanded ? null : answer.scrollHeight + 'px';
    });
  });

  // Employer Toolkit: expand/collapse full checklist detail + print
  document.querySelectorAll('.toolkit-card').forEach(function (card) {
    var toggle = card.querySelector('.toolkit-toggle');
    var detail = card.querySelector('.toolkit-detail');
    if (toggle && detail) {
      toggle.addEventListener('click', function () {
        var isOpen = detail.classList.toggle('is-open');
        toggle.textContent = isOpen ? 'Hide Full Checklist' : 'View Full Checklist';
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }
    var printBtn = card.querySelector('.toolkit-print');
    if (printBtn) {
      printBtn.addEventListener('click', function () {
        if (detail) detail.classList.add('is-open');
        window.print();
      });
    }
  });

  // Compliance Finder (Home page interactive tool)
  var finder = document.getElementById('complianceFinder');
  if (finder) {
    var options = finder.querySelectorAll('.finder-option');
    var results = finder.querySelectorAll('.finder-result');
    var resetBtn = finder.querySelector('.finder-reset');
    var resultsWrap = finder.querySelector('.finder-results');

    var showResult = function (key) {
      options.forEach(function (opt) {
        opt.classList.toggle('is-selected', opt.dataset.role === key);
      });
      results.forEach(function (res) {
        res.classList.toggle('is-visible', res.dataset.role === key);
      });
      if (resultsWrap) {
        resultsWrap.hidden = false;
        resultsWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    };

    options.forEach(function (opt) {
      opt.addEventListener('click', function () {
        showResult(opt.dataset.role);
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        options.forEach(function (opt) { opt.classList.remove('is-selected'); });
        results.forEach(function (res) { res.classList.remove('is-visible'); });
        if (resultsWrap) resultsWrap.hidden = true;
      });
    }
  }

});
