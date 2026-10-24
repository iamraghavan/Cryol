import { NextRequest, NextResponse } from 'next/server';
import { business } from '@/lib/business';
import { createEnquiryCsrf, csrfSession, ENQUIRY_CSRF_COOKIE, ENQUIRY_CSRF_SECONDS, enquiryCsrfSecret } from '@/lib/enquiry-security';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const expected = new URL(process.env.SITE_URL || business.url).origin;
  const origin = request.headers.get('origin');
  const validOrigin = !origin || origin === expected || (process.env.NODE_ENV !== 'production' && origin === request.nextUrl.origin);
  const headers = { 'Cache-Control': 'no-store, max-age=0', Vary: 'Cookie, Origin', 'X-Robots-Tag': 'noindex, nofollow' };
  if (!validOrigin || request.headers.get('sec-fetch-site') === 'cross-site') return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403, headers });
  const secret = enquiryCsrfSecret();
  if (secret.length < 32) return NextResponse.json({ error: 'Online enquiries are temporarily unavailable. Please contact us directly.' }, { status: 503, headers });
  const session = csrfSession(request.cookies.get(ENQUIRY_CSRF_COOKIE)?.value);
  const response = NextResponse.json({ token: createEnquiryCsrf(session, secret) }, { headers });
  response.cookies.set(ENQUIRY_CSRF_COOKIE, session, { httpOnly: true, secure: request.nextUrl.protocol === 'https:', sameSite: 'strict', path: '/api/enquiries', maxAge: ENQUIRY_CSRF_SECONDS });
  return response;
}
