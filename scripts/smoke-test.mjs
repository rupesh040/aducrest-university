import { readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// HTTP checks against a running development or production server.
// API checks use synthetic data and require a local, webhook-free server.
// For remote read-only checks: node scripts/smoke-test.mjs https://example.com --skip-api
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const skipApi = args.includes('--skip-api');
const baseArgument = args.find(argument => !argument.startsWith('--')) ?? 'http://127.0.0.1:3000';
let base;
try {
  base = new URL(baseArgument);
  if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password || base.pathname !== '/' || base.search || base.hash) throw new Error('Use an HTTP(S) origin without a path, query, credentials, or hash.');
} catch (error) {
  console.error(`Invalid base URL: ${error.message}`);
  process.exit(1);
}

const content = JSON.parse(readFileSync(resolve(root, 'app/data/content.json'), 'utf8').replace(/^\uFEFF/, '')).Education;
const failures = [];
let successfulPages = 0;
let successfulMissing = 0;
let successfulApi = 0;
let requests = 0;
const fail = (label, message) => failures.push(`${label}: ${message}`);

function decodeEntities(value) {
  const entities = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ', ndash: '–', mdash: '—', hellip: '…', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“' };
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    if (entity.startsWith('#')) {
      const codePoint = entity[1]?.toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return Number.isFinite(codePoint) && codePoint >= 0 && codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : match;
    }
    return entities[entity.toLowerCase()] ?? match;
  });
}
const normalize = value => decodeEntities(value.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();

async function request(path, options = {}) {
  requests++;
  return fetch(new URL(path, base), { redirect: 'manual', signal: AbortSignal.timeout(30_000), ...options });
}

const basicPages = [
  ['/', 'home'], ['/about', 'about'], ['/courses', 'courses'], ['/faculty', 'faculty'],
  ['/blog', 'blog'], ['/faq', 'faq'], ['/contact', 'contact'], ['/apply-now', 'apply-now'],
].map(([path, id]) => ({ path, metadataTitle: content.templateComponents['template-1'].pages[id].title }));
const detailPages = [
  ...content.collections.courses.map(course => ({ path: `/courses/${course.slug}`, heading: course.title })),
  ...content.collections.blogs.map(blog => ({ path: `/blog/${blog.slug}`, heading: blog.title })),
];

async function checkPage(page) {
  try {
    const response = await request(page.path);
    const html = await response.text();
    if (response.status !== 200) { fail(`GET ${page.path}`, `expected 200, received ${response.status}`); return; }
    if (!response.headers.get('content-type')?.includes('text/html') || !/<html\b/i.test(html)) { fail(`GET ${page.path}`, 'expected a complete HTML document'); return; }
    if (page.metadataTitle) {
      const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1];
      if (!title || !normalize(title).includes(normalize(page.metadataTitle))) { fail(`GET ${page.path}`, `missing configured metadata title "${page.metadataTitle}"`); return; }
    }
    if (page.heading) {
      const headings = [...html.matchAll(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(match => normalize(match[1]));
      if (!headings.includes(normalize(page.heading))) { fail(`GET ${page.path}`, `missing unique detail heading "${page.heading}"`); return; }
    }
    successfulPages++;
  } catch (error) { fail(`GET ${page.path}`, error.message); }
}

// Bound concurrent GETs so an uncompiled local Next server can keep responding.
const queue = [...basicPages, ...detailPages];
await Promise.all(Array.from({ length: Math.min(4, queue.length) }, async () => {
  while (queue.length) await checkPage(queue.shift());
}));

const unknownPaths = ['/courses/__smoke-missing-course__', '/blog/__smoke-missing-article__', '/__smoke-missing-page__'];
await Promise.all(unknownPaths.map(async path => {
  try {
    const response = await request(path);
    await response.arrayBuffer();
    if (response.status !== 404) fail(`GET ${path}`, `expected 404, received ${response.status}`);
    else successfulMissing++;
  } catch (error) { fail(`GET ${path}`, error.message); }
}));

function webhookConfigured() {
  const keys = ['ADUCREST_CONTACT_WEBHOOK_URL', 'ADUCREST_ADMISSION_WEBHOOK_URL'];
  if (keys.some(key => Boolean(process.env[key]?.trim()))) return true;
  for (const filename of readdirSync(root).filter(name => /^\.env(?:\.|$)/.test(name) && !/(?:example|sample|template)/i.test(name))) {
    const source = readFileSync(resolve(root, filename), 'utf8');
    for (const key of keys) {
      const value = source.match(new RegExp(`^\\s*(?:export\\s+)?${key}\\s*=\\s*(.*)$`, 'm'))?.[1]?.replace(/\s+#.*$/, '').trim().replace(/^(['"])(.*)\1$/, '$2').trim();
      if (value) return true;
    }
  }
  return false;
}

async function checkApi(path, label, body, contentType, expectedStatus, expectedBodyStatus) {
  try {
    const response = await request(path, {
      method: 'POST',
      headers: { 'Content-Type': contentType, Origin: base.origin, Host: base.host },
      body,
    });
    const result = await response.json();
    if (response.status !== expectedStatus) { fail(`POST ${path} (${label})`, `expected ${expectedStatus}, received ${response.status}`); return; }
    if (result.status !== expectedBodyStatus || typeof result.message !== 'string' || !result.message.trim()) { fail(`POST ${path} (${label})`, `expected a documented ${expectedBodyStatus} JSON response`); return; }
    if ((expectedStatus === 200 && result.ok !== true) || (expectedStatus !== 200 && result.ok !== false)) { fail(`POST ${path} (${label})`, 'response ok flag does not match HTTP status'); return; }
    if (response.headers.get('cache-control') !== 'no-store') { fail(`POST ${path} (${label})`, 'submission response must not be cached'); return; }
    successfulApi++;
  } catch (error) { fail(`POST ${path} (${label})`, error.message); }
}

if (!skipApi) {
  const loopback = ['127.0.0.1', 'localhost', '[::1]'].includes(base.hostname);
  if (!loopback || webhookConfigured()) {
    fail('API safety check', 'valid submission tests require a local server with webhook URLs unset; use --skip-api for read-only remote checks');
  } else {
    const contact = {
      fullName: 'AduCrest Smoke Test', email: 'smoke-test@example.invalid', phone: '+91 90000 00000',
      course: content.collections.courses[0].id, message: 'Synthetic local HTTP validation smoke test.',
    };
    const admission = { ...contact, birthDate: '2002-06-15', department: content.collections.departments[0].id };
    // Keep submission requests sequential and never use a configured delivery webhook.
    for (const [path, valid] of [['/api/contact', contact], ['/api/admission', admission]]) {
      await checkApi(path, 'valid', JSON.stringify(valid), 'application/json', 200, 'validated');
      await checkApi(path, 'malformed payload', JSON.stringify({ ...valid, email: 'invalid-email', course: '__missing-course__' }), 'application/json', 422, 'invalid');
      await checkApi(path, 'non-JSON', 'fullName=SmokeTest', 'text/plain', 415, 'error');
    }
  }
}

if (failures.length) {
  console.error(`HTTP smoke test failed: ${failures.length} failure(s) in ${requests} requests.`);
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`HTTP smoke test passed: ${successfulPages} pages (${basicPages.length} basic + ${detailPages.length} unique details), ${successfulMissing} missing routes returned 404, ${successfulApi} API cases${skipApi ? ' (API checks skipped)' : ''}; ${requests} requests against ${base.origin}.`);
