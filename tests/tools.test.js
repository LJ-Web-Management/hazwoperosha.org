// Tests tools/check-live.mjs (the live agent-readiness check) and tools/indexnow.mjs (IndexNow submission)
// against the built site. Run after `node tools/build.js`: node --test tests/*.test.js
const { test, before } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const { ROOT, SITE_URL, pages } = require('./github-pages.js');
const SITE = require('../site.config.js');

let worker, live, indexnow;
before(async () => {
  worker = await import('../edge/worker.mjs');
  live = await import('../tools/check-live.mjs');
  indexnow = await import('../tools/indexnow.mjs');
});
// fetch stand-ins: GitHub Pages alone (what is live today) and GitHub Pages behind edge/worker.mjs.
const pagesOnly = (url, init) => pages(new Request(url, init));
const withWorker = (url, init) => worker.handle(new Request(url, init), pages);
const failing = results => results.filter(r => !r.ok).map(r => r.name);

test('check-live: the site behind the edge worker passes every check', async () => {
  const results = await live.runChecks(SITE_URL, withWorker, { indexNowKey: SITE.indexNowKey });
  assert.deepEqual(failing(results), [], JSON.stringify(results.filter(r => !r.ok), null, 1));
  assert.ok(results.some(r => r.name.startsWith('IndexNow key file')));
});

test('check-live: GitHub Pages alone fails exactly the Markdown negotiation and Markdown 404 checks', async () => {
  const results = await live.runChecks(SITE_URL, pagesOnly, { indexNowKey: SITE.indexNowKey });
  assert.deepEqual(failing(results), [
    'Homepage: Accept text/markdown returns Markdown with Vary: Accept',
    'Unknown path: Accept text/markdown returns 404 with a Markdown body linking llms.txt or the sitemap',
  ]);
  const md = results.find(r => r.name.startsWith('Homepage: Accept text/markdown'));
  assert.match(md.detail, /Content-Type "text\/html; charset=utf-8"/);
});

test('check-live: a Markdown 404 without a link to llms.txt or the sitemap fails', async () => {
  const bare = async (url, init) => new URL(url).pathname.startsWith('/__agent-check-404-') && /markdown/.test(init.headers.accept || '')
    ? new Response('# Not found\n\nThis page does not exist.\n', { status: 404, headers: { 'Content-Type': 'text/markdown; charset=utf-8', Vary: 'Accept' } })
    : withWorker(url, init);
  const results = await live.runChecks(SITE_URL, bare);
  assert.deepEqual(failing(results), ['Unknown path: Accept text/markdown returns 404 with a Markdown body linking llms.txt or the sitemap']);
});

test('indexnow: payload follows the IndexNow JSON format for every sitemap URL', () => {
  const sitemapXml = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  const body = indexnow.payload({ siteUrl: SITE.url, key: SITE.indexNowKey, sitemapXml });
  assert.deepEqual(Object.keys(body), ['host', 'key', 'keyLocation', 'urlList']);
  assert.equal(body.host, new URL(SITE_URL).host);
  assert.equal(body.key, SITE.indexNowKey);
  assert.equal(body.keyLocation, `${SITE_URL}/${SITE.indexNowKey}.txt`);
  assert.equal(fs.readFileSync(path.join(ROOT, `${SITE.indexNowKey}.txt`), 'utf8'), SITE.indexNowKey, 'keyLocation serves the key');
  assert.deepEqual(body.urlList, [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]));
  for (const u of body.urlList) assert.equal(new URL(u).host, body.host, u);
});

test('indexnow: rejects bad keys, empty sitemaps and URLs on other hosts', () => {
  const ok = '<urlset><url><loc>https://www.hazwoperosha.org/</loc></url></urlset>';
  assert.throws(() => indexnow.payload({ siteUrl: SITE.url, key: 'short', sitemapXml: ok }), /8 to 128/);
  assert.throws(() => indexnow.payload({ siteUrl: SITE.url, key: 'has_underscore_key', sitemapXml: ok }), /8 to 128/);
  assert.throws(() => indexnow.payload({ siteUrl: SITE.url, key: SITE.indexNowKey, sitemapXml: '<urlset></urlset>' }), /no URLs/);
  assert.throws(() => indexnow.payload({ siteUrl: SITE.url, key: SITE.indexNowKey, sitemapXml: ok.replace('www.', '') }), /not on www\.hazwoperosha\.org/);
});

test('indexnow: submit POSTs JSON to the IndexNow endpoint and reads the documented statuses', async () => {
  const body = { host: 'www.hazwoperosha.org', key: SITE.indexNowKey, keyLocation: `${SITE_URL}/${SITE.indexNowKey}.txt`, urlList: [SITE_URL + '/'] };
  for (const [status, ok] of [[200, true], [202, true], [400, false], [403, false], [422, false], [429, false]]) {
    let sent;
    const result = await indexnow.submit(body, async (url, init) => { sent = { url, init }; return new Response(null, { status }); });
    assert.equal(sent.url, 'https://api.indexnow.org/indexnow');
    assert.equal(sent.init.method, 'POST');
    assert.equal(sent.init.headers['Content-Type'], 'application/json; charset=utf-8');
    assert.deepEqual(JSON.parse(sent.init.body), body);
    assert.equal(result.ok, ok, String(status));
    assert.equal(result.status, status);
  }
});
