import { test, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import type { Firestore } from 'firebase-admin/firestore';
import { createEnquiryCsrf, csrfSession, enquiryFingerprint, verifyEnquiryCsrf } from '../src/lib/enquiry-security';
import { enquirySchema } from '../src/lib/enquiry-schema';
import { saveEnquiry } from '../src/lib/enquiry-store';

const secret = 'test-only-rate-limiting-secret-thirty-two-characters';
const enquiry = enquirySchema.parse({ name: 'Example Person', email: 'example@example.com', phone: '', company: '', service: 'website-development', message: 'Please discuss a business website.', consent: true, website: '', source: '/contact', turnstileToken: 'test-token' });

function memoryFirestore() {
  const records = new Map<string, Record<string, unknown>>();
  let queue: Promise<unknown> = Promise.resolve();
  const doc = (collection: string, id: string) => ({ id, path: collection + '/' + id });
  type Ref = ReturnType<typeof doc>;
  const database = {
    collection: (name: string) => ({ doc: (id: string) => doc(name, id) }),
    runTransaction: (run: (tx: object) => Promise<unknown>) => {
      const execute = async () => {
        const writes: { ref: Ref; value: Record<string, unknown> }[] = [];
        const result = await run({
          get: async (ref: Ref) => {
            if (writes.length) throw new Error('Firestore reads must precede writes');
            return { exists: records.has(ref.path), data: () => records.get(ref.path) };
          },
          set: (ref: Ref, value: Record<string, unknown>) => { writes.push({ ref, value }); },
          create: (ref: Ref, value: Record<string, unknown>) => {
            if (records.has(ref.path)) throw new Error('Already exists');
            writes.push({ ref, value });
          },
        });
        for (const write of writes) records.set(write.ref.path, write.value);
        return result;
      };
      queue = queue.then(execute, execute);
      return queue;
    },
  };
  return { database: database as unknown as Firestore, records };
}

test('CSRF tokens are signed, expire and are bound to the HttpOnly cookie session', () => {
  const session = csrfSession();
  const now = Date.now();
  const token = createEnquiryCsrf(session, secret, now);
  expect(verifyEnquiryCsrf(token, session, secret, now)).toBe(true);
  expect(verifyEnquiryCsrf(token, csrfSession(), secret, now)).toBe(false);
  expect(verifyEnquiryCsrf(token + 'x', session, secret, now)).toBe(false);
  expect(verifyEnquiryCsrf(token, undefined, secret, now)).toBe(false);
  expect(verifyEnquiryCsrf(token, session, secret, now + 3600000)).toBe(false);
});

test('deduplication excludes Turnstile tokens and normalises contact details', () => {
  expect(enquiryFingerprint(enquiry, secret)).toBe(enquiryFingerprint({ ...enquiry, email: 'EXAMPLE@example.com', source: '/services/website-development', turnstileToken: 'fresh-token' }, secret));
  expect(enquiryFingerprint(enquiry, secret)).not.toBe(enquiryFingerprint({ ...enquiry, message: 'Please discuss a mobile application.' }, secret));
});

test('a retry or fresh ID for identical content returns the original record and does not use the rate quota again', async () => {
  const previous = process.env.ENQUIRY_RATE_LIMIT_SECRET;
  process.env.ENQUIRY_RATE_LIMIT_SECRET = secret;
  try {
    const { database, records } = memoryFirestore();
    const id = randomUUID();
    const first = await saveEnquiry(enquiry, 'test-ip', id, database);
    const retry = await saveEnquiry({ ...enquiry, turnstileToken: 'fresh-token' }, 'test-ip', id, database);
    const duplicate = await saveEnquiry(enquiry, 'test-ip', randomUUID(), database);
    expect(first.created).toBe(true);
    expect(retry.created).toBe(false);
    expect(duplicate.created).toBe(false);
    expect(duplicate.ref.id).toBe(id);
    expect([...records.keys()].filter(key => key.startsWith('enquiries/'))).toHaveLength(1);
    expect([...records.entries()].find(([key]) => key.startsWith('enquiryRateLimits/'))![1].count).toBe(1);
    const stored = records.get('enquiries/' + id)!;
    expect(stored).not.toHaveProperty('turnstileToken');
    expect(stored).not.toHaveProperty('website');
    await expect(saveEnquiry({ ...enquiry, message: 'A different enquiry under the same ID.' }, 'test-ip', id, database)).rejects.toThrow('IDEMPOTENCY_CONFLICT');
  } finally { if (previous === undefined) delete process.env.ENQUIRY_RATE_LIMIT_SECRET; else process.env.ENQUIRY_RATE_LIMIT_SECRET = previous; }
});

test('concurrent equivalent submissions create one record; distinct enquiries still obey the shared rate limit', async () => {
  const previous = process.env.ENQUIRY_RATE_LIMIT_SECRET;
  process.env.ENQUIRY_RATE_LIMIT_SECRET = secret;
  try {
    const { database, records } = memoryFirestore();
    const results = await Promise.all([saveEnquiry(enquiry, 'test-ip', randomUUID(), database), saveEnquiry(enquiry, 'test-ip', randomUUID(), database)]);
    expect(results.filter(result => result.created)).toHaveLength(1);
    expect(new Set(results.map(result => result.ref.id)).size).toBe(1);
    for (let index = 1; index < 5; index++) await saveEnquiry({ ...enquiry, message: 'A different project requirement ' + index }, 'test-ip', randomUUID(), database);
    await expect(saveEnquiry({ ...enquiry, message: 'Sixth separate project requirement' }, 'test-ip', randomUUID(), database)).rejects.toThrow('RATE_LIMIT');
    expect([...records.keys()].filter(key => key.startsWith('enquiries/'))).toHaveLength(5);
  } finally { if (previous === undefined) delete process.env.ENQUIRY_RATE_LIMIT_SECRET; else process.env.ENQUIRY_RATE_LIMIT_SECRET = previous; }
});

test('API rejects missing or forged CSRF tokens and cross-site token requests', async ({ request }) => {
  const data = enquiry;
  const headers = { origin: 'http://localhost:3000', 'idempotency-key': randomUUID() };
  expect((await request.post('/api/enquiries', { data, headers })).status()).toBe(403);
  const csrfResponse = await request.get('/api/enquiries/csrf');
  expect(csrfResponse.headers()['cache-control']).toContain('no-store');
  const state = await request.storageState();
  const cookie = state.cookies.find(item => item.name === 'cryol_enquiry_session')!;
  expect(cookie.httpOnly).toBe(true);
  expect(cookie.sameSite).toBe('Strict');
  const { token } = await csrfResponse.json();
  expect((await request.post('/api/enquiries', { data, headers: { ...headers, 'x-csrf-token': token + 'bad' } })).status()).toBe(403);
  expect((await request.get('/api/enquiries/csrf', { headers: { origin: 'https://example.com', 'sec-fetch-site': 'cross-site' } })).status()).toBe(403);
  // A valid CSRF session reaches Turnstile, whose secret is deliberately empty in this test server.
  expect((await request.post('/api/enquiries', { data, headers: { ...headers, 'x-csrf-token': token } })).status()).toBe(503);
});

test('rapid double submission sends once and a retry preserves its idempotency key', async ({ page }) => {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: "window.turnstile={render:function(container,options){setTimeout(function(){options.callback('test-token')},0);return 'test'},remove:function(){}};" }));
  const ids: string[] = [];
  let finishFirst: (() => void) | undefined;
  await page.route('**/api/enquiries', async route => {
    ids.push(route.request().headers()['idempotency-key']);
    if (ids.length === 1) {
      await new Promise<void>(resolve => { finishFirst = resolve; });
      return route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'Please try again.' }) });
    }
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ id: 'original-reference', emailSent: true, duplicate: true }) });
  });
  await page.goto('/contact');
  await page.getByLabel('Your name').fill('Example Person');
  await page.getByLabel('Email address').fill('example@example.com');
  await page.getByLabel('What can we help with?').selectOption('website-development');
  await page.getByLabel('Tell us about your project').fill('Please discuss a business website.');
  await page.getByRole('checkbox').check();
  await page.locator('form.enquiry-form').evaluate(form => { (form as HTMLFormElement).requestSubmit(); (form as HTMLFormElement).requestSubmit(); });
  await expect.poll(() => ids.length).toBe(1);
  finishFirst!();
  await expect(page.locator('form').getByRole('alert')).toContainText('Please try again');
  await expect(page.getByRole('button', { name: 'Let’s discuss your project' })).toBeEnabled();
  await page.getByRole('button', { name: 'Let’s discuss your project' }).click();
  await expect(page.getByRole('status')).toContainText('Your enquiry is already saved.');
  expect(ids).toHaveLength(2);
  expect(ids[1]).toBe(ids[0]);
});

test('without JavaScript, form details are posted and never placed in the URL', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('http://localhost:3000/contact');
    await page.getByLabel('Your name').fill('Example Person');
    await page.getByLabel('Email address').fill('example@example.com');
    await page.getByLabel('What can we help with?').selectOption('website-development');
    await page.getByLabel('Tell us about your project').fill('Please discuss a business website.');
    await page.getByRole('checkbox').check();
    const outgoing = page.waitForRequest(request => request.isNavigationRequest() && request.url().endsWith('/api/enquiries'));
    await page.getByRole('button', { name: 'Let’s discuss your project' }).click();
    const request = await outgoing;
    expect(request.method()).toBe('POST');
    expect(new URL(request.url()).search).toBe('');
    expect(page.url()).not.toContain('example%40');
  } finally { await context.close(); }
});
