#!/usr/bin/env node
// Checks a deployed copy of the site the way AI-agent readiness audits do: Markdown content negotiation on the
// homepage (https://acceptmarkdown.com), Markdown 404 bodies, and the machine-readable files. Redirects are
// followed, so the apex domain can be checked as well as www. Exits with status 1 if any check fails.
// Usage: node tools/check-live.mjs [base-url]   (default: url in site.config.js)
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const header = (res, name) => (res.headers.get(name) || '').toLowerCase();
const varies = (res, name) => header(res, 'vary').split(',').map(s => s.trim()).includes(name) || header(res, 'vary').trim() === '*';
const fail = (res, why) => `HTTP ${res.status}, Content-Type "${res.headers.get('content-type')}", Vary "${res.headers.get('vary')}": ${why}`;

export async function runChecks(base, fetchImpl = fetch, { indexNowKey } = {}) {
  const get = (p, accept) => fetchImpl(new URL(p, base).toString(), { headers: accept ? { accept } : {}, redirect: 'follow' });
  const probe = `/__agent-check-404-${Math.random().toString(36).slice(2, 10)}`;
  const checks = [
    ['Homepage: Accept text/markdown returns Markdown with Vary: Accept', async () => {
      const res = await get('/', 'text/markdown');
      const body = await res.text();
      if (res.status !== 200) return fail(res, 'expected 200');
      if (!header(res, 'content-type').startsWith('text/markdown')) return fail(res, 'expected Content-Type text/markdown');
      if (!varies(res, 'accept')) return fail(res, 'Vary must include Accept');
      if (!body.trim() || /^\s*</.test(body)) return fail(res, 'expected a nonempty Markdown body');
    }],
    ['Homepage: Accept text/html returns HTML', async () => {
      const res = await get('/', 'text/html');
      const body = await res.text();
      if (res.status !== 200 || !header(res, 'content-type').startsWith('text/html') || !/<html[\s>]/i.test(body)) return fail(res, 'expected 200 HTML');
    }],
    ['Unknown path: Accept text/markdown returns 404 with a Markdown body linking llms.txt or the sitemap', async () => {
      const res = await get(probe, 'text/markdown');
      const body = await res.text();
      if (res.status !== 404) return fail(res, 'expected 404');
      if (!header(res, 'content-type').startsWith('text/markdown')) return fail(res, 'expected Content-Type text/markdown');
      if (body.trim().length < 20) return fail(res, 'body must explain the error in at least 20 characters');
      if (!/https?:\/\/[^\s)]+\/(?:llms\.txt|sitemap\.xml|docs\b)/.test(body)) return fail(res, 'body must link to llms.txt, the sitemap or docs');
    }],
    ['Unknown path: Accept text/html returns the HTML 404 page', async () => {
      const res = await get(probe, 'text/html');
      await res.arrayBuffer();
      if (res.status !== 404 || !header(res, 'content-type').startsWith('text/html')) return fail(res, 'expected 404 HTML');
    }],
    ['/index.md is Markdown', async () => {
      const res = await get('/index.md');
      const body = await res.text();
      if (res.status !== 200 || !header(res, 'content-type').startsWith('text/markdown') || !body.startsWith('# ')) return fail(res, 'expected 200 text/markdown starting with "# "');
    }],
    ['/llms.txt follows the llms.txt format', async () => {
      const res = await get('/llms.txt');
      const body = await res.text();
      if (res.status !== 200 || !/^# .+\n\n> .+/.test(body)) return fail(res, 'expected 200 starting with "# <name>" and a "> " summary');
    }],
    ['/sitemap.xml is a sitemap', async () => {
      const res = await get('/sitemap.xml');
      const body = await res.text();
      if (res.status !== 200 || !header(res, 'content-type').includes('xml') || !body.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) return fail(res, 'expected 200 XML urlset');
    }],
    ['/robots.txt points to the sitemap', async () => {
      const res = await get('/robots.txt');
      const body = await res.text();
      if (res.status !== 200 || !/^Sitemap: https?:\/\/\S+\/sitemap\.xml$/m.test(body)) return fail(res, 'expected 200 with a Sitemap: line');
    }],
    ['/courses.json is a JSON course list', async () => {
      const res = await get('/courses.json');
      let list = null;
      try { list = JSON.parse(await res.text()); } catch { /* reported below */ }
      if (res.status !== 200 || !header(res, 'content-type').startsWith('application/json') || !Array.isArray(list) || !list.length) return fail(res, 'expected 200 application/json with a nonempty array');
    }],
  ];
  if (indexNowKey) checks.push([`IndexNow key file /${indexNowKey}.txt holds the key`, async () => {
    const res = await get(`/${indexNowKey}.txt`);
    const body = await res.text();
    if (res.status !== 200 || body.trim() !== indexNowKey) return fail(res, 'expected 200 with the key as the body');
  }]);

  const results = [];
  for (const [name, run] of checks) {
    try {
      const problem = await run();
      results.push({ name, ok: !problem, detail: problem || '' });
    } catch (err) {
      results.push({ name, ok: false, detail: err.message });
    }
  }
  return results;
}

async function main() {
  const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
  const site = createRequire(import.meta.url)(path.join(root, 'site.config.js'));
  const base = process.argv[2] || site.url;
  const results = await runChecks(base, fetch, { indexNowKey: site.indexNowKey });
  for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok ? '' : `\n      ${r.detail}`}`);
  const failed = results.filter(r => !r.ok).length;
  console.log(`\n${results.length - failed}/${results.length} checks passed for ${base}`);
  if (failed) process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(err => { console.error(err.message); process.exitCode = 1; });
}
