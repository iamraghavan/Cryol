export const CMS_PATH = '/int_ad/CMS/v1';
export const CMS_LOGIN = CMS_PATH + '/auth/login';
export const CMS_STATE_COOKIE = 'cryol_cms_oauth';
export const CMS_SESSION_COOKIE = 'cryol_cms_session';
export const CMS_SESSION_SECONDS = 2 * 60 * 60;

export function cmsSettings() {
  const origin = new URL(process.env.CMS_SITE_URL || process.env.SITE_URL || 'https://www.cryol.in').origin;
  const repo = process.env.CMS_GITHUB_REPO || 'iamraghavan/Cryol';
  const allowedUsers = (process.env.CMS_GITHUB_ALLOWED_USERS || '').split(',').map(user => user.trim().toLowerCase()).filter(Boolean);
  const clientId = process.env.CMS_GITHUB_CLIENT_ID || '';
  const clientSecret = process.env.CMS_GITHUB_CLIENT_SECRET || '';
  const sessionSecret = process.env.CMS_SESSION_SECRET || '';
  const validRepo = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo);
  const secure = origin.startsWith('https://');
  const validOrigin = secure || ['localhost', '127.0.0.1'].includes(new URL(origin).hostname);
  return {
    origin, repo, allowedUsers, clientId, clientSecret, sessionSecret, secure,
    branch: process.env.CMS_GITHUB_BRANCH || 'main',
    scope: process.env.CMS_GITHUB_REPO_VISIBILITY === 'public' ? 'public_repo' : 'repo',
    ready: Boolean(validOrigin && validRepo && clientId && clientSecret && sessionSecret.length >= 32 && allowedUsers.length),
  };
}
