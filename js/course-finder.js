/* Course Finder — question-by-question wizard that narrows down to exactly one
   course from the HAZWOPER / RCRA hazardous-waste portion of the catalog. */
(function () {

  var TEL = 'tel:18664296742';
  var TEL_LABEL = '1-866-429-6742';
  var BASE_URL = 'https://hazwoper-osha.com/';

  // Course facts for every possible result. Kept separate from the full
  // 1,000+ course catalog-data.js so the homepage doesn't have to load it.
  var COURSES = {
    574: { name: '8-Hour HAZWOPER and Incident Command Refresher Training', citation: '29 CFR 1910.120(q)(8)', duration: '8 Hours', regBody: 'OSHA', url: null },
    575: { name: 'Cal/OSHA 24-Hour HAZWOPER TSDF RCRA Training', citation: '8 CCR 5192(p) / RCRA', duration: '24 Hours', regBody: 'Cal/OSHA / EPA', url: null },
    576: { name: 'Cal/OSHA 24-Hour HAZWOPER Training', citation: '8 CCR 5192(e)', duration: '24 Hours', regBody: 'Cal/OSHA', url: 'online-courses/cal-osha-24-hour-hazwoper-training' },
    577: { name: 'Cal/OSHA 40-Hour HAZWOPER Training', citation: '8 CCR 5192(e)', duration: '40 Hours', regBody: 'Cal/OSHA', url: null },
    578: { name: 'Cal/OSHA 8-Hour HAZWOPER Refresher Training', citation: '8 CCR 5192(e)(8)', duration: '8 Hours', regBody: 'Cal/OSHA', url: 'online-courses/cal-osha-8-hour-hazwoper-refresher-training' },
    579: { name: 'Cal/OSHA 8-Hour HAZWOPER TSDF RCRA Refresher Training', citation: '8 CCR 5192(p)(8) / RCRA', duration: '8 Hours', regBody: 'Cal/OSHA / EPA', url: null },
    580: { name: 'Hazardous Waste Manifest Training', citation: '40 CFR 262 Subpart B (RCRA)', duration: '2 Hours', regBody: 'EPA', url: 'online-courses/hazardous-waste-manifest-training' },
    581: { name: 'OSHA 24-Hour HAZWOPER Training', citation: '29 CFR 1910.120(e)', duration: '24 Hours', regBody: 'OSHA', url: 'online-courses/osha-24-hour-hazwoper-online' },
    582: { name: 'OSHA 24-Hour HAZWOPER — RCRA TSD Operations Training', citation: '29 CFR 1910.120(p) / RCRA', duration: '24 Hours', regBody: 'OSHA / EPA', url: 'online-courses/24-hour-hazwoper-tsd-operations-p' },
    583: { name: 'HAZWOPER Micro-Module: Air Monitoring & Direct-Reading Instruments', citation: '29 CFR 1910.120(e) / 1926.65(e)', duration: '20 Min', regBody: 'OSHA', url: null },
    584: { name: 'HAZWOPER Micro-Module: Decontamination Procedures', citation: '29 CFR 1910.120(e) / 1926.65(e)', duration: '20 Min', regBody: 'OSHA', url: null },
    585: { name: 'HAZWOPER Micro-Module: PPE Levels A, B, C & D Explained', citation: '29 CFR 1910.120(e) / 1926.65(e)', duration: '15 Min', regBody: 'OSHA', url: null },
    586: { name: 'HAZWOPER Micro-Module: Site Characterization & Hazard Assessment', citation: '29 CFR 1910.120(e) / 1926.65(e)', duration: '20 Min', regBody: 'OSHA', url: null },
    587: { name: 'OSHA 40-Hour HAZWOPER Training', citation: '29 CFR 1910.120(e) / 1926.65(e)', duration: '40 Hours', regBody: 'OSHA', url: 'online-courses/osha-40-hour-hazwoper-online' },
    588: { name: 'OSHA 40-Hour HAZWOPER for Construction (Contaminated Sites)', citation: '29 CFR 1910.120(e) / 1926.65(e)', duration: '40 Hours', regBody: 'OSHA', url: null },
    589: { name: 'OSHA 40-Hour HAZWOPER for Emergency Response / Fire-Hazmat Teams', citation: '29 CFR 1910.120(e) / 1926.65(e)', duration: '40 Hours', regBody: 'OSHA', url: null },
    590: { name: 'OSHA 40-Hour HAZWOPER for Environmental Remediation', citation: '29 CFR 1910.120(e) / 1926.65(e)', duration: '40 Hours', regBody: 'OSHA', url: null },
    591: { name: 'OSHA 40-Hour HAZWOPER for Oil & Gas Spill Response', citation: '29 CFR 1910.120(e) / 1926.65(e)', duration: '40 Hours', regBody: 'OSHA', url: null },
    592: { name: 'OSHA 40-Hour HAZWOPER for Utility/Pipeline Emergency Response', citation: '29 CFR 1910.120(e) / 1926.65(e)', duration: '40 Hours', regBody: 'OSHA', url: null },
    593: { name: 'OSHA 8-Hour HAZWOPER (q) Incident Command Training', citation: '29 CFR 1910.120(q)', duration: '8 Hours', regBody: 'OSHA', url: 'online-courses/8-hour-hazwoper-incident-command-training' },
    594: { name: 'OSHA 8-Hour HAZWOPER Annual Refresher — RCRA TSD Operations Training', citation: '29 CFR 1910.120(p)(8) / RCRA', duration: '8 Hours', regBody: 'OSHA / EPA', url: 'online-courses/8-hour-hazwoper-tsd-operations-p' },
    595: { name: 'OSHA 8-Hour HAZWOPER Refresher Training', citation: '29 CFR 1910.120(e)(8)', duration: '8 Hours', regBody: 'OSHA', url: 'online-courses/osha-8-hour-hazwoper-refresher-online' },
    596: { name: 'OSHA 8-Hour HAZWOPER Supervisor Refresher Training', citation: '29 CFR 1910.120(e)(4)/(e)(8)', duration: '8 Hours', regBody: 'OSHA', url: 'online-courses/osha-8-hour-hazwoper-supervisor-training-refresher' },
    597: { name: 'OSHA 8-Hour HAZWOPER Supervisor Training', citation: '29 CFR 1910.120(e)(4)', duration: '8 Hours', regBody: 'OSHA', url: 'online-courses/osha-8-hour-hazwoper-supervisor-online-training' },
    598: { name: 'OSHA 8-Hour HAZWOPER and Safe Ammonia Handling Refresher Training', citation: '29 CFR 1910.120(e)(8) / 1910.111', duration: '8 Hours', regBody: 'OSHA', url: 'online-courses/osha-8-hour-hazwoper-and-safe-ammonia-handling-refresher-training' },
    599: { name: 'OSHA HAZWOPER and RCRA Hazardous Waste Management Technician Safety Training', citation: '29 CFR 1910.120 / RCRA', duration: '24 Hours', regBody: 'OSHA / EPA', url: 'online-courses/osha-hazwoper-and-rcra-hazardous-waste-management-technician-safety-training' },
    600: { name: 'RCRA Hazardous Waste Generator Refresher Training', citation: '40 CFR 262.17 (RCRA, annual)', duration: '4 Hours', regBody: 'EPA', url: 'online-courses/rcra-hazardous-waste-generator-refresher-training' },
    601: { name: 'RCRA Hazardous Waste Generator Training', citation: '40 CFR 262.17 (RCRA)', duration: '8 Hours', regBody: 'EPA', url: 'online-courses/rcra-hazwoper-waste-generator' },
    602: { name: 'RCRA Universal Waste Handler Training', citation: '40 CFR 273 (RCRA)', duration: '2 Hours', regBody: 'EPA', url: null },
    1016: { name: 'HAZWOPER Train-the-Trainer Certification', citation: '29 CFR 1910.120(e)', duration: '24 Hours', regBody: 'OSHA', url: null }
  };

  // Decision tree. Every node is a question; every option either points to
  // another node (`next`), resolves straight to a course (`course`), or
  // resolves to different courses depending on an earlier answer
  // (`courseBy` + `courseMap`, keyed on that earlier answer's value).
  var NODES = {

    start: {
      question: 'What are you looking for?',
      var: 'track',
      options: [
        { label: 'HAZWOPER certification training', hint: 'Site cleanup, TSDF operations, emergency response, supervisor, or incident command', value: 'hazwoper', next: 'role' },
        { label: 'RCRA hazardous waste compliance training', hint: 'Generator, manifest, or universal waste handler training — not HAZWOPER', value: 'rcra', next: 'rcraType' },
        { label: 'HAZWOPER Train-the-Trainer certification', hint: 'Become authorized to deliver HAZWOPER training yourself', value: 'trainer', course: 1016 },
        { label: 'A short refresher on one specific HAZWOPER topic', hint: 'Not a full certification course — a focused topic module', value: 'micro', next: 'microTopic' }
      ]
    },

    microTopic: {
      question: 'Which topic do you need?',
      var: 'microTopic',
      options: [
        { label: 'Air monitoring & direct-reading instruments', value: 'air', course: 583 },
        { label: 'Decontamination procedures', value: 'decon', course: 584 },
        { label: 'PPE Levels A, B, C & D', value: 'ppe', course: 585 },
        { label: 'Site characterization & hazard assessment', value: 'site', course: 586 }
      ]
    },

    rcraType: {
      question: 'Which RCRA training do you need?',
      var: 'rcraType',
      options: [
        { label: 'Hazardous waste generator training', hint: 'First time', value: 'gen_new', course: 601 },
        { label: 'Hazardous waste generator refresher', hint: 'Annual, already trained', value: 'gen_refresher', course: 600 },
        { label: 'Hazardous waste manifest training', value: 'manifest', course: 580 },
        { label: 'Universal waste handler training', value: 'universal', course: 602 }
      ]
    },

    role: {
      question: 'Which best describes your role or site?',
      var: 'role',
      options: [
        { label: 'General hazardous waste site worker', hint: 'Cleanup or remediation', value: 'general', next: 'generalState' },
        { label: 'Treatment, Storage, or Disposal Facility (TSDF) operations', value: 'tsdf', next: 'tsdfState' },
        { label: 'Combined RCRA + HAZWOPER hazardous waste management technician', value: 'technician', course: 599 },
        { label: 'Supervisor overseeing HAZWOPER operations', value: 'supervisor', next: 'supervisorStatus' },
        { label: 'Incident Commander', hint: 'Directs the emergency response', value: 'ic', next: 'icStatus' },
        { label: 'Ammonia handling / refrigeration site worker', value: 'ammonia', course: 598 }
      ]
    },

    generalState: {
      question: 'What state will the training take place in?',
      sub: 'California (Cal/OSHA) runs its own HAZWOPER standard; every other state follows the federal OSHA rule.',
      var: 'state',
      options: [
        { label: 'California', value: 'CA', next: 'generalStatus' },
        { label: 'Any other state', value: 'OTHER', next: 'generalStatus' }
      ]
    },

    generalStatus: {
      question: 'Is this your first HAZWOPER training, or an annual refresher for certification you already hold?',
      var: 'status',
      options: [
        { label: 'First-time / initial certification', value: 'initial', next: 'exposure' },
        { label: 'Annual refresher', value: 'refresher', courseBy: 'state', courseMap: { CA: 578, OTHER: 595 } }
      ]
    },

    exposure: {
      question: 'Will you have regular, extensive hazardous-substance exposure and eventually work unsupervised, or only occasional/limited exposure for a specific task?',
      var: 'exposure',
      options: [
        { label: 'Regular / extensive exposure', hint: 'Full site worker, works toward unsupervised status', value: 'extensive', next: 'extensiveRoute' },
        { label: 'Occasional / limited exposure', hint: 'On site occasionally for a specific task', value: 'occasional', courseBy: 'state', courseMap: { CA: 576, OTHER: 581 } }
      ]
    },

    extensiveRoute: {
      // Not shown to the user — resolves silently based on state.
      silent: true,
      var: 'state',
      route: { CA: { course: 577 }, OTHER: { next: 'industry' } }
    },

    industry: {
      question: 'Which best matches the work you’ll be doing?',
      var: 'industry',
      options: [
        { label: 'General / all-purpose hazardous waste cleanup', value: 'general', course: 587 },
        { label: 'Construction on contaminated sites', value: 'construction', course: 588 },
        { label: 'Emergency response / fire-hazmat team', value: 'emergency', course: 589 },
        { label: 'Environmental remediation', value: 'environmental', course: 590 },
        { label: 'Oil & gas spill response', value: 'oilgas', course: 591 },
        { label: 'Utility / pipeline emergency response', value: 'utility', course: 592 }
      ]
    },

    tsdfState: {
      question: 'What state is the facility in?',
      var: 'state',
      options: [
        { label: 'California', value: 'CA', next: 'tsdfStatus' },
        { label: 'Any other state', value: 'OTHER', next: 'tsdfStatus' }
      ]
    },

    tsdfStatus: {
      question: 'Is this initial TSDF training, or an annual refresher?',
      var: 'status',
      options: [
        { label: 'Initial TSDF training', value: 'initial', courseBy: 'state', courseMap: { CA: 575, OTHER: 582 } },
        { label: 'Annual TSDF refresher', value: 'refresher', courseBy: 'state', courseMap: { CA: 579, OTHER: 594 } }
      ]
    },

    supervisorStatus: {
      question: 'Is this your first supervisor training, or an annual refresher?',
      var: 'status',
      options: [
        { label: 'First-time supervisor training', value: 'initial', course: 597 },
        { label: 'Annual supervisor refresher', value: 'refresher', course: 596 }
      ]
    },

    icStatus: {
      question: 'Is this your first Incident Command training, or an annual refresher?',
      var: 'status',
      options: [
        { label: 'First-time Incident Command training', value: 'initial', course: 593 },
        { label: 'Annual refresher', value: 'refresher', course: 574 }
      ]
    }

  };

  var MAX_STEPS = 6;

  function courseHref(course) {
    return course.url ? BASE_URL + course.url : TEL;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function CourseFinder(root) {
    this.root = root;
    this.answers = {};
    this.history = []; // stack of { nodeKey }
    this.currentKey = 'start';
    this.resolve('start');
  }

  CourseFinder.prototype.resolve = function (nodeKey) {
    var node = NODES[nodeKey];
    if (node.silent) {
      var routed = node.route[this.answers[node.var]];
      if (routed.course) {
        this.showResult(routed.course);
      } else {
        this.currentKey = routed.next;
        this.resolve(routed.next);
      }
      return;
    }
    this.currentKey = nodeKey;
    this.render(node);
  };

  CourseFinder.prototype.choose = function (node, option) {
    this.history.push(this.currentKey);
    this.answers[node.var] = option.value;

    if (typeof option.course === 'number') {
      this.showResult(option.course);
    } else if (option.courseBy) {
      this.showResult(option.courseMap[this.answers[option.courseBy]]);
    } else {
      this.resolve(option.next);
    }
  };

  CourseFinder.prototype.back = function () {
    if (!this.history.length) return;
    var prevKey = this.history.pop();
    var node = NODES[this.currentKey];
    if (node && node.var) delete this.answers[node.var];
    this.currentKey = prevKey;
    this.render(NODES[prevKey]);
  };

  CourseFinder.prototype.reset = function () {
    this.answers = {};
    this.history = [];
    this.resolve('start');
  };

  CourseFinder.prototype.render = function (node) {
    var self = this;
    var wrap = el('div', 'qf-card');

    var step = this.history.length + 1;
    var progressPct = Math.min(100, Math.round((step / MAX_STEPS) * 100));
    var meta = el('div', 'qf-meta');
    var stepLabel = el('span', 'qf-step-label', 'Question ' + step);
    meta.appendChild(stepLabel);
    var track = el('div', 'qf-progress-track');
    var bar = el('div', 'qf-progress-bar');
    bar.style.width = progressPct + '%';
    track.appendChild(bar);
    meta.appendChild(track);
    wrap.appendChild(meta);

    wrap.appendChild(el('h3', 'qf-question', node.question));
    if (node.sub) wrap.appendChild(el('p', 'qf-sub', node.sub));

    var optionsWrap = el('div', 'qf-options');
    node.options.forEach(function (opt) {
      var btn = el('button', 'qf-option');
      btn.type = 'button';
      var label = el('span', 'qf-option-label', opt.label);
      btn.appendChild(label);
      if (opt.hint) btn.appendChild(el('span', 'qf-option-hint', opt.hint));
      btn.addEventListener('click', function () { self.choose(node, opt); });
      optionsWrap.appendChild(btn);
    });
    wrap.appendChild(optionsWrap);

    if (this.history.length) {
      var backBtn = el('button', 'qf-back', '← Back');
      backBtn.type = 'button';
      backBtn.addEventListener('click', function () { self.back(); });
      wrap.appendChild(backBtn);
    }

    this.root.innerHTML = '';
    this.root.appendChild(wrap);
  };

  CourseFinder.prototype.showResult = function (courseId) {
    var course = COURSES[courseId];
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
    if (root) new CourseFinder(root);
  });

})();
