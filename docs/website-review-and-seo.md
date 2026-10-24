# Website review and search growth plan

Reviewed 24 October 2026 against the repository and https://www.cryol.in.

## Original findings

- Both enquiry forms logged personal data and simulated success without storage or email.
- Mandatory reCAPTCHA validation blocked submission when its site key was missing.
- Website and mobile app development lacked their own service pages.
- The quote form offered only penetration-testing options, even on unrelated services.
- The home page relied on animation and client rendering for its primary experience.
- Navigation promoted under-construction blog and case-study pages.
- Footer support and social links pointed to placeholders. Business schema included social profiles, hours and coordinates without verification.
- Metadata referenced missing social preview, touch icon and manifest files.
- Build configuration ignored TypeScript errors.

## Implemented

- Responsive blue theme using the primary colour #076cd7, server-rendered homepage, clear service navigation and project CTAs.
- Seven service pages, each with its own summary, capabilities, deliverables, questions and service-specific enquiry form.
- Stored-first enquiries in Firestore, Gmail notifications, reply-to contact address, consent, honeypot and transactional shared rate limiting.
- Accurate success/error messages, including the stored-but-email-delayed case.
- Canonicals, sitemap, robots, business and service structured data and generated social image.
- Visible email and the exact Google Maps link supplied by the business owner.
- Useful website-planning article and privacy notice; incomplete case studies stay noindex and are removed from navigation/sitemap.
- No invented customer quotes, project counts, partnerships or ranking promises in the new public pages.

## Confirm before launch

The address was retained from the existing website and was not independently verified. Confirm it against the supplied Maps listing. Both contact numbers were updated from the business owner’s instructions. The short Maps link could not be resolved by the research tool, so no new coordinates or opening hours were inferred. Confirm that www.cryol.in is the intended canonical origin.

Review service capabilities, project ownership wording and the privacy notice with the business owner. Add named team profiles, actual credentials, approved project examples and genuine customer testimonials when available.

## Search and AI visibility

Google says its established SEO practices remain relevant to generative search. Useful content, accessible textual information, crawlability and accurate business information are the foundation. No special AI schema or llms.txt file guarantees AI citations.

Source: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

Service pages include visible questions to help visitors make decisions. We do not promise FAQ rich results for an IT business. Schema describes visible business/service information and includes no fabricated ratings.

## Off-page actions requiring account access and real business evidence

1. Verify ownership of the Google Business Profile associated with the supplied Maps link. Check business name, category, address, telephone, services, website and opening hours. Keep these consistent across public profiles.
2. Verify the domain in Google Search Console. Submit /sitemap.xml after launch, inspect service URLs and monitor indexing, queries, clicks and technical issues.
3. Establish a baseline for qualified enquiries by service and source. Add consent-aware analytics only after choosing the platform and agreeing privacy/cookie requirements. No third-party analytics is activated by this change.
4. Add or correct legitimate local and industry directory listings where they are useful to customers. Avoid bulk submissions and paid ranking links.
5. Ask actual customers for honest reviews through your approved process. Respond to feedback and seek permission before publishing testimonials.
6. Publish approved case studies showing the problem, Cryol's role, implementation and evidence for measured results. Build useful partnership and editorial relationships around this work.
7. Create business-owned social profiles, confirm their URLs, then add those verified links to the website and structured data.

No external listings, reviews, outreach messages, Search Console submissions or Business Profile edits were performed.

## First 90 days

- First month: deploy and verify forms, establish indexing and enquiry baselines, confirm profile consistency, gather approved business evidence.
- Second month: improve content using real buyer questions and Search Console data; publish the first approved project case study.
- Third month: review qualified enquiries, search impressions and user journeys; improve weak pages and pursue relevant editorial opportunities.

## Measurement

Track form submissions saved, notification failures, qualified leads, response time, organic landing pages and conversions by service. Assess search growth using actual Search Console data, not a fabricated SEO score. Indexing, rankings, AI citations and visitor enquiries cannot be guaranteed.

## Development verification

- TypeScript validation and production build passed with Next.js 15.5.28 and Node.js 22.22.2.
- All twenty-eight Playwright tests passed against the production server, including seven service pages, canonical URLs, structured data, mobile overflow/navigation, public link destinations, API validation, storage-unavailable handling stubbed notification-delay handling, server-side Turnstile validation, CSRF rejection, duplicate submissions and CMS authentication/content validation.
- Desktop and 390px mobile screenshots were generated in artifacts/ and visually inspected.
- Compatible dependency updates and CSS parser overrides resolved the advisories reported during installation. npm install reported zero known vulnerabilities on 24 October 2026. Overrides preserve the existing Next.js 15 / Tailwind 3 setup; build and browser tests passed with them.
- Live Firestore writes and Gmail delivery remain unverified until credentials are configured. Turnstile credentials are configured in the ignored local environment file; live challenge completion still depends on the hostname settings in Cloudflare. No external account settings or live website deployment were changed.


## Content publishing and enquiry protection update

Decap CMS is installed under /int_ad/CMS/v1/, with GitHub-backed Blog and Case Study collections. The existing article is now Markdown and keeps its original URL. Draft entries are excluded from the public lists, routes and sitemap. Empty case-study listings remain noindex until real projects are published. CMS pages and auth responses are noindex and no-store.

Enquiries now use signed session-bound CSRF tokens, client submission locking, idempotency keys and transactional duplicate detection. An equivalent request within 15 minutes returns the original reference without another notification. Optional contact fields are collapsed to reduce form effort. See enquiry-setup.md for live configuration and test limits.
