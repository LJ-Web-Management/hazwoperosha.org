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
`assets/search-index.js`, the IndexNow key file `<indexNowKey>.txt`) are committed. `.github/workflows/pages.yml` rebuilds and deploys to
GitHub Pages on every push to `main`.

## Files

```
site.config.js       brand, URL, theme colour, fonts, logo, order source for this site
data/copy.js         this site's own wording: home page, FAQ, course-page copy, section names (and tool pages)
data/source.json     course catalog          data/lms-ids.json  LMS course id per course
data/guides.js       guide articles          data/glossary.js   glossary terms
data/quizzes.js      practice quizzes
tools/build.js       generator
tools/check-live.mjs agent-readiness checks against the deployed site (see AI agents)
tools/indexnow.mjs   sends the sitemap URLs to IndexNow search engines after each deploy
assets/style.css     this site's design
assets/cart.js       cart (localStorage) + header badge
assets/checkout.js   checkout: Stripe card, then one add_order call with every course id in the cart
assets/quiz.js, assets/site-search.js, assets/search.js
edge/                Cloudflare Worker for Markdown content negotiation (see AI agents)
tests/               build, worker and tool checks: node --test tests/*.test.js
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
- Main product terms (`keywords` in `data/copy.js`, most important first) as the homepage's
  `<meta name="keywords">`, the WebSite JSON-LD `keywords` and the Organization `knowsAbout`.
  Brand-discoverability checks search the brand plus these terms (for example "HazwoperOSHA
  HAZWOPER learning center"), so keep each term in the homepage title or text; a test enforces it.
- IndexNow (https://www.indexnow.org): the key in `site.config.js` (`indexNowKey`, public by design)
  is published as `/<key>.txt`, and after each deploy `tools/indexnow.mjs` sends every sitemap URL to
  Bing and the other IndexNow engines. `node tools/indexnow.mjs --dry-run` prints the request.

`node --test tests/*.test.js` checks all of this after a build, and the deploy workflow runs it
before publishing. `node tools/check-live.mjs [https://hazwoperosha.org]` runs the same checks the
audits run against the live site (Markdown negotiation on `/`, Markdown 404s, llms.txt, sitemap,
robots.txt, courses.json, the IndexNow key) and exits non-zero if any fail.

### Markdown content negotiation (`edge/`)

GitHub Pages can't vary a response on the `Accept` header, so `Accept: text/markdown` requests
for `/` and Markdown 404 bodies need a layer in front of it. `edge/worker.mjs` is a Cloudflare
Worker that does this the way https://acceptmarkdown.com describes: q-value parsing,
`Content-Type: text/markdown; charset=utf-8`, `Vary: Accept`, 406 for unsupported types, a
`404.md` body for unknown paths, and a `Link` header from each HTML page to its Markdown version.

Until it is deployed, the live site fails the Markdown negotiation check and gets only partial
credit for 404s: GitHub Pages answers `Accept: text/markdown` with HTML and `Vary: Accept-Encoding`.
The domain's DNS is at GoDaddy (`ns65/ns66.domaincontrol.com`), so the Worker can't run yet. To
switch it on:

1. Add `hazwoperosha.org` to Cloudflare (the same account as hazwoperosha.us) and change the
   nameservers at GoDaddy to the two Cloudflare assigns. Keep the records: apex `A` to
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, and `www` as a
   CNAME to `lj-web-management.github.io`, both proxied. Set SSL/TLS mode to "Full".
2. Create a Cloudflare API token from the "Edit Cloudflare Workers" template, limited to that
   account and the `hazwoperosha.org` zone. Add it to this repository as the Actions secret
   `CLOUDFLARE_API_TOKEN`, and the account ID as `CLOUDFLARE_ACCOUNT_ID`.
3. Run the "Deploy edge worker" workflow (Actions tab, Run workflow). It also runs on every push to
   `main` that changes `edge/`. It tests the Worker, deploys it with the route in
   `edge/wrangler.toml`, then runs `tools/check-live.mjs` against https://hazwoperosha.org. Without
   the secret it only tests the Worker. To deploy by hand instead:
   `cd edge && npx wrangler login && npx wrangler deploy`.
4. Check: `node tools/check-live.mjs https://hazwoperosha.org`, or the audit's own commands:
   `curl -sS -L -i -H 'Accept: text/markdown' https://hazwoperosha.org/` returns Markdown with
   `Vary: Accept`, `curl -sS -L -i -H 'Accept: text/html' https://hazwoperosha.org/` returns HTML, and
   `curl -sS -L -i -H 'Accept: text/markdown' https://hazwoperosha.org/no-such-page` returns 404 with a
   Markdown body.

## Checkout

Every seat is full list price. The cart sends a single `add_order` request to the
hazwoper-osha.com LMS API with all course ids and seat counts. Orders are tagged
`order_from: hazwoperosha-org`.

The course ids come from `data/lms-ids.json`: each is the `course_id` of the course's page on hazwoper-osha.com.
They are not the `catalogId` numbers in `data/source.json`, which are rows in the ICTrainingUS spreadsheet.
Until 2026-11-10 the row numbers were used as LMS ids, so orders went to the wrong LMS course (row 595, the
8-Hour Refresher, is LMS course 595, Digger Derrick). The ids were corrected, prices now match the LMS (which
sets the amount charged), and the 16 courses with no LMS match were removed.

## Custom domain

The site is served at https://www.hazwoperosha.org. `CNAME` holds `www.hazwoperosha.org` and `url`
in `site.config.js` matches it. If the domain ever changes, update both, rebuild and push.
