import { test, expect } from '@playwright/test';
import { createCmsOAuth, readCmsCookie, signCmsCookie, scriptJson } from '../src/lib/cms/security';
import { cmsSettings, CMS_PATH, CMS_STATE_COOKIE } from '../src/lib/cms/settings';
import { cmsConfig } from '../src/lib/cms/config';
import { authenticateCmsUser } from '../src/lib/cms/github';
import { parseContent, contentSchema } from '../src/lib/content';

const secret = 'test-only-session-secret-at-least-thirty-two-characters';
const site = 'http://localhost:3000';

test('CMS session cookies reject tampering and expiry; OAuth uses random state and PKCE', () => {
  const claims = { purpose: 'session' as const, origin: site, login: 'editor', expiresAt: Date.now() + 60000 };
  const cookie = signCmsCookie(claims, secret);
  expect(readCmsCookie(cookie, secret)?.login).toBe('editor');
  expect(readCmsCookie(cookie + 'x', secret)).toBeNull();
  expect(readCmsCookie(cookie, 'another-secret-that-is-at-least-32-characters')).toBeNull();
  expect(readCmsCookie(cookie, secret, claims.expiresAt)).toBeNull();
  const first = createCmsOAuth(site); const second = createCmsOAuth(site);
  expect(first.claims.state).not.toBe(second.claims.state);
  expect(first.claims.verifier).toHaveLength(43);
  expect(first.challenge).toHaveLength(43);
  expect(first.challenge).not.toBe(first.claims.verifier);
});

test('OAuth rejects unapproved accounts and read-only repository access', async () => {
  const settings = { ...cmsSettings(), origin: site, allowedUsers: ['editor'], repo: 'owner/repo', clientId: 'test-id', clientSecret: 'test-secret' };
  const mock = (login: string, push: boolean): typeof fetch => async url => {
    if (String(url).includes('/access_token')) return Response.json({ access_token: 'test-token' });
    if (String(url).endsWith('/user')) return Response.json({ login });
    return Response.json({ permissions: { push } });
  };
  await expect(authenticateCmsUser('code', 'verifier', settings, mock('stranger', true))).rejects.toThrow('not an authorised editor');
  await expect(authenticateCmsUser('code', 'verifier', settings, mock('editor', false))).rejects.toThrow('write access');
  expect(await authenticateCmsUser('code', 'verifier', settings, mock('editor', true))).toEqual({ token: 'test-token', login: 'editor' });
});

test('CMS script data cannot escape the script tag', () => {
  const unsafe = '</script><script>alert(1)</script>';
  expect(scriptJson(unsafe)).not.toContain('<');
  expect(JSON.parse(scriptJson(unsafe))).toBe(unsafe);
});

test('content defaults to draft, validates dates and blocks unsafe cover paths', () => {
  const source = '---\ntitle: Test article\nsummary: A useful article summary for this test.\ndate: "2026-10-24"\n---\n## Content\nA useful paragraph.';
  const entry = parseContent(source, 'test-article', 'blog');
  expect(entry.published).toBe(false);
  expect(() => parseContent(source, '../escape', 'blog')).toThrow();
  expect(contentSchema.safeParse({ ...entry, date: '2026-02-31' }).success).toBe(false);
  expect(contentSchema.safeParse({ ...entry, cover: '/uploads/../secret.png' }).success).toBe(false);
  expect(contentSchema.safeParse({ ...entry, cover: 'javascript:alert(1)' }).success).toBe(false);
  expect(contentSchema.safeParse({ ...entry, published: true, cover: '/uploads/project.png' }).success).toBe(true);
  expect(contentSchema.safeParse({ ...entry, cover: '/uploads/Project overview.png' }).success).toBe(true);
  expect(parseContent(source.replace('date:', 'cover: null\nservices: null\ndate:'), 'test-article', 'blog')).toMatchObject({ cover: '', services: [] });
});

test('Decap offers only blog and case-study collections with safe draft defaults', () => {
  const config = cmsConfig({ ...cmsSettings(), origin: site });
  expect(config.backend.name).toBe('github');
  expect(config.backend.auth_endpoint).toBe(CMS_PATH + '/auth/authorize');
  expect(config.collections.map(collection => collection.folder)).toEqual(['content/blog', 'content/case-studies']);
  for (const collection of config.collections) expect(collection.fields.find(field => field.name === 'published')).toMatchObject({ default: false });
});

test('CMS requires a session and prevents invalid OAuth callbacks and cross-origin logout', async ({ request }) => {
  const root = await request.get(CMS_PATH, { maxRedirects: 0 });
  expect(root.status()).toBe(307);
  expect(root.headers().location).toBe(site + CMS_PATH + '/auth/login');
  expect((await request.get(CMS_PATH + '/auth/session')).status()).toBe(401);
  const callback = await request.get(CMS_PATH + '/auth/callback?code=not-a-real-code&state=invalid');
  expect(callback.status()).toBe(400);
  expect(await callback.text()).not.toContain('test-client-secret');
  const logout = await request.post(CMS_PATH + '/auth/logout', { headers: { origin: 'https://example.com' } });
  expect(logout.status()).toBe(403);
  expect((await request.get(CMS_PATH + '/unknown')).status()).toBe(404);
});

test('OAuth start sets an HttpOnly state cookie and a fixed GitHub callback with PKCE', async ({ request }) => {
  const response = await request.get(CMS_PATH + '/auth/authorize?provider=github&scope=admin:org', { maxRedirects: 0 });
  expect(response.status()).toBe(307);
  const redirect = new URL(response.headers().location);
  expect(redirect.origin).toBe('https://github.com');
  expect(redirect.searchParams.get('redirect_uri')).toBe(site + CMS_PATH + '/auth/callback');
  expect(redirect.searchParams.get('code_challenge_method')).toBe('S256');
  expect(redirect.searchParams.get('scope')).toBe('repo');
  expect(response.headers()['set-cookie']).toContain('HttpOnly');
  const cookie = (await request.storageState()).cookies.find(item => item.name === CMS_STATE_COOKIE);
  expect(cookie).toBeTruthy();
  const claims = readCmsCookie(cookie!.value, secret)!;
  expect(claims.state).toBe(redirect.searchParams.get('state'));
  expect(claims.purpose).toBe('oauth');
});

test('login loads the actual Decap editor and stays outside public search', async ({ page }) => {
  const response = await page.goto(CMS_PATH + '/auth/login');
  expect(response?.headers()['x-robots-tag']).toContain('noindex');
  expect(response?.headers()['cache-control']).toContain('no-store');
  const policy = response?.headers()['content-security-policy'] || '';
  expect(policy).toContain('frame-ancestors');
  expect(policy).toContain('nonce-');
  await expect(page.getByRole('button', { name: /login with github/i })).toBeVisible({ timeout: 30000 });
  await expect(page.getByText('GitHub publishing is not connected')).toHaveCount(0);
});

test('published Markdown preserves the existing URL, while draft case studies stay private', async ({ page, request }) => {
  await page.goto('/blog/planning-your-business-website');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.cryol.in/blog/planning-your-business-website');
  await expect(page.getByRole('heading', { name: 'Start with the enquiry you want' })).toBeVisible();
  expect((await request.get('/case-studies/your-project-template')).status()).toBe(404);
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('/blog/planning-your-business-website');
  expect(sitemap).not.toContain('your-project-template');
  expect(sitemap).not.toContain('/int_ad/');
});
