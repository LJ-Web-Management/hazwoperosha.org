# hazwoperosha.org

> A HAZWOPER (29 CFR 1910.120) Course Finder — a question-by-question wizard that pinpoints the exact HAZWOPER or
> RCRA course a visitor needs. Companion site to [HAZWOPER-OSHA.com](https://hazwoper-osha.com/); all course
> enrollment happens there, not on this site.

Pure HTML/CSS/JS, no build step, no dependencies. Meant to be tested/previewed on GitHub Pages before any backend
work is wired up.

## Structure

```
index.html                          — Home / Course Finder (hero + question-by-question wizard)
courses/index.html                  — Course Catalog Search (1,000+ courses / 80 bundles, category+industry
                                       filters, search, list/grid, modal detail)
css/styles.css                      — shared site styling (black/yellow brand system matching hazwoper-osha.com)
css/catalog.css                     — Course Catalog Search page-specific styles (built on styles.css tokens)
js/main.js                          — nav toggle, current-page nav highlighting
js/course-finder.js                 — Course Finder decision-tree wizard (home page)
js/catalog-data.js                  — course/bundle catalog data (see below)
js/catalog-search.js                — Course Catalog Search behavior (filter/search/sort/list-grid/modal)
images/hazwoper-osha-logo.webp      — real hazwoper-osha.com brand lockup
images/hero-workers*.webp           — real hazwoper-osha.com hero photo (desktop/mobile)
```

## Course Finder

`js/course-finder.js` asks one question at a time — what the visitor is training for, their role or site type,
initial vs. annual refresher, exposure level, industry, and state (federal OSHA vs. Cal/OSHA) — and walks a
decision tree covering all 30 HAZWOPER/RCRA courses in the catalog down to a single exact match. It ships its own
small lookup table of just those 30 courses (name, citation, duration, regulator, URL) rather than loading the
full `catalog-data.js`, since the home page only ever needs to resolve to one of them. If the master catalog's
HAZWOPER/RCRA course list changes, update the `COURSES` table and, if needed, the `NODES` decision tree in that
file to match.

## Course Catalog Search

`courses/index.html` is adapted from the internal tool at
[LJ-Web-Management/hazwoperosha-course-search](https://github.com/LJ-Web-Management/hazwoperosha-course-search),
restyled to match this site's public theme. `js/catalog-data.js` is generated from that repo's `assets/data.js`
with pricing fields (MSRP, bundle price, savings, price tier) intentionally stripped for public display — that
data stays internal-only. A `url` field is included per course where it could be matched against this site's
independently-verified list of live hazwoper-osha.com course pages; unmatched courses/bundles get a "Call to
Enroll" fallback instead of a guessed link. Regenerate `catalog-data.js` from the source repo if the master
catalog changes (see that repo's own README/CLAUDE.md for the spreadsheet → data.js step).

## Current state

- Two pages only: the Course Finder home page and the Course Catalog Search page. No backend, no forms that submit
  anywhere, no e-commerce.
- Every enrollment/course-detail CTA links out to hazwoper-osha.com or a phone contact — this site is
  informational only and does not display course pricing.
- Course URLs were verified against the live hazwoper-osha.com catalog as of 2026-08-17; recheck before relying on
  them long-term in case slugs change.

## Local preview

```
npx serve .
```

or open `index.html` directly in a browser.

## Deployment

Deployed via GitHub Pages from the `main` branch (root). See repository settings for the live URL.
