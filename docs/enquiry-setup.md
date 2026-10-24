# Enquiry deployment and operations

The code is implemented. A Firestore database, runtime access and Gmail credentials are required before live enquiries can be saved and emailed. The CMS uses GitHub separately and does not need Firestore.

## Configure the server

1. Use a supported Node.js runtime (tested locally with Node 22).
2. Copy .env.example to .env.local for local use. In production use the hosting environment/secret manager.
3. Set SITE_URL to the exact public origin. Local development uses http://localhost:9002; browser tests use http://localhost:3000.
4. Set GMAIL_USER to cryoltechnologies@gmail.com or an approved sender. Enable two-step verification and generate a Gmail app password. Store it as GMAIL_APP_PASSWORD. Never use the account's ordinary password.
5. Create/enable Firestore and set FIREBASE_PROJECT_ID. On Google hosting use an authorised runtime service account with Application Default Credentials. On local/non-Google hosting, point GOOGLE_APPLICATION_CREDENTIALS to a protected service account file outside this repository.
6. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY at build time and TURNSTILE_SECRET_KEY as a server-only secret. Authorise the public domain and any preview hostnames in the Cloudflare widget. Add localhost only if testing challenges locally.
7. Generate separate random values of at least 32 characters for ENQUIRY_CSRF_SECRET and ENQUIRY_RATE_LIMIT_SECRET. Both are server-only. Local values have been generated in ignored .env.local.
8. Apply the deny-client Firestore rules to a dedicated enquiry database. Merge carefully if the project already hosts other applications. Server Admin SDK access is controlled by IAM.
9. Configure TTL cleanup for enquiryRateLimits.expiresAt and enquiryDeduplication.expiresAt. Logical time windows are enforced even before TTL cleanup runs.

Reference: https://firebase.google.com/docs/admin/setup
Reference: https://nodemailer.com/usage/using-gmail/

## Form protections

- The shared form asks for name, email, service and a short message. Phone and company are optional, inside a collapsed section.
- A synchronous client submission lock blocks rapid double clicks. The button shows progress.
- Each logical request receives a UUID idempotency key, retained when a failed request is retried. Editing the details generates a new key.
- Before submission, the browser requests /api/enquiries/csrf. This returns a signed, expiring CSRF token bound to an HttpOnly SameSite=Strict cookie, scoped to /api/enquiries.
- POST /api/enquiries requires the expected Origin, the matching session cookie, a valid X-CSRF-Token and a valid Idempotency-Key.
- Requests are limited to JSON and 24,000 actual body bytes, then validated on the server.
- Cloudflare Siteverify checks the Turnstile token, expected hostname and enquiry action. Errors, expiry or service failures block submission.
- A honeypot rejects automated form fills.
- Firestore transactions allow at most five new enquiries per network address per 15 minutes.
- A keyed fingerprint recognises equivalent enquiries for 15 minutes even if a second request uses a fresh UUID. Retries with the same UUID also return the existing reference.
- Reusing an idempotency key for different enquiry details returns 409. A repeat does not create another enquiry, consume another rate-limit slot or send another notification.
- Duplicate responses contain only the saved reference and notification status, not enquiry contents.
- Turnstile tokens and honeypot values are not stored. The raw IP address is not stored in the enquiry record.

Use a trusted hosting proxy that overwrites x-forwarded-for with the real client IP. Without that, a caller may spoof the rate-limit identity. Edge/WAF request limits are appropriate for sustained abuse; the application limit is not a DDoS defence.

## Storage and email

The enquiry is committed to enquiries/{UUID} before Gmail is called. The notification goes to cryoltechnologies@gmail.com with the visitor as reply-to. Mail is plain text. Personal form contents, secrets and verification tokens are not logged.

If storage fails, the form reports failure and retains the visitor's inputs. If email fails after storage, the form confirms the saved reference and explains the delayed notification. Repeating a saved enquiry returns the original reference instead of sending another email.

There is no automatic mail retry worker or administrative enquiry interface in this change. Review enquiries with notification=failed or pending in the restricted Firebase console and follow up manually. A process interruption after storage can leave a pending notification, so monitoring this queue remains necessary.

Agree retention/deletion responsibilities for enquiries and their corresponding Gmail notifications. If deleting an enquiry, also remove any associated duplicate-lookup records when practical. Firestore TTL removes only the short-lived rate-limit/duplicate lookup records, not the enquiry itself.

## Required live verification

- Submit one test enquiry after credentials are configured and confirm Firestore and Gmail.
- Confirm Reply addresses the visitor.
- Retry the same logical request and check that the original reference returns with one database record and one mail.
- Temporarily disable SMTP in staging and confirm that saved records remain available.
- Check missing/expired CSRF and Turnstile tokens are rejected before storage.
- Verify access to all three collections: enquiries, enquiryRateLimits, enquiryDeduplication.
- Confirm authorised staff review the database queue in addition to email.

Automated checks use simulated Turnstile responses and an in-memory Firestore transaction adapter for duplicate/rate-limit logic. They also exercise real API CSRF rejection and browser retry/double-submit behaviour against a production build. They do not establish live Firestore or Gmail delivery.

Reference: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
