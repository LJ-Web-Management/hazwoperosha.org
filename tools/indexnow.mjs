#!/usr/bin/env node
// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver, Yep) about every URL in sitemap.xml, following
// https://www.indexnow.org/documentation: one JSON POST with host, key, keyLocation and urlList. The key comes
// from site.config.js and must already be live at <site>/<key>.txt (tools/build.js writes it). The deploy
// workflow runs this after GitHub Pages has published the site.
// Usage: node tools/indexnow.mjs [--dry-run]
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

export const ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS = 10000;
// What each status means, from the IndexNow documentation.
const STATUS = {
  200: 'OK, URLs submitted',
  202: 'Accepted, key validation pending',
  400: 'Bad request: invalid format',
  403: 'Forbidden: key not valid (key file missing, or its content does not match)',
  422: 'Unprocessable: URLs do not belong to the host, or the key does not match the schema',
  429: 'Too many requests',
};

export function payload({ siteUrl, key, sitemapXml }) {
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key || '')) throw new Error('IndexNow key must be 8 to 128 characters of a-z, A-Z, 0-9 and -');
  const base = new URL(siteUrl);
  const urlList = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
  if (!urlList.length) throw new Error('sitemap.xml lists no URLs');
  const offHost = urlList.filter(u => new URL(u).host !== base.host);
  if (offHost.length) throw new Error(`URLs not on ${base.host}: ${offHost.join(', ')}`);
  if (urlList.length > MAX_URLS) throw new Error(`IndexNow takes at most ${MAX_URLS} URLs per request`);
  return { host: base.host, key, keyLocation: `${base.origin}/${key}.txt`, urlList };
}

export async function submit(body, fetchImpl = fetch) {
  const res = await fetchImpl(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  return { ok: res.status === 200 || res.status === 202, status: res.status, meaning: STATUS[res.status] || 'Unexpected status' };
}

async function main() {
  const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
  const site = createRequire(import.meta.url)(path.join(root, 'site.config.js'));
  const body = payload({ siteUrl: site.url, key: site.indexNowKey, sitemapXml: fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8') });
  if (process.argv.includes('--dry-run')) {
    console.log(JSON.stringify(body, null, 2));
    return;
  }
  const result = await submit(body);
  console.log(`IndexNow: ${body.urlList.length} URLs for ${body.host}: HTTP ${result.status} (${result.meaning})`);
  if (!result.ok) process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(err => { console.error(err.message); process.exitCode = 1; });
}
