# Cryol Technologies website

Next.js App Router site for Cryol Technologies, Chennai.

## Develop

Use Node.js 22 or another supported runtime.

```sh
npm ci
npm run dev
```

Development runs at http://localhost:9002. Set SITE_URL to that origin when testing local form submissions.

## Verify

```sh
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser tests start the production build at localhost:3000 with mail secrets empty. They cover all seven service pages, mobile layouts, real API rejection/unavailable responses and a stubbed saved-but-notified-later response. They do not send email or connect to a live database.

Set NEXT_PUBLIC_TURNSTILE_SITE_KEY before building (use your local configuration or a Cloudflare test site key in CI). Browser tests stub Cloudflare's widget script; server validation tests use simulated Siteverify responses. Development writes to .next-dev so it can run alongside production builds.

## Production

Run `npm run build` and `npm start`, or deploy through Firebase App Hosting. Keep the public domain, hosting redirects and SITE_URL consistent with https://www.cryol.in. This application uses a server API and is not a static HTML export.

See [Enquiry setup](docs/enquiry-setup.md) for Firebase/Gmail credentials, IAM, rate limiting and live verification. See [Website review and SEO plan](docs/website-review-and-seo.md) for findings and off-page work.

Content is in src/lib/services.ts. Contact information is centralised in src/lib/business.ts. Use only approved business facts and real customer evidence when expanding content.


## Publishing blogs and case studies

Use the GitHub-backed Decap CMS at /int_ad/CMS/v1/auth/login. See [CMS setup and editor guide](docs/cms-setup.md). No CMS database is required. Publishing is activated after configuring a GitHub OAuth App and the server environment. Templates for direct GitHub editing are in docs/content-templates/.
