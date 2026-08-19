/* Course Finder: question-by-question wizard that narrows the full
   HAZWOPER OSHA Training catalog (1,000+ courses) down to exactly one
   course. Reads live from window.HOC_MASTER_CATALOG (js/catalog-data.js).

   Every step is a plain multiple-choice question, answered by clicking
   one of the listed options; there's no "search for your category" step.
   The course type, regulatory body, and length questions are always
   asked first (in that order, and they narrow hard: everything after the
   first question is almost always a short, clean list), then the engine
   adds an industry or training-type question if one is still needed to
   narrow further. Once no question can narrow the remaining courses any
   more, the visitor picks the exact course by name from a short,
   searchable list of what's left. */
(function () {

  var TEL = 'tel:18664296742';
  var TEL_LABEL = '1-866-429-6742';
  var BASE_URL = 'https://hazwoper-osha.com/';
  var NAME_LIST_LIMIT = 40; // sanity cap on rendered list length

  // Asked in this order, every time, as long as each one still narrows the
  // remaining courses.
  var FIXED_ORDER = ['category', 'regBody', 'duration'];
  // Asked afterward, only if still needed: whichever narrows best first.
  var ADAPTIVE_ORDER = ['industryTags', 'type'];

  var FACETS = {
    category: { question: 'What type of course are you looking for?', multi: false },
    regBody: { question: 'Which regulatory body does this need to satisfy?', multi: true },
    duration: { question: 'How long should the training be?', multi: false },
    industryTags: { question: 'Which industry or audience fits best?', multi: true },
    type: { question: 'What type of training is this?', multi: false }
  };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function courseHref(course) {
    return course.url ? BASE_URL + course.url : TEL;
  }

  // "OSHA/EPA", "DOT/FMCSA", etc. mean a course spans multiple regulatory
  // bodies, not that its regBody string is one opaque value - split those on
  // "/" into separate tokens so a course tagged "OSHA/EPA" shows up under
  // both OSHA and EPA. Two things need protecting from that split:
  // - "N/A (Voluntary/...)" - the slash there is inside a parenthetical
  //   description, not a body separator, so N/A values are never split.
  // - "Cal/OSHA" - a single regulator name that happens to contain a slash
  //   (distinct from federal OSHA), protected before the generic split and
  //   restored after.
  function parseRegBodies(raw) {
    if (!raw) return ['Not specified'];
    var s = raw.trim();
    if (/^N\/A\b/.test(s)) return [s];
    var protectedStr = s.replace(/Cal\/OSHA/g, 'Cal⁄OSHA');
    var parenIdx = protectedStr.indexOf('(');
    if (parenIdx !== -1 && protectedStr.slice(0, parenIdx).indexOf('/') === -1) return [s];
    if (protectedStr.indexOf('/') === -1) return [s];
    return protectedStr.split('/').map(function (p) { return p.trim().replace(/Cal⁄OSHA/g, 'Cal/OSHA'); }).filter(Boolean);
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
    if (key === 'regBody') return parseRegBodies(course.regBody);
    var v = course[key];
    return (v === undefined || v === null || v === '') ? ['Not specified'] : [v];
  }

  function countDistinctValues(candidates, key) {
    var seen = {};
    var n = 0;
    candidates.forEach(function (course) {
      facetValues(course, key).forEach(function (v) { if (!seen[v]) { seen[v] = true; n++; } });
    });
    return n;
  }

  // A course "satisfies the selection, or satisfies more": it matches as
  // long as every selected value is among its own facet values, regardless
  // of whether it also carries additional values beyond the selection.
  function courseHasAllValues(course, key, selected) {
    var values = facetValues(course, key);
    for (var i = 0; i < selected.length; i++) {
      if (values.indexOf(selected[i]) === -1) return false;
    }
    return true;
  }

  // Groups the candidates by a facet's values. Returns null if the facet
  // doesn't actually narrow this candidate set (only one group, or every
  // course shares the same value).
  function splitBy(candidates, key) {
    var groups = {};
    candidates.forEach(function (course) {
      facetValues(course, key).forEach(function (val) {
        (groups[val] = groups[val] || []).push(course);
      });
    });
    var keys = Object.keys(groups);
    if (keys.length < 2) return null;
    var maxGroupSize = 0;
    keys.forEach(function (k) { if (groups[k].length > maxGroupSize) maxGroupSize = groups[k].length; });
    if (maxGroupSize >= candidates.length) return null;
    return { key: key, groups: groups, keys: keys, maxGroupSize: maxGroupSize };
  }

  function bestAdaptiveSplit(candidates, usedFacets) {
    var best = null;
    ADAPTIVE_ORDER.forEach(function (key) {
      if (usedFacets[key]) return;
      var split = splitBy(candidates, key);
      if (!split) return;
      if (!best || split.maxGroupSize < best.maxGroupSize) best = split;
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
    this.fixedIndex = 0;
    this.step();
  }

  CourseFinder.prototype.snapshot = function () {
    return {
      candidates: this.candidates,
      usedFacets: Object.assign({}, this.usedFacets),
      trail: this.trail.slice(),
      fixedIndex: this.fixedIndex
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
    this.fixedIndex = snap.fixedIndex;
    this.step();
  };

  CourseFinder.prototype.reset = function () {
    this.trail = [];
    this.history = [];
    this.candidates = this.catalog.courses;
    this.usedFacets = {};
    this.fixedIndex = 0;
    this.step();
  };

  CourseFinder.prototype.step = function () {
    if (this.candidates.length === 1) {
      this.showResult(this.candidates[0]);
      return;
    }

    while (this.fixedIndex < FIXED_ORDER.length) {
      var key = FIXED_ORDER[this.fixedIndex];
      this.fixedIndex++;

      if (FACETS[key].multi) {
        // Multi-select facets narrow via a live match count instead of a
        // hard split into buckets - only show the step if there's more than
        // one distinct value left to choose between.
        if (countDistinctValues(this.candidates, key) > 1) {
          this.renderMultiFacetStep(key);
          return;
        }
        continue;
      }

      var split = splitBy(this.candidates, key);
      if (split) {
        this.renderFacetStep(split);
        return;
      }
      // This facet doesn't discriminate the current candidates (e.g. every
      // remaining course has the same duration) - skip it silently and try
      // the next one in the fixed order.
    }

    var adaptive = bestAdaptiveSplit(this.candidates, this.usedFacets);
    if (adaptive) {
      this.renderFacetStep(adaptive);
      return;
    }

    this.showNameStep();
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

  // ---------- Multiple-choice facet questions ----------

  CourseFinder.prototype.renderFacetStep = function (split) {
    var self = this;
    var facet = FACETS[split.key];
    var isBrowseList = split.keys.length > 15; // long lists read better A-Z than by popularity
    var subText = isBrowseList ? 'Scroll to see all ' + split.keys.length + ' options, or pick the closest match.' : null;
    var wrap = this.renderShell(facet.question, subText);

    var options = el('div', 'qf-options');
    var sortedKeys = isBrowseList
      ? split.keys.slice().sort()
      : split.keys.slice().sort(function (a, b) { return split.groups[b].length - split.groups[a].length; });
    sortedKeys.forEach(function (value) {
      var group = split.groups[value];
      var btn = el('button', 'qf-option');
      btn.type = 'button';
      btn.appendChild(el('span', 'qf-option-label', value));
      btn.appendChild(el('span', 'qf-option-hint', group.length + (group.length === 1 ? ' match' : ' matches')));
      btn.addEventListener('click', function () { self.chooseFacetValue(split.key, value, group); });
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

  // ---------- Multi-select facet questions (e.g. regulatory body) ----------
  // Rendered as toggleable chips instead of a pick-one list: a course
  // matches once it carries every currently-checked value, whether or not
  // it also carries others beyond that (so checking "OSHA" alone still
  // surfaces a course tagged "OSHA/EPA" - it satisfies OSHA and more).
  // A live count above the chips shows how many courses match the current
  // combination, including zero, so an unsatisfiable combination is obvious
  // before the visitor tries to continue.

  CourseFinder.prototype.renderMultiFacetStep = function (key) {
    var self = this;
    var facet = FACETS[key];
    var candidates = this.candidates;
    var selected = [];

    var valueCounts = {};
    candidates.forEach(function (course) {
      facetValues(course, key).forEach(function (v) { valueCounts[v] = (valueCounts[v] || 0) + 1; });
    });
    var allValues = Object.keys(valueCounts).sort(function (a, b) { return valueCounts[b] - valueCounts[a]; });

    var wrap = this.renderShell(facet.question, 'Check one or more. Courses that cover your selection, or cover more than your selection, will match.');

    var countBanner = el('div', 'qf-multi-count');
    wrap.appendChild(countBanner);

    var filterInput = el('input', 'qf-search');
    filterInput.type = 'search';
    filterInput.placeholder = 'Filter the list (e.g. “OSHA”, “EPA”)…';
    filterInput.autocomplete = 'off';
    wrap.appendChild(filterInput);

    var options = el('div', 'qf-multi-options');
    wrap.appendChild(options);

    var footer = el('div', 'qf-multi-footer');
    var continueBtn = el('button', 'btn btn-primary btn-block');
    continueBtn.type = 'button';
    footer.appendChild(continueBtn);
    wrap.appendChild(footer);

    function matchCount() {
      if (!selected.length) return candidates.length;
      return candidates.filter(function (c) { return courseHasAllValues(c, key, selected); }).length;
    }

    function updateCount() {
      var n = matchCount();
      if (!selected.length) {
        countBanner.className = 'qf-multi-count';
        countBanner.textContent = candidates.length + ' course' + (candidates.length === 1 ? '' : 's') + ' available. Select one or more to narrow it down.';
        continueBtn.disabled = true;
        continueBtn.textContent = 'Select at least one';
      } else if (n === 0) {
        countBanner.className = 'qf-multi-count qf-multi-count-empty';
        countBanner.textContent = '0 courses match ' + selected.join(' + ') + '. That combination isn’t available, try removing a selection.';
        continueBtn.disabled = true;
        continueBtn.textContent = 'No matching courses';
      } else {
        countBanner.className = 'qf-multi-count qf-multi-count-active';
        countBanner.textContent = n + ' course' + (n === 1 ? '' : 's') + ' match ' + selected.join(' + ') + '.';
        continueBtn.disabled = false;
        continueBtn.textContent = 'See ' + n + ' matching course' + (n === 1 ? '' : 's') + ' →';
      }
    }

    function renderChips(filterText) {
      options.innerHTML = '';
      var q = filterText.trim().toLowerCase();
      var visible = q ? allValues.filter(function (v) { return v.toLowerCase().indexOf(q) !== -1; }) : allValues;
      if (!visible.length) {
        options.appendChild(el('div', 'qf-empty', 'No options match “' + filterText + '”.'));
        return;
      }
      visible.forEach(function (value) {
        var chip = el('button', 'qf-multi-option' + (selected.indexOf(value) !== -1 ? ' is-selected' : ''));
        chip.type = 'button';
        chip.setAttribute('aria-pressed', selected.indexOf(value) !== -1 ? 'true' : 'false');
        chip.appendChild(el('span', 'qf-multi-option-check'));
        chip.appendChild(el('span', 'qf-multi-option-label', value));
        chip.appendChild(el('span', 'qf-multi-option-hint', valueCounts[value] + (valueCounts[value] === 1 ? ' course' : ' courses')));
        chip.addEventListener('click', function () {
          var idx = selected.indexOf(value);
          if (idx === -1) selected.push(value); else selected.splice(idx, 1);
          chip.classList.toggle('is-selected');
          chip.setAttribute('aria-pressed', selected.indexOf(value) !== -1 ? 'true' : 'false');
          updateCount();
        });
        options.appendChild(chip);
      });
    }

    filterInput.addEventListener('input', function () { renderChips(filterInput.value); });

    continueBtn.addEventListener('click', function () {
      var matches = candidates.filter(function (c) { return courseHasAllValues(c, key, selected); });
      if (!selected.length || !matches.length) return;
      self.pushHistory();
      self.usedFacets[key] = true;
      self.candidates = matches;
      self.trail.push(selected.join(' + '));
      self.step();
    });

    renderChips('');
    updateCount();
    this.attachFooter(wrap);
  };

  // ---------- Final step: search/pick by name ----------

  CourseFinder.prototype.showNameStep = function () {
    var self = this;
    var wrap = this.renderShell('Which of these is it?', this.candidates.length + ' course' + (this.candidates.length === 1 ? '' : 's') + ' left. Search by name or pick one below.');

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
        list.appendChild(el('div', 'qf-empty', '+' + (matches.length - NAME_LIST_LIMIT) + ' more. Keep typing to narrow it down.'));
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
