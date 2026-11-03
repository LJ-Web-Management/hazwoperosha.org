// Test stand-in for GitHub Pages serving the built site from the repo root: directories redirect to a
// trailing slash and serve index.html, files get GitHub's Content-Type and an ETag (304 on If-None-Match),
// and anything missing is a 404 with 404.html. Used by tests/edge.test.js and tests/tools.test.js.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');
const SITE_URL = /<link rel="canonical" href="([^"]+?)\/?">/.exec(fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8'))[1];
const TYPES = { '.html': 'text/html; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml', '.json': 'application/json; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.png': 'image/png' };
const etagOf = file => `"${crypto.createHash('md5').update(fs.readFileSync(file)).digest('hex').slice(0, 12)}"`;

// Paths requested from the origin, for tests that check how many origin fetches a request costs.
const originCalls = [];
async function pages(request) {
  originCalls.push(new URL(request.url).pathname);
  const url = new URL(request.url);
  const file = path.join(ROOT, decodeURIComponent(url.pathname));
  let target = null;
  if (file.startsWith(ROOT) && fs.existsSync(file)) {
    if (fs.statSync(file).isDirectory()) {
      if (!url.pathname.endsWith('/')) return new Response(null, { status: 301, headers: { Location: url.pathname + '/', 'Vary': 'Accept-Encoding' } });
      if (fs.existsSync(path.join(file, 'index.html'))) target = path.join(file, 'index.html');
    } else target = file;
  }
  const status = target ? 200 : 404;
  target = target || path.join(ROOT, '404.html');
  const headers = { 'Content-Type': TYPES[path.extname(target)] || 'application/octet-stream', 'Vary': 'Accept-Encoding' };
  if (status === 200) {
    headers.ETag = etagOf(target);
    if (request.headers.get('if-none-match') === headers.ETag) return new Response(null, { status: 304, headers });
  }
  return new Response(request.method === 'HEAD' ? null : fs.readFileSync(target), { status, headers });
}

module.exports = { ROOT, SITE_URL, pages, originCalls, etagOf };
