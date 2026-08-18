(function () {
  "use strict";

  var CATALOG = window.HOC_MASTER_CATALOG;
  var root = document.getElementById("catalogSearch");
  if (!CATALOG || !root) return;

  var BASE_URL = "https://hazwoper-osha.com/";
  var CONTACT_TEL = "tel:18664296742";

  var VIEW_STORAGE_KEY = "hoc_catalog_view_v1";
  var MODE_STORAGE_KEY = "hoc_catalog_mode_v1";

  var state = {
    view: localStorage.getItem(VIEW_STORAGE_KEY) === "grid" ? "grid" : "list",
    mode: localStorage.getItem(MODE_STORAGE_KEY) === "bundles" ? "bundles" : "courses",
    sort: { courses: "name:asc", bundles: "name:asc" },
  };

  var SORT_OPTIONS = {
    courses: [
      { value: "name:asc", label: "Name (A-Z)" },
      { value: "name:desc", label: "Name (Z-A)" },
      { value: "duration:asc", label: "Duration (Shortest First)" },
      { value: "duration:desc", label: "Duration (Longest First)" },
    ],
    bundles: [
      { value: "name:asc", label: "Name (A-Z)" },
      { value: "name:desc", label: "Name (Z-A)" },
      { value: "courses:asc", label: "# Courses (Low to High)" },
      { value: "courses:desc", label: "# Courses (High to Low)" },
    ],
  };

  var els = {
    search: root.querySelector("#cs-search-input"),
    industry: root.querySelector("#cs-industry-select"),
    category: root.querySelector("#cs-category-select"),
    clear: root.querySelector("#cs-clear-btn"),
    resultCount: root.querySelector("#cs-result-count"),
    resultsBody: root.querySelector("#cs-results-body"),
    resultsWrap: root.querySelector("#cs-results-wrap"),
    resultsTable: root.querySelector("table.cs-results-table"),
    resultsGrid: root.querySelector("#cs-results-grid"),
    emptyState: root.querySelector("#cs-empty-state"),
    tableHead: root.querySelector("#cs-table-head"),
    viewListBtn: root.querySelector("#cs-view-list-btn"),
    viewGridBtn: root.querySelector("#cs-view-grid-btn"),
    sort: root.querySelector("#cs-sort-select"),
    modeCoursesBtn: root.querySelector("#cs-mode-courses-btn"),
    modeBundlesBtn: root.querySelector("#cs-mode-bundles-btn"),
    modalOverlay: root.querySelector("#cs-modal-overlay"),
    modalTitle: root.querySelector("#cs-modal-title"),
    modalBody: root.querySelector("#cs-modal-body"),
    modalClose: root.querySelector("#cs-modal-close"),
  };

  function rebuildSelect(selectEl, values, placeholder) {
    selectEl.innerHTML = "";
    var opt0 = document.createElement("option");
    opt0.value = "";
    opt0.textContent = placeholder;
    selectEl.appendChild(opt0);
    values.forEach(function (v) {
      var opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v;
      selectEl.appendChild(opt);
    });
  }

  function populateSortSelect() {
    els.sort.innerHTML = "";
    SORT_OPTIONS[state.mode].forEach(function (opt) {
      var el = document.createElement("option");
      el.value = opt.value;
      el.textContent = opt.label;
      els.sort.appendChild(el);
    });
    els.sort.value = state.sort[state.mode];
  }

  function findCourseByName(name) {
    return CATALOG.courses.filter(function (c) {
      return c.name === name;
    })[0];
  }

  function fmtNumber(n) {
    if (n === null || n === undefined || n === "" || isNaN(Number(n))) return "-";
    return Number(n).toLocaleString("en-US");
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function highlight(text, query) {
    var safe = escapeHtml(text);
    if (!query) return safe;
    var idx = safe.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return safe;
    return safe.slice(0, idx) + '<mark class="cs-mark">' + safe.slice(idx, idx + query.length) + "</mark>" + safe.slice(idx + query.length);
  }

  function enrollCtaHtml(url, label) {
    if (url) {
      return '<a class="btn btn-primary btn-sm" href="' + BASE_URL + url + '" target="_blank" rel="noopener" onclick="event.stopPropagation()">' + (label || "View &amp; Enroll") + " &rarr;</a>";
    }
    return '<a class="btn btn-outline btn-sm" href="' + CONTACT_TEL + '" onclick="event.stopPropagation()">Call to Enroll &rarr;</a>';
  }

  var catalogTableHeadHtml =
    "<tr><th>Course Name</th><th>Category</th><th>Course Type</th><th>Industries</th><th>Duration</th><th></th></tr>";

  var bundlesTableHeadHtml =
    "<tr><th>Bundle Name</th><th>Type</th><th>Scope</th><th># Courses</th><th></th></tr>";

  function currentFilters() {
    return { q: els.search.value.trim(), category: els.category.value, industry: els.industry.value };
  }

  function filterCatalog(f) {
    var q = f.q.toLowerCase();
    return CATALOG.courses.filter(function (c) {
      if (f.category && c.category !== f.category) return false;
      if (f.industry && c.industryTags.indexOf(f.industry) === -1) return false;
      if (q) {
        var hay = (
          c.name + " " + c.category + " " + c.family + " " + (c.industries || "") + " " +
          (c.regBody || "") + " " + (c.citation || "") + " " + (c.altTags || []).join(" ")
        ).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  function filterBundles(f) {
    var q = f.q.toLowerCase();
    return CATALOG.bundles.filter(function (b) {
      if (f.category && (b.scope || "").toLowerCase().indexOf(f.category.toLowerCase()) === -1) return false;
      if (f.industry && !(b.type === "By Industry" && b.name === f.industry)) return false;
      if (q) {
        var hay = (b.name + " " + (b.scope || "") + " " + b.type).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  function parseDurationToMinutes(text) {
    if (!text) return null;
    var m = text.match(/(\d+(?:\.\d+)?)/);
    if (!m) return null;
    var num = parseFloat(m[1]);
    var lower = text.toLowerCase();
    if (lower.indexOf("min") !== -1) return num;
    if (lower.indexOf("day") !== -1) return num * 24 * 60;
    return num * 60;
  }

  function compareNullable(a, b, dir) {
    var mul = dir === "desc" ? -1 : 1;
    var aNull = a === null || a === undefined || (typeof a === "number" && isNaN(a));
    var bNull = b === null || b === undefined || (typeof b === "number" && isNaN(b));
    if (aNull && bNull) return 0;
    if (aNull) return 1;
    if (bNull) return -1;
    if (a < b) return -1 * mul;
    if (a > b) return 1 * mul;
    return 0;
  }

  function compareName(a, b, dir) {
    return a.localeCompare(b) * (dir === "desc" ? -1 : 1);
  }

  function numOrNull(v) {
    return typeof v === "number" && !isNaN(v) ? v : null;
  }

  function courseComparator(key, dir) {
    return function (a, b) {
      if (key === "duration") return compareNullable(parseDurationToMinutes(a.duration), parseDurationToMinutes(b.duration), dir);
      return compareName(a.name, b.name, dir);
    };
  }

  function bundleComparator(key, dir) {
    return function (a, b) {
      if (key === "courses") return compareNullable(numOrNull(a.totalCourses), numOrNull(b.totalCourses), dir);
      return compareName(a.name, b.name, dir);
    };
  }

  function sortRows(rows, mode) {
    var parts = state.sort[mode].split(":");
    var comparator = mode === "bundles" ? bundleComparator(parts[0], parts[1]) : courseComparator(parts[0], parts[1]);
    return rows.slice().sort(comparator);
  }

  function detailGridHtml(c, extraStatus) {
    return (
      '<div class="cs-detail-grid">' +
      (extraStatus ? '<div><div class="cs-label">Bundle Inclusion</div><div class="cs-value"><span class="cs-pill cs-pill-accent">' + escapeHtml(extraStatus) + "</span></div></div>" : "") +
      '<div><div class="cs-label">Regulatory Body</div><div class="cs-value">' + escapeHtml(c.regBody || "-") + "</div></div>" +
      '<div><div class="cs-label">Citation</div><div class="cs-value">' + escapeHtml(c.citation || "-") + "</div></div>" +
      '<div><div class="cs-label">Course Family</div><div class="cs-value">' + escapeHtml(c.family || "-") + "</div></div>" +
      '<div><div class="cs-label">Primary Industries</div><div class="cs-value">' + escapeHtml(c.industries || "-") + "</div></div>" +
      '<div><div class="cs-label">Industry Bundle Tags</div><div class="cs-value">' +
      (c.industryTags && c.industryTags.length ? c.industryTags.map(function (t) { return '<span class="cs-pill cs-pill-accent" style="margin:2px 4px 2px 0;">' + escapeHtml(t) + "</span>"; }).join("") : "-") +
      "</div></div>" +
      '<div><div class="cs-label">Tags / Alternate Names</div><div class="cs-value">' +
      (c.altTags && c.altTags.length ? c.altTags.map(function (t) { return '<span class="cs-pill" style="margin:2px 4px 2px 0;">' + escapeHtml(t) + "</span>"; }).join("") : "-") +
      "</div></div>" +
      "</div>" +
      '<div style="margin-top:16px;">' + enrollCtaHtml(c.url) + "</div>"
    );
  }

  function bundleStatsHtml(bundle) {
    return (
      '<span class="cs-bundle-type-badge">' + escapeHtml(bundle.type) + "</span>" +
      '<div class="cs-bundle-scope">' + escapeHtml(bundle.scope || "") + "</div>" +
      '<div class="cs-bundle-stats">' +
      '<div class="cs-bundle-stat"><div class="cs-label">Total Courses</div><div class="cs-value">' + fmtNumber(bundle.totalCourses) + "</div></div>" +
      "</div>"
    );
  }

  function buildBundleCourseListEl(bundle) {
    var wrap = document.createElement("div");
    wrap.className = "cs-bundle-course-list";
    var contents = CATALOG.bundleContents[bundle.id] || [];
    contents.forEach(function (c) {
      var isFlat = /Flat/i.test(c.status || "");
      var item = document.createElement("div");
      item.className = "cs-bundle-course-item";
      item.innerHTML =
        '<div class="cs-bundle-course-name">' + escapeHtml(c.name) + "</div>" +
        '<div class="cs-bundle-course-meta">' +
        '<span class="cs-pill">' + escapeHtml(c.category) + "</span>" +
        '<span class="cs-pill ' + (isFlat ? "cs-pill-accent" : "") + '">' + escapeHtml(c.status) + "</span>" +
        "</div>";
      item.addEventListener("click", function (e) {
        e.stopPropagation();
        var full = findCourseByName(c.name);
        if (full) openCourseDetailModal(full, c.status);
      });
      wrap.appendChild(item);
    });
    return wrap;
  }

  function altTagPillsHtml(tags) {
    if (!tags || !tags.length) return "";
    return '<div class="cs-row-tags">' + tags.map(function (t) { return '<span class="cs-pill">' + escapeHtml(t) + "</span>"; }).join("") + "</div>";
  }

  function buildCatalogRow(c, q) {
    var tr = document.createElement("tr");
    tr.innerHTML =
      '<td data-label="Course Name" class="cs-course-name-cell">' + highlight(c.name, q) + altTagPillsHtml(c.altTags) + "</td>" +
      '<td data-label="Category"><span class="cs-pill">' + escapeHtml(c.category) + "</span></td>" +
      '<td data-label="Course Type">' + escapeHtml(c.type) + "</td>" +
      '<td data-label="Industries">' + escapeHtml(c.industries || "-") + "</td>" +
      '<td data-label="Duration">' + escapeHtml(c.duration) + "</td>" +
      '<td data-label="">' + enrollCtaHtml(c.url) + "</td>";

    var detailTr = document.createElement("tr");
    detailTr.className = "cs-detail-row";
    detailTr.hidden = true;
    var td = document.createElement("td");
    td.colSpan = 6;
    td.innerHTML = detailGridHtml(c);
    detailTr.appendChild(td);

    tr.addEventListener("click", function () {
      detailTr.hidden = !detailTr.hidden;
    });

    return [tr, detailTr];
  }

  function buildCatalogCard(c, q) {
    var card = document.createElement("div");
    card.className = "cs-course-card";
    card.innerHTML =
      '<div class="cs-card-top"><div class="cs-card-name">' + highlight(c.name, q) + "</div></div>" +
      '<div class="cs-card-pills"><span class="cs-pill">' + escapeHtml(c.category) + '</span><span class="cs-pill">' + escapeHtml(c.type) + "</span></div>" +
      altTagPillsHtml(c.altTags) +
      (c.industries ? '<div class="cs-card-industries">' + escapeHtml(c.industries) + "</div>" : "") +
      '<div class="cs-card-meta-row"><span>' + escapeHtml(c.duration) + "</span></div>" +
      '<div class="cs-card-cta">' + enrollCtaHtml(c.url) + "</div>";
    card.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      openCourseDetailModal(c);
    });
    return card;
  }

  function buildBundleListRow(b, q) {
    var tr = document.createElement("tr");
    tr.innerHTML =
      '<td data-label="Bundle Name" class="cs-course-name-cell">' + highlight(b.name, q) + "</td>" +
      '<td data-label="Type"><span class="cs-pill">' + escapeHtml(b.type) + "</span></td>" +
      '<td data-label="Scope">' + escapeHtml(b.scope || "-") + "</td>" +
      '<td data-label="# Courses">' + fmtNumber(b.totalCourses) + "</td>" +
      '<td data-label=""><a class="btn btn-outline btn-sm" href="' + CONTACT_TEL + '" onclick="event.stopPropagation()">Ask About This Bundle &rarr;</a></td>';

    var detailTr = document.createElement("tr");
    detailTr.className = "cs-detail-row";
    detailTr.hidden = true;
    var td = document.createElement("td");
    td.colSpan = 5;
    td.innerHTML = bundleStatsHtml(b) + '<div class="cs-modal-section-title">Courses in this bundle</div>';
    td.appendChild(buildBundleCourseListEl(b));
    detailTr.appendChild(td);

    tr.addEventListener("click", function () {
      detailTr.hidden = !detailTr.hidden;
    });

    return [tr, detailTr];
  }

  function buildBundleGridCard(b, q) {
    var card = document.createElement("div");
    card.className = "cs-course-card";
    card.innerHTML =
      '<div class="cs-card-top"><div class="cs-card-name">' + highlight(b.name, q) + "</div></div>" +
      '<div class="cs-card-pills"><span class="cs-pill">' + escapeHtml(b.type) + "</span></div>" +
      '<div class="cs-card-industries">' + fmtNumber(b.totalCourses) + " courses</div>" +
      '<div class="cs-card-cta"><a class="btn btn-outline btn-sm" href="' + CONTACT_TEL + '" onclick="event.stopPropagation()">Ask About This Bundle &rarr;</a></div>';
    card.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      openBundleDetailModal(b);
    });
    return card;
  }

  function openModal(title) {
    els.modalTitle.textContent = title;
    els.modalOverlay.hidden = false;
  }

  function closeModal() {
    els.modalOverlay.hidden = true;
    els.modalBody.innerHTML = "";
  }

  function openCourseDetailModal(c, extraStatus) {
    openModal(c.name);
    els.modalBody.innerHTML =
      '<div class="cs-card-pills" style="margin-bottom:14px;"><span class="cs-pill">' + escapeHtml(c.category) + '</span><span class="cs-pill">' + escapeHtml(c.type) + '</span><span class="cs-pill">' + escapeHtml(c.duration) + "</span></div>" +
      detailGridHtml(c, extraStatus);
  }

  function openBundleDetailModal(b) {
    openModal(b.name);
    els.modalBody.innerHTML = bundleStatsHtml(b) + '<div class="cs-modal-section-title">Courses in this bundle</div>';
    els.modalBody.appendChild(buildBundleCourseListEl(b));
  }

  function setView(view) {
    state.view = view;
    localStorage.setItem(VIEW_STORAGE_KEY, view);
    els.viewListBtn.classList.toggle("is-active", view === "list");
    els.viewGridBtn.classList.toggle("is-active", view === "grid");
    els.viewListBtn.setAttribute("aria-pressed", view === "list");
    els.viewGridBtn.setAttribute("aria-pressed", view === "grid");
    els.resultsTable.hidden = view !== "list";
    els.resultsGrid.hidden = view !== "grid";
  }

  function setMode(mode) {
    state.mode = mode;
    localStorage.setItem(MODE_STORAGE_KEY, mode);
    els.modeCoursesBtn.classList.toggle("is-active", mode === "courses");
    els.modeBundlesBtn.classList.toggle("is-active", mode === "bundles");
    els.modeCoursesBtn.setAttribute("aria-pressed", mode === "courses");
    els.modeBundlesBtn.setAttribute("aria-pressed", mode === "bundles");
    els.search.placeholder = mode === "bundles" ? "Search by bundle name…" : "Search by course name or tag…";
    populateSortSelect();
    render();
  }

  function render() {
    var f = currentFilters();
    var isBundles = state.mode === "bundles";
    var rows, rowBuilder, cardBuilder, noun;
    if (isBundles) {
      rows = filterBundles(f);
      els.tableHead.innerHTML = bundlesTableHeadHtml;
      rowBuilder = buildBundleListRow;
      cardBuilder = buildBundleGridCard;
      noun = "bundle";
    } else {
      rows = filterCatalog(f);
      els.tableHead.innerHTML = catalogTableHeadHtml;
      rowBuilder = buildCatalogRow;
      cardBuilder = buildCatalogCard;
      noun = "course";
    }
    rows = sortRows(rows, state.mode);

    els.resultCount.innerHTML = "<strong>" + fmtNumber(rows.length) + "</strong> " + noun + (rows.length === 1 ? "" : "s") + " found";

    els.resultsBody.innerHTML = "";
    els.resultsGrid.innerHTML = "";

    if (rows.length === 0) {
      els.resultsWrap.hidden = true;
      els.emptyState.hidden = false;
      return;
    }
    els.resultsWrap.hidden = false;
    els.emptyState.hidden = true;

    var tableFrag = document.createDocumentFragment();
    var gridFrag = document.createDocumentFragment();
    rows.forEach(function (item) {
      rowBuilder(item, f.q).forEach(function (el) { tableFrag.appendChild(el); });
      gridFrag.appendChild(cardBuilder(item, f.q));
    });
    els.resultsBody.appendChild(tableFrag);
    els.resultsGrid.appendChild(gridFrag);
  }

  function clearFilters() {
    els.search.value = "";
    els.industry.value = "";
    els.category.value = "";
    state.sort[state.mode] = "name:asc";
    els.sort.value = "name:asc";
    render();
  }

  function init() {
    rebuildSelect(els.industry, CATALOG.industries, "All Industries");
    rebuildSelect(els.category, CATALOG.categories, "All Categories");

    els.search.addEventListener("input", render);
    els.category.addEventListener("change", function () {
      if (els.category.value) els.industry.value = "";
      render();
    });
    els.industry.addEventListener("change", function () {
      if (els.industry.value) els.category.value = "";
      render();
    });
    els.sort.addEventListener("change", function () {
      state.sort[state.mode] = els.sort.value;
      render();
    });
    els.clear.addEventListener("click", clearFilters);
    els.viewListBtn.addEventListener("click", function () { setView("list"); });
    els.viewGridBtn.addEventListener("click", function () { setView("grid"); });
    els.modeCoursesBtn.addEventListener("click", function () { setMode("courses"); });
    els.modeBundlesBtn.addEventListener("click", function () { setMode("bundles"); });

    els.modalClose.addEventListener("click", closeModal);
    els.modalOverlay.addEventListener("click", function (e) {
      if (e.target === els.modalOverlay) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !els.modalOverlay.hidden) closeModal();
    });

    setView(state.view);
    setMode(state.mode);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
