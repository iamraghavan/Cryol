import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import type { Enquiry } from './enquiry-schema';

export const ENQUIRY_CSRF_COOKIE = 'cryol_enquiry_session';
export const ENQUIRY_CSRF_SECONDS = 60 * 60;
const sessionPattern = /^[A-Za-z0-9_-]{43}$/;
export const submissionIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function enquiryCsrfSecret() { return process.env.ENQUIRY_CSRF_SECRET || ''; }
export function csrfSession(value?: string) { return value && sessionPattern.test(value) ? value : randomBytes(32).toString('base64url'); }

export function createEnquiryCsrf(session: string, secret: string, now = Date.now()) {
  if (secret.length < 32) throw new Error('CSRF configuration is unavailable');
  const body = Buffer.from(JSON.stringify({ expires: now + ENQUIRY_CSRF_SECONDS * 1000, nonce: randomBytes(16).toString('base64url') })).toString('base64url');
  const signature = createHmac('sha256', secret).update(session + '.' + body).digest('base64url');
  return body + '.' + signature;
}

export function verifyEnquiryCsrf(token: string | null, session: string | undefined, secret: string, now = Date.now()) {
  if (!token || token.length > 512 || !session || !sessionPattern.test(session) || secret.length < 32) return false;
  try {
    const [body, signature, extra] = token.split('.');
    if (!body || !signature || extra) return false;
    const actual = Buffer.from(signature, 'base64url');
    const expected = createHmac('sha256', secret).update(session + '.' + body).digest();
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false;
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    return typeof payload.nonce === 'string' && Number.isFinite(payload.expires) && payload.expires > now && payload.expires <= now + ENQUIRY_CSRF_SECONDS * 1000;
  } catch { return false; }
}

export function enquiryFingerprint(data: Enquiry, secret: string) {
  const content = JSON.stringify({
    name: data.name.toLowerCase().replace(/\s+/g, ' '),
    email: data.email.toLowerCase(),
    phone: data.phone.replace(/[^\d+]/g, ''),
    company: data.company.toLowerCase().replace(/\s+/g, ' '),
    service: data.service, message: data.message, consent: data.consent,
  });
  return createHmac('sha256', secret).update(content).digest('hex');
}
