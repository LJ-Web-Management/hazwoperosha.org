# HazwoperOSHA.org

Online OSHA HAZWOPER training site: every HAZWOPER course with a page each, free guides,
practice quizzes, a glossary, sitewide search and a multi-course cart checkout.

Live: https://www.hazwoperosha.org/ (custom domain in `CNAME`; `site.config.js` sets the same URL)

Sister sites share the same courses, content and checkout with different styling:
`website-staging` and `hazwoperosha.us`. `tools/build.js`, the course catalog (`data/source.json`, `data/lms-ids.json`) and the cart/checkout
scripts are shared. Each site has its own content and purpose so search engines see three
distinct sites: `data/copy.js`, `data/guides.js`, `data/quizzes.js`, `site.config.js`,
`assets/style.css` and the images in `assets/` belong to this site only. Don't copy articles
between the sites.

## Build

```
node tools/build.js
```

Generated pages (`index.html`, `courses/`, `guides/`, `quizzes/`, `search/`, `checkout.html`,
`sitemap.xml`, `llms.txt`, `llms-full.txt`, `404.html`, `404.md`, `courses.json`, `about/`,
`contact/`, `privacy/`, every page's `index.md`, `assets/config.js`,
`assets/search-index.js`) are committed. `.github/workflows/pages.yml` rebuilds and deploys to
GitHub Pages on every push to `main`.

## Files

```
site.config.js       brand, URL, theme colour, fonts, logo, order source for this site
data/copy.js         this site's own wording: home page, FAQ, course-page copy, section names (and tool pages)
data/source.json     course catalog          data/lms-ids.json  LMS course id per course
data/guides.js       guide articles          data/glossary.js   glossary terms
data/quizzes.js      practice quizzes
tools/build.js       generator
assets/style.css     this site's design
assets/cart.js       cart (localStorage) + header badge
assets/checkout.js   checkout: Stripe card, then one add_order call with every course id in the cart
assets/quiz.js, assets/site-search.js, assets/search.js
edge/                Cloudflare Worker for Markdown content negotiation (see AI agents)
tests/               build checks: node --test tests/*.test.js
```

## AI agents

`tools/build.js` also writes what AI agents and the Is Agentic (is-agentic.com) checks look for:

- `about/`, `contact/`, `privacy/`: trust pages linked from every footer. Company address and the
  pages' "last updated" date (`ADDRESS`, `TRUST_UPDATED`) are at the top of `tools/build.js`;
  `about` (opening paragraph) can be set per site in `data/copy.js`. The privacy page lists the
  analytics found in `site.config.js`, so update it if tracking changes.
- An `Organization` JSON-LD block (address, contactPoint) first on every page; the `@graph`
  refers to it by `@id`.
- `index.md` next to every content page, converted from the page's `<main>` and linked with
  `<link rel="alternate" type="text/markdown">`; `404.md`; `courses.json` (catalog with
  page, Markdown and checkout links).
- `llms.txt` sections "When to use" (`whenToUse` in `data/copy.js`) and "How agents can use
  this site".

`node --test tests/*.test.js` checks all of this after a build, and the deploy workflow runs it
before publishing.

### Markdown content negotiation (`edge/`)

GitHub Pages can't vary a response on the `Accept` header, so `Accept: text/markdown` requests
for `/` and Markdown 404 bodies need a layer in front of it. `edge/worker.mjs` is a Cloudflare
Worker that does this the way https://acceptmarkdown.com describes: q-value parsing,
`Content-Type: text/markdown; charset=utf-8`, `Vary: Accept`, 406 for unsupported types, a
`404.md` body for unknown paths, and a `Link` header from each HTML page to its Markdown version.
To switch it on:

1. Put the domain's DNS on Cloudflare, with `www` as a proxied CNAME to
   `lj-web-management.github.io` and SSL/TLS mode "Full".
2. `cd edge && npx wrangler login && npx wrangler deploy` (route and zone are in `edge/wrangler.toml`).
3. Check: `curl -sS -i -H 'Accept: text/markdown' https://www.hazwoperosha.org/` returns Markdown with
   `Vary: Accept`, `curl -sS -i -H 'Accept: text/html' https://www.hazwoperosha.org/` returns HTML, and
   `curl -sS -i -H 'Accept: text/markdown' https://www.hazwoperosha.org/no-such-page` returns 404 with Markdown.

## Checkout

Every seat is full list price. The cart sends a single `add_order` request to the
hazwoper-osha.com LMS API with all course ids and seat counts. Orders are tagged
`order_from: hazwoperosha-org`.

## Custom domain

The site is served at https://www.hazwoperosha.org. `CNAME` holds `www.hazwoperosha.org` and `url`
in `site.config.js` matches it. If the domain ever changes, update both, rebuild and push.
