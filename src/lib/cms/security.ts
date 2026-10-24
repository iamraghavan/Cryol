import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export type CmsClaims = {
  purpose: 'oauth' | 'session'; origin: string; expiresAt: number;
  state?: string; verifier?: string; login?: string;
};

export function signCmsCookie(claims: CmsClaims, secret: string) {
  if (secret.length < 32) throw new Error('CMS session secret is not configured');
  const body = Buffer.from(JSON.stringify(claims)).toString('base64url');
  return body + '.' + createHmac('sha256', secret).update(body).digest('base64url');
}

export function readCmsCookie(value: string | undefined, secret: string, now = Date.now()): CmsClaims | null {
  if (!value || value.length > 4096 || secret.length < 32) return null;
  try {
    const [body, signature, extra] = value.split('.');
    if (!body || !signature || extra) return null;
    const expected = createHmac('sha256', secret).update(body).digest();
    const actual = Buffer.from(signature, 'base64url');
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
    const claims = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (!Number.isFinite(claims.expiresAt) || claims.expiresAt <= now || !['oauth', 'session'].includes(claims.purpose) || typeof claims.origin !== 'string') return null;
    return claims as CmsClaims;
  } catch { return null; }
}

export function createCmsOAuth(origin: string) {
  const state = randomBytes(32).toString('base64url');
  const verifier = randomBytes(32).toString('base64url');
  const challenge = createHash('sha256').update(verifier).digest('base64url');
  const claims: CmsClaims = { purpose: 'oauth', origin, state, verifier, expiresAt: Date.now() + 10 * 60 * 1000 };
  return { claims, challenge };
}

export function scriptJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}
