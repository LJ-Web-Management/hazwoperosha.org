# HazwoperOSHA.org

Online OSHA HAZWOPER training site: every HAZWOPER course with a page each, free guides,
practice quizzes, a glossary, sitewide search and a multi-course cart checkout.

Live: https://lj-web-management.github.io/hazwoperosha.org/

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
`sitemap.xml`, `llms.txt`, `llms-full.txt`, `404.html`, `assets/config.js`,
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
```

## Checkout

Every seat is full list price. The cart sends a single `add_order` request to the
hazwoper-osha.com LMS API with all course ids and seat counts. Orders are tagged
`order_from: hazwoperosha-org`.

## Custom domain

To serve the site at hazwoperosha.org, set `url` in `site.config.js` to `https://hazwoperosha.org`,
add a `CNAME` file containing `hazwoperosha.org`, point the domain's DNS at GitHub Pages, then
rebuild and push.
