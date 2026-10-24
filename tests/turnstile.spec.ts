import { test, expect } from '@playwright/test';
import { verifyTurnstile } from '../src/lib/turnstile';

const options = { secret: 'test-secret', hostname: 'www.cryol.in' };
const reply = (body: object, status = 200): typeof fetch => async () => new Response(JSON.stringify(body), { status });

test('verification requires success, matching hostname and enquiry action', async () => {
  expect(await verifyTurnstile('token', options, reply({ success: true, hostname: 'www.cryol.in', action: 'enquiry' }))).toBe('verified');
  expect(await verifyTurnstile('token', options, reply({ success: false, 'error-codes': ['timeout-or-duplicate'] }))).toBe('rejected');
  expect(await verifyTurnstile('token', options, reply({ success: true, hostname: 'example.com', action: 'enquiry' }))).toBe('rejected');
  expect(await verifyTurnstile('token', options, reply({ success: true, hostname: 'www.cryol.in', action: 'login' }))).toBe('rejected');
});

test('empty or oversized tokens never call Cloudflare', async () => {
  let called = false;
  const fetcher: typeof fetch = async () => { called = true; throw new Error('Unexpected request'); };
  expect(await verifyTurnstile('', options, fetcher)).toBe('rejected');
  expect(await verifyTurnstile('x'.repeat(2049), options, fetcher)).toBe('rejected');
  expect(called).toBe(false);
});

test('missing configuration and Cloudflare failures fail closed', async () => {
  expect(await verifyTurnstile('token', { ...options, secret: '' })).toBe('unavailable');
  expect(await verifyTurnstile('token', options, reply({}, 503))).toBe('unavailable');
  expect(await verifyTurnstile('token', options, async () => { throw new Error('Timeout'); })).toBe('unavailable');
});

test('verification sends the token and secret only to the official server endpoint', async () => {
  let endpoint = '';
  let request: RequestInit | undefined;
  const fetcher: typeof fetch = async (url, init) => {
    endpoint = String(url); request = init;
    return new Response(JSON.stringify({ success: true, hostname: 'www.cryol.in', action: 'enquiry' }));
  };
  await verifyTurnstile('verification-token', options, fetcher);
  expect(endpoint).toBe('https://challenges.cloudflare.com/turnstile/v0/siteverify');
  expect(request?.method).toBe('POST');
  expect(request?.body?.toString()).toBe('secret=test-secret&response=verification-token');
  expect(request?.cache).toBe('no-store');
});
