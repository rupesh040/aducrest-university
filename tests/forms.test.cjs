const { readFileSync } = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const project = path.resolve(__dirname, '..');
const ts = require(path.join(project, 'node_modules/typescript/lib/typescript.js'));
const content = JSON.parse(readFileSync(path.join(project, 'src/data/content.json'), 'utf8')).Education;
const modules = { './content': { content } };
// Transpile the real shared TypeScript modules in memory using the project's
// existing dev dependency. The only runtime imports are explicit local fixtures.
function compile(name) {
  const source = readFileSync(path.join(project, `src/lib/${name}.ts`), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }).outputText;
  const result = { exports: {} };
  new Function('require', 'module', 'exports', code)((id) => {
    if (modules[id]) return modules[id];
    throw new Error(`Unexpected test import: ${id}`);
  }, result, result.exports);
  modules[`./${name}`] = result.exports;
  return result.exports;
}
const { validateSubmission, MAX_BODY_BYTES } = compile('validation');
const { handleSubmission } = compile('submission-handler');
const course = content.collections.courses[0].id;
const department = content.collections.departments[0].id;
const contact = { fullName: '  Neha  Sharma  ', email: 'neha@example.com', phone: '+91 98765 43210', course, message: 'Please tell me about the programme.' };
const admission = { ...contact, birthDate: '2004-02-29', department, message: '' };
const now = new Date('2026-10-17T00:00:00Z');
let checks = 0;
function check(value, description) { assert.ok(value, description); checks++; }
function invalid(fields, kind, field) { const result = validateSubmission(fields, kind, now); check(!result.valid && Boolean(result.errors[field]), `${kind}: rejects ${field}`); }
check(validateSubmission(contact, 'contact', now).valid, 'valid contact accepted');
check(validateSubmission(admission, 'admission', now).valid, 'valid admission with optional message accepted');
check(validateSubmission(contact, 'contact', now).values.fullName === 'Neha Sharma', 'name normalized');
for (const field of ['fullName', 'email', 'phone', 'course', 'message']) invalid({ ...contact, [field]: '' }, 'contact', field);
for (const field of ['fullName', 'email', 'phone', 'birthDate', 'course', 'department']) invalid({ ...admission, [field]: '' }, 'admission', field);
invalid({ ...contact, email: 'no-at.example.com' }, 'contact', 'email');
invalid({ ...contact, email: 'hi@localhost' }, 'contact', 'email');
invalid({ ...contact, email: `${'n'.repeat(255)}@example.com` }, 'contact', 'email');
invalid({ ...contact, phone: '+91 phone' }, 'contact', 'phone');
invalid({ ...contact, phone: '12345' }, 'contact', 'phone');
invalid({ ...contact, phone: '1'.repeat(16) }, 'contact', 'phone');
invalid({ ...contact, fullName: 'A' }, 'contact', 'fullName');
invalid({ ...contact, fullName: '<script>user</script>' }, 'contact', 'fullName');
invalid({ ...contact, fullName: '12345' }, 'contact', 'fullName');
invalid({ ...contact, fullName: 'N'.repeat(101) }, 'contact', 'fullName');
invalid({ ...contact, course: 'unknown' }, 'contact', 'course');
invalid({ ...admission, department: 'unknown' }, 'admission', 'department');
invalid({ ...admission, birthDate: '2003-02-29' }, 'admission', 'birthDate');
invalid({ ...admission, birthDate: '2026-10-18' }, 'admission', 'birthDate');
invalid({ ...admission, birthDate: '1899-01-01' }, 'admission', 'birthDate');
invalid({ ...admission, birthDate: '2025-13-50' }, 'admission', 'birthDate');
check(validateSubmission({ ...admission, birthDate: '2026-10-17' }, 'admission', now).valid, 'today accepted');
check(validateSubmission({ ...admission, birthDate: '2026-10-18' }, 'admission', new Date('2026-10-17T20:00:00Z')).valid, 'site local day accepted near UTC midnight');
check(!validateSubmission({ ...admission, birthDate: '2026-10-19' }, 'admission', new Date('2026-10-17T20:00:00Z')).valid, 'future site local day rejected');
invalid({ ...contact, message: 'x'.repeat(3001) }, 'contact', 'message');
invalid({ ...contact, message: 'text\x00payload' }, 'contact', 'message');
for (const payload of [null, [], 42, 'x', { ...contact, phone: 12345 }, { ...contact, extra: 'x' }]) check(!validateSubmission(payload, 'contact', now).payloadValid, 'invalid payload rejected');
const contactUrl = 'https://university.example/api/contact';
function request(body = contact, headers = {}) { return new Request(contactUrl, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) }); }
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => { throw new Error('Unexpected outbound request in form tests'); };
(async () => {
  // Make the test process independent of any configured production integration.
  // No outbound request may occur except through the explicit mocks below.
  delete process.env.ADUCREST_CONTACT_WEBHOOK_URL;
  let response = await handleSubmission(request(), 'contact');
  let body = await response.json();
  check(response.status === 200 && body.ok && body.status === 'validated', 'honest validation-only success');
  check(body.message === content.ui.forms.status.contactValidated, 'success from JSON');
  response = await handleSubmission(request('{bad'), 'contact'); check(response.status === 400, 'malformed JSON rejected');
  response = await handleSubmission(request({ ...contact, email: 'invalid' }), 'contact'); body = await response.json(); check(response.status === 422 && body.errors.email, 'API validation');
  response = await handleSubmission(request('x'.repeat(MAX_BODY_BYTES + 1)), 'contact'); check(response.status === 413, 'streaming body limit');
  response = await handleSubmission(request(contact, { 'Content-Length': '90000' }), 'contact'); check(response.status === 413, 'declared body limit');
  response = await handleSubmission(request(contact, { Origin: 'https://attacker.example' }), 'contact'); check(response.status === 403, 'foreign origin rejected');
  const localRequest = (origin, extraHeaders = {}) => new Request('http://localhost:3000/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', Host: '127.0.0.1:3000', Origin: origin, ...extraHeaders }, body: JSON.stringify(contact) });
  response = await handleSubmission(localRequest('http://127.0.0.1:3000'), 'contact'); check(response.status === 200, 'browser Host accepted when Next Request URL uses localhost');
  response = await handleSubmission(localRequest('http://attacker.example:3000'), 'contact'); check(response.status === 403, 'foreign browser origin rejected with canonical Host');
  response = await handleSubmission(localRequest('http://localhost:3000'), 'contact'); check(response.status === 403, 'Request URL alias does not bypass supplied Host');
  response = await handleSubmission(localRequest('http://attacker.example:3000', { 'x-forwarded-host': 'attacker.example:3000' }), 'contact'); check(response.status === 403, 'forwarded host cannot override authority');
  response = await handleSubmission(localRequest('https://127.0.0.1:3000', { 'x-forwarded-proto': 'https' }), 'contact'); check(response.status === 200, 'single HTTPS reverse-proxy protocol supported');
  response = await handleSubmission(localRequest('http://127.0.0.1:3000/path'), 'contact'); check(response.status === 403, 'Origin path rejected');
  response = await handleSubmission(localRequest('null'), 'contact'); check(response.status === 403, 'opaque Origin rejected');
  response = await handleSubmission(localRequest(''), 'contact'); check(response.status === 403, 'explicit empty Origin rejected');
  response = await handleSubmission(localRequest('http://127.0.0.1:3000', { Host: '127.0.0.1:3000/attacker' }), 'contact'); check(response.status === 403, 'Host path rejected');
  response = await handleSubmission(request(contact, { 'Content-Type': 'text/plain' }), 'contact'); check(response.status === 415, 'non-JSON rejected');
  process.env.ADUCREST_CONTACT_WEBHOOK_URL = 'http://university.example/receive';
  response = await handleSubmission(request(), 'contact'); check(response.status === 503, 'insecure webhook rejected');
  process.env.ADUCREST_CONTACT_WEBHOOK_URL = 'https://hooks.example/receive';
  process.env.ADUCREST_CONTACT_WEBHOOK_TOKEN = 'test-token';
  globalThis.fetch = async (url, options) => {
    const forwarded = JSON.parse(options.body);
    check(String(url) === 'https://hooks.example/receive', 'configured endpoint used');
    check(options.headers.Authorization === 'Bearer test-token', 'optional authentication forwarded');
    check(forwarded.fields.fullName === 'Neha Sharma' && !('department' in forwarded.fields), 'sanitized allowed fields forwarded');
    check(options.redirect === 'error', 'webhook redirects prevented');
    return new Response(null, { status: 202 });
  };
  response = await handleSubmission(request(), 'contact'); body = await response.json(); check(body.status === 'delivered', 'integration acceptance reported');
  globalThis.fetch = async () => new Response(null, { status: 500 });
  response = await handleSubmission(request(), 'contact'); check(response.status === 502, 'webhook failure remains failure');
  globalThis.fetch = originalFetch;
  delete process.env.ADUCREST_CONTACT_WEBHOOK_URL;
  delete process.env.ADUCREST_CONTACT_WEBHOOK_TOKEN;
  console.log(`Passed ${checks} form validation and API behavior checks.`);
})().catch((error) => { console.error(error); process.exitCode = 1; });
