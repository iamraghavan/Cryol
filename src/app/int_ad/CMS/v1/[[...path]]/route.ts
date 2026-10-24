import { NextRequest, NextResponse } from 'next/server';
import { cmsSettings, CMS_PATH, CMS_LOGIN, CMS_SESSION_COOKIE, CMS_STATE_COOKIE, CMS_SESSION_SECONDS } from '@/lib/cms/settings';
import { createCmsOAuth, readCmsCookie, signCmsCookie } from '@/lib/cms/security';
import { authenticateCmsUser } from '@/lib/cms/github';
import { cmsEditor, cmsHtml, cmsMessage, cmsOAuthPopup } from '@/lib/cms/html';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function session(request: NextRequest, settings: ReturnType<typeof cmsSettings>) {
  if (!settings.ready) return null;
  const claims = readCmsCookie(request.cookies.get(CMS_SESSION_COOKIE)?.value, settings.sessionSecret);
  return claims?.purpose === 'session' && claims.origin === settings.origin && claims.login && settings.allowedUsers.includes(claims.login.toLowerCase()) ? claims.login : null;
}
function json(body: object, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
}

export async function GET(request: NextRequest) {
  const settings = cmsSettings();
  const route = request.nextUrl.pathname.slice(CMS_PATH.length).replace(/\/$/, '') || '/';
  const login = session(request, settings);
  if (route === '/') {
    if (!login) return NextResponse.redirect(new URL(CMS_LOGIN, settings.origin));
    return cmsEditor(settings, login);
  }
  if (route === '/auth/login') {
    if (login) return NextResponse.redirect(new URL(CMS_PATH + '/', settings.origin));
    return cmsEditor(settings, null);
  }
  if (route === '/auth/session') return json({ authenticated: Boolean(login) }, login ? 200 : 401);
  if (route === '/auth/authorize') {
    if (!settings.ready) return cmsMessage('Publishing is not connected', 'Please contact your website administrator to finish connecting GitHub.', 503);
    if (request.nextUrl.origin !== settings.origin || (request.nextUrl.searchParams.get('provider') || 'github') !== 'github') return cmsMessage('Sign-in unavailable', 'Use the CMS login on the configured website address.', 400);
    const oauth = createCmsOAuth(settings.origin);
    const target = new URL('https://github.com/login/oauth/authorize');
    target.search = new URLSearchParams({
      client_id: settings.clientId, redirect_uri: settings.origin + CMS_PATH + '/auth/callback',
      scope: settings.scope, state: oauth.claims.state!, code_challenge: oauth.challenge, code_challenge_method: 'S256', allow_signup: 'false',
    }).toString();
    const response = NextResponse.redirect(target);
    response.headers.set('Cache-Control', 'no-store');
    response.cookies.set(CMS_STATE_COOKIE, signCmsCookie(oauth.claims, settings.sessionSecret), { httpOnly: true, secure: settings.secure, sameSite: 'lax', maxAge: 600, path: CMS_PATH + '/auth' });
    return response;
  }
  if (route === '/auth/callback') {
    const clearState = (response: NextResponse) => {
      response.cookies.set(CMS_STATE_COOKIE, '', { httpOnly: true, secure: settings.secure, sameSite: 'lax', maxAge: 0, path: CMS_PATH + '/auth' });
      return response;
    };
    if (!settings.ready) return clearState(cmsMessage('Publishing is not connected', 'Your administrator needs to finish connecting GitHub.', 503));
    const claims = readCmsCookie(request.cookies.get(CMS_STATE_COOKIE)?.value, settings.sessionSecret);
    const code = request.nextUrl.searchParams.get('code') || '';
    const state = request.nextUrl.searchParams.get('state') || '';
    if (!claims || claims.purpose !== 'oauth' || claims.origin !== settings.origin || request.nextUrl.origin !== settings.origin || claims.state !== state || !claims.verifier || !code || code.length > 512 || request.nextUrl.searchParams.has('error')) {
      return clearState(cmsMessage('Sign-in could not be verified', 'The sign-in request expired or was not recognised. Close this window and try again from the CMS login.', 400));
    }
    try {
      const user = await authenticateCmsUser(code, claims.verifier, settings);
      const response = clearState(cmsOAuthPopup(settings.origin, user.token));
      response.cookies.set(CMS_SESSION_COOKIE, signCmsCookie({ purpose: 'session', origin: settings.origin, login: user.login, expiresAt: Date.now() + CMS_SESSION_SECONDS * 1000 }, settings.sessionSecret), {
        httpOnly: true, secure: settings.secure, sameSite: 'lax', maxAge: CMS_SESSION_SECONDS, path: CMS_PATH,
      });
      return response;
    } catch {
      return clearState(cmsMessage('GitHub sign-in was not approved', 'Use an authorised editor account with write access to the website repository. If the problem continues, contact your website administrator.', 403));
    }
  }
  return cmsMessage('Page not found', 'This CMS address does not exist.', 404);
}

export async function POST(request: NextRequest) {
  const settings = cmsSettings();
  if (request.nextUrl.pathname !== CMS_PATH + '/auth/logout') return json({ error: 'Not found' }, 404);
  if (request.headers.get('origin') !== settings.origin) return json({ error: 'Invalid origin' }, 403);
  const response = cmsHtml('<main class="card"><h1>Signed out</h1><p>Your CMS session has ended.</p><a href="' + CMS_LOGIN + '">Return to login</a></main>',
    "localStorage.removeItem('decap-cms-user');location.replace(" + JSON.stringify(CMS_LOGIN) + ');');
  response.cookies.set(CMS_SESSION_COOKIE, '', { httpOnly: true, secure: settings.secure, sameSite: 'lax', maxAge: 0, path: CMS_PATH });
  response.cookies.set(CMS_STATE_COOKIE, '', { httpOnly: true, secure: settings.secure, sameSite: 'lax', maxAge: 0, path: CMS_PATH + '/auth' });
  return response;
}
