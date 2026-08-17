# hazwoperosha.org

> HAZWOPER OSHA Compliance Library — a free educational resource hub for HAZWOPER (29 CFR 1910.120) training
> requirements. Companion site to [HAZWOPER-OSHA.com](https://hazwoper-osha.com/); all course enrollment happens
> there, not on this site.

Pure HTML/CSS/JS, no build step, no dependencies. Meant to be tested/previewed on GitHub Pages before any backend
work is wired up.

## Structure

```
index.html                          — Home / Compliance Finder
hazwoper-explained/index.html       — 40hr/24hr/8hr-refresher/supervisor/incident-command guide
employer-toolkit/index.html         — training matrix, refresher tracker, checklists (printable)
state-osha-guide/index.html         — federal vs. state-plan OSHA, Cal/OSHA spotlight
spanish-resources/index.html        — bilingual (EN/ES) resource hub
frequently-asked-questions/index.html — FAQ
privacy-policy/index.html           — legal
terms-of-use/index.html             — legal
css/styles.css                      — all styling (shared brand system with hazwoper-osha.com's family of sites)
js/main.js                          — nav toggle, FAQ accordion, compliance finder, toolkit print/expand
images/hoc-logo.svg                 — site logo (navy/amber, matches brand family)
```

## Current state

- Static, self-contained resource hub. No backend, no forms that submit anywhere, no e-commerce.
- Every enrollment/pricing/course-detail CTA links out to hazwoper-osha.com — this site is informational only.
- Course URLs were verified against the live hazwoper-osha.com catalog as of 2026-08-17; recheck before relying on
  them long-term in case slugs change.
- Not a government website. Footer and an on-page callout carry the required disclaimer on every page.

## Local preview

```
npx serve .
```

or open `index.html` directly in a browser.

## Deployment

Deployed via GitHub Pages from the `main` branch (root). See repository settings for the live URL.
