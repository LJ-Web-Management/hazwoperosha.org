# hazwoperosha.org

> A Course Finder: a question-by-question wizard that pinpoints the exact course a visitor needs out of HAZWOPER
> OSHA Training's full 1,000+ course catalog. Companion site to [HAZWOPER-OSHA.com](https://hazwoper-osha.com/);
> all course enrollment happens there, not on this site.

Pure HTML/CSS/JS, no build step, no dependencies. Meant to be tested/previewed on GitHub Pages before any backend
work is wired up.

## Structure

```
index.html                          : Home / Course Finder (hero + question-by-question wizard)
courses/index.html                  : Course Catalog Search (1,000+ courses / 80 bundles, category+industry
                                       filters, search, list/grid, modal detail)
css/styles.css                      : shared site styling (black/yellow brand system matching hazwoper-osha.com)
css/catalog.css                     : Course Catalog Search page-specific styles (built on styles.css tokens)
js/main.js                          : nav toggle, current-page nav highlighting
js/course-finder.js                 : Course Finder decision-tree wizard (home page)
js/catalog-data.js                  : course/bundle catalog data (see below)
js/catalog-search.js                : Course Catalog Search behavior (filter/search/sort/list-grid/modal)
images/hazwoper-osha-logo.webp      : real hazwoper-osha.com brand lockup
images/hero-workers*.webp           : real hazwoper-osha.com hero photo (desktop/mobile)
```

## Course Finder

`js/course-finder.js` asks one question at a time and adaptively narrows the *entire* catalog (all 1,033 courses,
loaded live from `js/catalog-data.js`) down to a single exact match. There's no hand-authored tree, since one
covering 1,000+ leaves by hand isn't maintainable. The flow is:

1. **Category** (always first): a searchable list of the catalog's 59 categories.
2. **Adaptive facet questions**: at each step it evaluates the remaining candidates' `type`, `industryTags`,
   `regBody`, and `duration` fields, and asks whichever one splits them most evenly (smallest worst-case group),
   skipping any facet that doesn't actually discriminate. A course with no value for a given facet still gets a
   real, clickable "Not specified" / "Not industry-specific" option; otherwise it would silently become
   unreachable once that facet is asked.
3. **Name pick**: once no facet can narrow further, the remaining candidates (which can range from 1 to a few
   dozen for very homogeneous categories) are shown as a searchable, clickable list so the visitor picks the exact
   course by name.

In practice this converges fast: category plus 2 to 4 facet questions gets to a unique course roughly a quarter of
the time, and a small searchable name-pick list the rest of the time (never more than a few dozen courses, even in
the worst case). Every one of the 1,033 courses is reachable with no dead ends, verified by simulating a full run
through the wizard for each course and checking it lands on the right one.

If the master catalog's field names or shape change, update the `FACETS` array and `facetValues()` in
`js/course-finder.js` to match.

## Course Catalog Search

`courses/index.html` is adapted from the internal tool at
[LJ-Web-Management/hazwoperosha-course-search](https://github.com/LJ-Web-Management/hazwoperosha-course-search),
restyled to match this site's public theme. `js/catalog-data.js` is generated from that repo's `assets/data.js`
with pricing fields (MSRP, bundle price, savings, price tier) intentionally stripped for public display; that
data stays internal-only. A `url` field is included per course where it could be matched against this site's
independently-verified list of live hazwoper-osha.com course pages; unmatched courses/bundles get a "Call to
Enroll" fallback instead of a guessed link. Regenerate `catalog-data.js` from the source repo if the master
catalog changes (see that repo's own README/CLAUDE.md for the spreadsheet-to-data.js step).

## Current state

- Two pages only: the Course Finder home page and the Course Catalog Search page. No backend, no forms that submit
  anywhere, no e-commerce.
- Every enrollment/course-detail CTA links out to hazwoper-osha.com or a phone contact; this site is informational
  only and does not display course pricing.
- Course URLs were verified against the live hazwoper-osha.com catalog as of 2026-08-17; recheck before relying on
  them long-term in case slugs change.

## Local preview

```
npx serve .
```

or open `index.html` directly in a browser.

## Deployment

Deployed via GitHub Pages from the `main` branch (root). See repository settings for the live URL.
