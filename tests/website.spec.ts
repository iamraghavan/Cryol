import { test, expect } from '@playwright/test';
const slugs = ['website-development', 'application-development', 'mobile-app-development', 'digital-marketing', 'cloud-services', 'cyber-security', 'cyber-forensics'];

// UI tests stub only the third-party widget, never the real API rejection cases.
test.beforeEach(async ({ page }) => {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({
    contentType: 'application/javascript',
    body: "window.turnstile = { render: function(container, options) { setTimeout(function() { options.callback('browser-test-token'); }, 0); return 'test-widget'; }, remove: function() {} };",
  }));
});

test('every service has its own canonical, schema, content and selected enquiry', async ({ page }) => {
  for (const slug of slugs) {
    await page.goto('/services/' + slug);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.cryol.in/services/' + slug);
    await expect(page.locator('select[name="service"]')).toHaveValue(slug);
    await expect(page.locator('.capability')).toHaveCount(4);
    await expect(page.locator('.faq-list details')).toHaveCount(3);
    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(schemas.some(value => JSON.parse(value)['@type'] === 'Service')).toBeTruthy();
  }
});

test('mobile navigation and key pages fit the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const url of ['/', '/contact', '/services/mobile-app-development', '/get-a-quote']) {
    await page.goto(url);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Our services' }).click();
  await expect(page).toHaveURL(/\/services$/);
});

test('public pages have working internal destinations and no browser crashes', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  const links = await page.locator('a[href^="/"]').evaluateAll(elements => [...new Set(elements.map(element => element.getAttribute('href')!))]);
  for (const href of links) expect((await request.get(href)).status(), href).toBe(200);
  for (const url of ['/about', '/blog', '/blog/planning-your-business-website', '/contact', '/get-a-quote', '/privacy']) {
    await page.goto(url);
    await expect(page.locator('h1')).toHaveCount(1);
  }
  expect(errors).toEqual([]);
});

test('capture desktop and mobile homepage for visual review', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.screenshot({ path: 'artifacts/home-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'artifacts/home-mobile.png', fullPage: true });
});

test('form retains input on real unconfigured backend and allows retry', async ({ page }) => {
  await page.goto('/contact');
  await page.getByLabel('Your name').fill('Website Test');
  await page.getByLabel('Email address').fill('test@example.com');
  await page.getByLabel('What can we help with?').selectOption('website-development');
  await page.getByLabel('Tell us about your project').fill('We need a new website for our business.');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Let’s discuss your project' }).click();
  await expect(page.locator('form').getByRole('alert')).toContainText('temporarily unavailable');
  await expect(page.getByLabel('Your name')).toHaveValue('Website Test');
  await expect(page.getByRole('button', { name: 'Let’s discuss your project' })).toBeEnabled();
});

test('saved but email delayed response never invites duplicate submission', async ({ page }) => {
  await page.route('**/api/enquiries', route => route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({ id: 'test-reference', emailSent: false }) }));
  await page.goto('/services/cloud-services');
  await page.getByLabel('Your name').fill('Website Test');
  await page.getByLabel('Email address').fill('test@example.com');
  await page.getByLabel('Tell us about your project').fill('We need to migrate our business application.');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Let’s discuss your project' }).click();
  await expect(page.getByRole('status')).toContainText('Your enquiry is saved.');
  await expect(page.getByRole('status')).toContainText('do not need to submit it again');
  await expect(page.getByRole('status')).toContainText('test-reference');
});

test('API rejects cross-origin, invalid, spam and oversized requests before storage', async ({ request }) => {
  const data = { name: 'Test Person', email: 'test@example.com', phone: '', company: '', service: 'website-development', message: 'Please discuss a business website project.', consent: true, source: '/contact', website: '' };
  expect((await request.post('/api/enquiries', { data, headers: { origin: 'https://example.com' } })).status()).toBe(403);
  const csrf = await (await request.get('/api/enquiries/csrf')).json();
  const headers = { origin: 'http://localhost:3000', 'x-csrf-token': csrf.token, 'idempotency-key': '7fb586ee-0c64-42c9-a4a5-091b00ab71a1' };
  expect((await request.post('/api/enquiries', { data: { ...data, consent: false }, headers })).status()).toBe(400);
  expect((await request.post('/api/enquiries', { data: { ...data, service: 'invalid' }, headers })).status()).toBe(400);
  expect((await request.post('/api/enquiries', { data: { ...data, website: 'spam' }, headers })).status()).toBe(400);
  expect((await request.post('/api/enquiries', { data: { ...data, message: 'x'.repeat(25000) }, headers })).status()).toBe(413);
});

test('discovery assets are served and sitemap excludes incomplete pages', async ({ request }) => {
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  const xml = await sitemap.text();
  for (const slug of slugs) expect(xml).toContain('/services/' + slug);
  expect(xml).not.toContain('/case-studies');
  expect((await request.get('/robots.txt')).ok()).toBeTruthy();
  const image = await request.get('/opengraph-image');
  expect(image.ok()).toBeTruthy();
  expect(image.headers()['content-type']).toContain('image/png');
});
