import { randomBytes } from 'node:crypto';
import { NextResponse } from 'next/server';
import { cmsConfig } from './config';
import { CMS_LOGIN, CMS_PATH, type cmsSettings } from './settings';
import { escapeHtml, scriptJson } from './security';
type Settings = ReturnType<typeof cmsSettings>;

export function cmsHtml(content: string, script = '', status = 200) {
  const nonce = randomBytes(18).toString('base64');
  const document = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Cryol Content Manager</title><style>body{margin:0;background:#f1f6ff;color:#14243b;font:16px/1.7 Arial,sans-serif}a{color:#076cd7}button,.button{display:inline-block;border:0;border-radius:6px;background:#076cd7;color:white;padding:13px 20px;font:600 14px Arial;cursor:pointer;text-decoration:none}.card{max-width:520px;margin:12vh auto;padding:38px;background:white;border:1px solid #d9e4f2;border-radius:14px;box-shadow:0 15px 60px #14243b08}h1{font-size:30px;line-height:1.2}p{color:#64748b}.tag{font-size:11px;color:#076cd7;letter-spacing:2px;font-weight:bold}button:focus-visible,a:focus-visible{outline:3px solid #94c5ff;outline-offset:4px}#cryol-signout{position:fixed;bottom:12px;right:12px;z-index:2147483647}#cryol-signout button{font-size:12px;padding:10px 14px}@media(max-width:600px){.card{margin:50px 18px;padding:26px}}</style></head><body>' + content + (script ? '<script nonce="' + nonce + '">' + script + '</script>' : '') + '</body></html>';
  return new NextResponse(document, { status, headers: {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store, max-age=0',
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
    'Referrer-Policy': 'no-referrer',
    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': "default-src 'none'; script-src 'self' 'nonce-" + nonce + "' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://api.github.com https://raw.githubusercontent.com https://*.githubusercontent.com; frame-src 'self' blob:; worker-src 'self' blob:; frame-ancestors 'none'; base-uri 'none'; form-action 'self';",
  } });
}

export function cmsMessage(title: string, message: string, status = 200) {
  return cmsHtml('<main class="card"><span class="tag">CRYOL TECHNOLOGIES / CMS</span><h1>' + escapeHtml(title) + '</h1><p>' + escapeHtml(message) + '</p><a class="button" href="' + CMS_LOGIN + '">Return to CMS login</a> <a href="/">Visit website</a></main>', '', status);
}

export function cmsEditor(settings: Settings, login: string | null) {
  if (!settings.ready) return cmsMessage('Content publishing', 'GitHub publishing is not connected yet. Your website administrator needs to complete the CMS connection before editors can sign in.');
  const signout = '<form id="cryol-signout" action="' + CMS_PATH + '/auth/logout" method="post"><button type="submit">Sign out of Cryol CMS</button></form>';
  return cmsHtml('<div id="nc-root"></div>' + signout, `
    window.CMS_MANUAL_INIT = true;
    const cmsOrigin = ${scriptJson(settings.origin)};
    let signedIn = ${Boolean(login)};
    if (!signedIn) localStorage.removeItem('decap-cms-user');
    window.addEventListener('message', function(event) {
      if (event.origin !== cmsOrigin || event.source === window || typeof event.data !== 'string') return;
      if (event.data.startsWith('authorization:github:success:')) {
        signedIn = true;
        history.replaceState(null, '', ${scriptJson(CMS_PATH + '/')} + location.hash);
      }
    });
    setInterval(async function() {
      if (!signedIn) return;
      try {
        const response = await fetch(${scriptJson(CMS_PATH + '/auth/session')}, { cache: 'no-store' });
        if (response.status === 401) {
          localStorage.removeItem('decap-cms-user');
          location.replace(${scriptJson(CMS_LOGIN)});
        }
      } catch {}
    }, 60000);
    const script = document.createElement('script');
    script.src = ${scriptJson(CMS_PATH + '/assets/decap-cms.js')};
    script.onload = function() {
      window.CMS.init({ config: ${scriptJson(cmsConfig(settings))} });
    };
    script.onerror = function() {
      document.getElementById('nc-root').textContent = 'The content editor could not load. Please refresh this page.';
    };
    document.head.appendChild(script);
  `);
}

export function cmsOAuthPopup(origin: string, token: string) {
  const message = 'authorization:github:success:' + JSON.stringify({ token, provider: 'github' });
  return cmsHtml('<main class="card"><h1>GitHub sign-in approved</h1><p>Return to the content editor. This window will close when sign-in completes.</p></main>', `
    const origin = ${scriptJson(origin)};
    const opener = window.opener;
    if (opener) {
      window.addEventListener('message', function handshake(event) {
        if (event.origin !== origin || event.source !== opener || event.data !== 'authorizing:github') return;
        window.removeEventListener('message', handshake);
        opener.postMessage(${scriptJson(message)}, origin);
      });
      opener.postMessage('authorizing:github', origin);
    }
  `);
}
