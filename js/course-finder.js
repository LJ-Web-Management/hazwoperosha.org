/* Course Finder — question-by-question wizard that adaptively narrows the
   full HAZWOPER OSHA Training catalog (1,000+ courses) down to exactly one
   course. Reads live from window.HOC_MASTER_CATALOG (js/catalog-data.js).
   Category is always asked first, then the engine picks whichever facet
   (industry, type, regulator, duration) best splits the remaining
   candidates at each step, skipping any facet that doesn't discriminate.
   Once no facet can narrow further, the visitor searches/picks the exact
   course by name from what's left. */
(function () {

  var TEL = 'tel:18664296742';
  var TEL_LABEL = '1-866-429-6742';
  var BASE_URL = 'https://hazwoper-osha.com/';
  var NAME_LIST_LIMIT = 40; // sanity cap on rendered list length

  var FACETS = [
    { key: 'type', question: 'What type of training are you looking for?', multi: false },
    { key: 'industryTags', question: 'Which industry or audience fits best?', multi: true },
    { key: 'regBody', question: 'Which regulator or standard does this need to satisfy?', multi: false },
    { key: 'duration', question: 'About how much time do you have?', multi: false }
  ];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function courseHref(course) {
    return course.url ? BASE_URL + course.url : TEL;
  }

  // Every course must land in at least one group for any facet, otherwise a
  // course with no value for the chosen facet would vanish from every
  // option and become unreachable. So a missing/empty value gets its own
  // explicit bucket instead of being dropped.
  function facetValues(course, key) {
    if (key === 'industryTags') {
      var tags = Array.isArray(course.industryTags) ? course.industryTags : [];
      return tags.length ? tags : ['Not industry-specific'];
    }
    var v = course[key];
    return (v === undefined || v === null || v === '') ? ['Not specified'] : [v];
  }

  // Given the current candidate set, find the facet + value groups that
  // split it best (smallest worst-case remaining group), skipping facets
  // already answered or that don't actually divide the set.
  function bestFacetSplit(candidates, usedFacets) {
    var best = null;
    FACETS.forEach(function (facet) {
      if (usedFacets[facet.key]) return;
      var groups = {};
      candidates.forEach(function (course) {
        facetValues(course, facet.key).forEach(function (val) {
          (groups[val] = groups[val] || []).push(course);
        });
      });
      var keys = Object.keys(groups);
      if (keys.length < 2) return;
      var maxGroupSize = 0;
      keys.forEach(function (k) { if (groups[k].length > maxGroupSize) maxGroupSize = groups[k].length; });
      if (maxGroupSize >= candidates.length) return; // didn't actually narrow anything
      if (!best || maxGroupSize < best.maxGroupSize) {
        best = { facet: facet, groups: groups, keys: keys, maxGroupSize: maxGroupSize };
      }
    });
    return best;
  }

  function CourseFinder(root) {
    this.root = root;
    this.catalog = window.HOC_MASTER_CATALOG;
    this.trail = []; // breadcrumb labels for display
    this.history = []; // stack of snapshots for Back
    this.candidates = this.catalog.courses;
    this.usedFacets = {};
    this.showCategoryStep();
  }

  CourseFinder.prototype.snapshot = function () {
    return {
      candidates: this.candidates,
      usedFacets: Object.assign({}, this.usedFacets),
      trail: this.trail.slice(),
      phase: this.phase
    };
  };

  CourseFinder.prototype.pushHistory = function () {
    this.history.push(this.snapshot());
  };

  CourseFinder.prototype.back = function () {
    if (!this.history.length) return;
    var snap = this.history.pop();
    this.candidates = snap.candidates;
    this.usedFacets = snap.usedFacets;
    this.trail = snap.trail;
    if (snap.phase === 'category') this.showCategoryStep();
    else this.step();
  };

  CourseFinder.prototype.reset = function () {
    this.trail = [];
    this.history = [];
    this.candidates = this.catalog.courses;
    this.usedFacets = {};
    this.showCategoryStep();
  };

  CourseFinder.prototype.step = function () {
    if (this.candidates.length === 1) {
      this.showResult(this.candidates[0]);
      return;
    }
    var split = bestFacetSplit(this.candidates, this.usedFacets);
    if (!split) {
      this.showNameStep();
      return;
    }
    this.phase = 'facet';
    this.renderFacetStep(split);
  };

  // ---------- Chrome shared by every step ----------

  CourseFinder.prototype.renderShell = function (questionText, subText) {
    var wrap = el('div', 'qf-card');

    var step = this.history.length + 1;
    var meta = el('div', 'qf-meta');
    meta.appendChild(el('span', 'qf-step-label', 'Question ' + step));
    var track = el('div', 'qf-progress-track');
    var bar = el('div', 'qf-progress-bar');
    bar.style.width = Math.min(100, Math.round((step / 7) * 100)) + '%';
    track.appendChild(bar);
    meta.appendChild(track);
    wrap.appendChild(meta);

    if (this.trail.length) {
      var crumbs = el('div', 'qf-crumbs');
      this.trail.forEach(function (c) { crumbs.appendChild(el('span', 'qf-crumb', c)); });
      wrap.appendChild(crumbs);
    }

    wrap.appendChild(el('h3', 'qf-question', questionText));
    if (subText) wrap.appendChild(el('p', 'qf-sub', subText));

    return wrap;
  };

  CourseFinder.prototype.attachFooter = function (wrap) {
    var self = this;
    if (this.history.length) {
      var backBtn = el('button', 'qf-back', '← Back');
      backBtn.type = 'button';
      backBtn.addEventListener('click', function () { self.back(); });
      wrap.appendChild(backBtn);
    }
    this.root.innerHTML = '';
    this.root.appendChild(wrap);
  };

  // ---------- Step 1: Category ----------

  CourseFinder.prototype.showCategoryStep = function () {
    this.phase = 'category';
    var self = this;
    var categories = this.catalog.categories.slice().sort();
    var counts = {};
    this.catalog.courses.forEach(function (c) { counts[c.category] = (counts[c.category] || 0) + 1; });

    var wrap = this.renderShell('What kind of training are you looking for?', 'Search or browse ' + categories.length + ' categories covering the full course catalog.');

    var search = el('input', 'qf-search');
    search.type = 'search';
    search.placeholder = 'Search categories… (e.g. confined space, forklift, fall protection)';
    search.autocomplete = 'off';
    wrap.appendChild(search);

    var list = el('div', 'qf-list');
    wrap.appendChild(list);

    function renderList(filterText) {
      list.innerHTML = '';
      var q = filterText.trim().toLowerCase();
      var matches = categories.filter(function (name) { return name.toLowerCase().indexOf(q) !== -1; });
      if (!matches.length) {
        list.appendChild(el('div', 'qf-empty', 'No categories match “' + filterText + '”.'));
        return;
      }
      matches.forEach(function (name) {
        var btn = el('button', 'qf-option qf-option-row');
        btn.type = 'button';
        btn.appendChild(el('span', 'qf-option-label', name));
        btn.appendChild(el('span', 'qf-option-count', counts[name] + (counts[name] === 1 ? ' course' : ' courses')));
        btn.addEventListener('click', function () { self.chooseCategory(name); });
        list.appendChild(btn);
      });
    }

    search.addEventListener('input', function () { renderList(search.value); });
    renderList('');

    this.attachFooter(wrap);
  };

  CourseFinder.prototype.chooseCategory = function (categoryName) {
    this.pushHistory();
    this.candidates = this.catalog.courses.filter(function (c) { return c.category === categoryName; });
    this.trail.push(categoryName);
    this.step();
  };

  // ---------- Step 2+: adaptive facet questions ----------

  var FACET_LABELS = {
    industryTags: function (v) { return v; },
    type: function (v) { return v; },
    regBody: function (v) { return v; },
    duration: function (v) { return v; }
  };

  CourseFinder.prototype.renderFacetStep = function (split) {
    var self = this;
    var facet = split.facet;
    var wrap = this.renderShell(facet.question);

    var options = el('div', 'qf-options');
    var sortedKeys = split.keys.slice().sort(function (a, b) { return split.groups[b].length - split.groups[a].length; });
    sortedKeys.forEach(function (key) {
      var group = split.groups[key];
      var btn = el('button', 'qf-option');
      btn.type = 'button';
      btn.appendChild(el('span', 'qf-option-label', FACET_LABELS[facet.key](key)));
      btn.appendChild(el('span', 'qf-option-hint', group.length + (group.length === 1 ? ' match' : ' matches')));
      btn.addEventListener('click', function () { self.chooseFacetValue(facet.key, key, group); });
      options.appendChild(btn);
    });
    wrap.appendChild(options);

    this.attachFooter(wrap);
  };

  CourseFinder.prototype.chooseFacetValue = function (facetKey, value, group) {
    this.pushHistory();
    this.usedFacets[facetKey] = true;
    this.candidates = group;
    this.trail.push(value);
    this.step();
  };

  // ---------- Final step: search/pick by name ----------

  CourseFinder.prototype.showNameStep = function () {
    this.phase = 'name';
    var self = this;
    var wrap = this.renderShell('Which of these is it?', this.candidates.length + ' course' + (this.candidates.length === 1 ? '' : 's') + ' left — search by name or pick one below.');

    var search = el('input', 'qf-search');
    search.type = 'search';
    search.placeholder = 'Search by course name…';
    search.autocomplete = 'off';
    wrap.appendChild(search);

    var list = el('div', 'qf-list');
    wrap.appendChild(list);

    function renderList(filterText) {
      list.innerHTML = '';
      var q = filterText.trim().toLowerCase();
      var matches = self.candidates.filter(function (c) { return c.name.toLowerCase().indexOf(q) !== -1; });
      if (!matches.length) {
        list.appendChild(el('div', 'qf-empty', 'No courses match “' + filterText + '”.'));
        return;
      }
      matches.slice(0, NAME_LIST_LIMIT).forEach(function (course) {
        var btn = el('button', 'qf-option qf-option-row');
        btn.type = 'button';
        btn.appendChild(el('span', 'qf-option-label', course.name));
        btn.appendChild(el('span', 'qf-option-count', course.duration));
        btn.addEventListener('click', function () { self.showResult(course); });
        list.appendChild(btn);
      });
      if (matches.length > NAME_LIST_LIMIT) {
        list.appendChild(el('div', 'qf-empty', '+' + (matches.length - NAME_LIST_LIMIT) + ' more — keep typing to narrow it down.'));
      }
    }

    search.addEventListener('input', function () { renderList(search.value); });
    renderList('');

    this.attachFooter(wrap);
  };

  // ---------- Result ----------

  CourseFinder.prototype.showResult = function (course) {
    var wrap = el('div', 'qf-card qf-result');

    wrap.appendChild(el('span', 'qf-result-tag', 'Your Match'));
    wrap.appendChild(el('h3', 'qf-result-title', course.name));

    var facts = el('ul', 'qf-result-facts');
    var f1 = el('li'); f1.innerHTML = '<strong>' + course.duration + '</strong>Duration';
    var f2 = el('li'); f2.innerHTML = '<strong>' + course.regBody + '</strong>Regulator';
    var f3 = el('li'); f3.innerHTML = '<strong>' + course.citation + '</strong>Citation';
    facts.appendChild(f1); facts.appendChild(f2); facts.appendChild(f3);
    wrap.appendChild(facts);

    var actions = el('div', 'qf-result-actions');
    var cta = el('a', 'btn btn-primary');
    cta.href = courseHref(course);
    if (course.url) { cta.target = '_blank'; cta.rel = 'noopener'; cta.textContent = 'View This Course'; }
    else { cta.textContent = 'Call to Enroll: ' + TEL_LABEL; }
    actions.appendChild(cta);

    var browseAll = el('a', 'btn btn-outline', 'Browse the Full Catalog');
    browseAll.href = 'courses/';
    actions.appendChild(browseAll);
    wrap.appendChild(actions);

    var self = this;
    var startOver = el('button', 'qf-reset', 'Start over');
    startOver.type = 'button';
    startOver.addEventListener('click', function () { self.reset(); });
    wrap.appendChild(startOver);

    this.root.innerHTML = '';
    this.root.appendChild(wrap);
    wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('courseFinder');
    if (root && window.HOC_MASTER_CATALOG) new CourseFinder(root);
  });

})();
