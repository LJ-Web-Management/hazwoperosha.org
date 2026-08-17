document.addEventListener('DOMContentLoaded', function () {
  var CATALOG = window.HOC_CATALOG;
  var root = document.getElementById('courseFinder');
  if (!CATALOG || !root) return;

  var TAXONOMY = [
    { label: '40-Hour', re: /40[\s-]?Hour/i },
    { label: '30-Hour', re: /30[\s-]?Hour/i },
    { label: '24-Hour', re: /24[\s-]?Hour/i },
    { label: '16-Hour', re: /16[\s-]?Hour/i },
    { label: '10-Hour', re: /10[\s-]?Hour/i },
    { label: '8-Hour', re: /\b8[\s-]?Hour/i },
    { label: '4-Hour', re: /\b4[\s-]?Hour/i },
    { label: 'Refresher', re: /Refresher/i },
    { label: 'Supervisor', re: /Supervisor/i },
    { label: 'Competent Person', re: /Competent Person/i },
    { label: 'Awareness', re: /Awareness/i },
    { label: 'Cal/OSHA', re: /Cal[\/\s]?OSHA/i },
    { label: 'Spanish', re: /Spanish/i },
    { label: 'Endorsement', re: /Endorsement/i },
    { label: 'Class A', re: /Class A\b/i },
    { label: 'Class B', re: /Class B\b/i },
    { label: 'DOT', re: /\bDOT\b/i },
    { label: 'RCRA', re: /\bRCRA\b/i },
    { label: 'General Industry', re: /General Industry/i },
    { label: 'Construction', re: /Construction/i }
  ];

  var state = { category: null, activeChips: [], query: '' };

  var stepCategory = root.querySelector('.cf-step-category');
  var stepRefine = root.querySelector('.cf-step-refine');
  var categoryGrid = root.querySelector('.cf-category-grid');
  var breadcrumb = root.querySelector('.cf-breadcrumb-category');
  var changeCategoryBtn = root.querySelector('.cf-change-category');
  var chipWrap = root.querySelector('.cf-chips');
  var searchInput = root.querySelector('.cf-search');
  var resultsWrap = root.querySelector('.cf-results');
  var resultsCount = root.querySelector('.cf-results-count');

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderCategoryGrid() {
    categoryGrid.innerHTML = CATALOG.categories.map(function (cat, i) {
      return '<button type="button" class="cf-category-card" data-index="' + i + '">' +
        '<span class="cf-category-name">' + escapeHtml(cat.name) + '</span>' +
        '<span class="cf-category-count">' + cat.courses.length + ' course' + (cat.courses.length === 1 ? '' : 's') + '</span>' +
        '</button>';
    }).join('');

    categoryGrid.querySelectorAll('.cf-category-card').forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectCategory(parseInt(btn.dataset.index, 10));
      });
    });
  }

  function selectCategory(index) {
    state.category = CATALOG.categories[index];
    state.activeChips = [];
    state.query = '';
    searchInput.value = '';
    breadcrumb.textContent = state.category.name;
    stepCategory.hidden = true;
    stepRefine.hidden = false;
    renderChips();
    renderResults();
    stepRefine.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderChips() {
    var cat = state.category;
    var available = TAXONOMY.filter(function (tax) {
      var matches = cat.courses.filter(function (c) { return tax.re.test(c.t); }).length;
      return matches > 0 && matches < cat.courses.length;
    });

    if (!available.length) {
      chipWrap.innerHTML = '';
      chipWrap.hidden = true;
      return;
    }
    chipWrap.hidden = false;
    chipWrap.innerHTML = available.map(function (tax) {
      return '<button type="button" class="cf-chip" data-label="' + escapeHtml(tax.label) + '">' + escapeHtml(tax.label) + '</button>';
    }).join('');

    chipWrap.querySelectorAll('.cf-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var label = chip.dataset.label;
        var idx = state.activeChips.indexOf(label);
        if (idx === -1) {
          state.activeChips.push(label);
          chip.classList.add('is-active');
        } else {
          state.activeChips.splice(idx, 1);
          chip.classList.remove('is-active');
        }
        renderResults();
      });
    });
  }

  function getFilteredCourses() {
    var cat = state.category;
    if (!cat) return [];
    var activeRegexes = TAXONOMY.filter(function (t) { return state.activeChips.indexOf(t.label) !== -1; });
    var q = state.query.trim().toLowerCase();
    return cat.courses.filter(function (c) {
      if (q && c.t.toLowerCase().indexOf(q) === -1) return false;
      return activeRegexes.every(function (t) { return t.re.test(c.t); });
    });
  }

  function renderResults() {
    var results = getFilteredCourses();
    resultsCount.textContent = results.length + ' of ' + state.category.courses.length + ' courses match';

    if (!results.length) {
      resultsWrap.innerHTML = '<div class="cf-empty">No courses match those filters. <button type="button" class="cf-clear-filters">Clear filters</button> or <a href="tel:18664296742">call 1-866-429-6742</a> and we\'ll help you find it.</div>';
      var clearBtn = resultsWrap.querySelector('.cf-clear-filters');
      if (clearBtn) clearBtn.addEventListener('click', clearFilters);
      return;
    }

    var singleMatch = results.length === 1;
    resultsWrap.innerHTML = results.map(function (c) {
      return '<a class="cf-result-card' + (singleMatch ? ' is-single-match' : '') + '" href="' + CATALOG.baseUrl + c.u + '" target="_blank" rel="noopener">' +
        (singleMatch ? '<span class="cf-result-tag">This looks like your match</span>' : '') +
        '<span class="cf-result-title">' + escapeHtml(c.t) + '</span>' +
        '<span class="cf-result-cta">View Course &rarr;</span>' +
        '</a>';
    }).join('');
  }

  function clearFilters() {
    state.activeChips = [];
    state.query = '';
    searchInput.value = '';
    chipWrap.querySelectorAll('.cf-chip').forEach(function (c) { c.classList.remove('is-active'); });
    renderResults();
  }

  if (changeCategoryBtn) {
    changeCategoryBtn.addEventListener('click', function () {
      state.category = null;
      stepRefine.hidden = true;
      stepCategory.hidden = false;
      stepCategory.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      state.query = searchInput.value;
      renderResults();
    });
  }

  renderCategoryGrid();

  // Full directory (every category, every course — collapsed accordions)
  var directory = document.getElementById('courseDirectory');
  if (directory) {
    directory.innerHTML = CATALOG.categories.map(function (cat, i) {
      var links = cat.courses.map(function (c) {
        return '<a href="' + CATALOG.baseUrl + c.u + '" target="_blank" rel="noopener">' + escapeHtml(c.t) + '</a>';
      }).join('');
      return '<div class="directory-category">' +
        '<button type="button" class="directory-category-toggle" aria-expanded="false" aria-controls="dirCat' + i + '">' +
        '<span>' + escapeHtml(cat.name) + '</span>' +
        '<span class="directory-count">' + cat.courses.length + ' course' + (cat.courses.length === 1 ? '' : 's') + '</span>' +
        '<svg class="directory-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>' +
        '</button>' +
        '<div class="directory-category-list" id="dirCat' + i + '">' + links + '</div>' +
        '</div>';
    }).join('');

    directory.querySelectorAll('.directory-category-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var list = document.getElementById(btn.getAttribute('aria-controls'));
        var isOpen = list.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    });
  }
});
