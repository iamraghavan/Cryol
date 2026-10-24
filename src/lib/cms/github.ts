import type { cmsSettings } from './settings';
type Settings = ReturnType<typeof cmsSettings>;

export async function authenticateCmsUser(code: string, verifier: string, settings: Settings, fetcher: typeof fetch = fetch) {
  const tokenResponse = await fetcher('https://github.com/login/oauth/access_token', {
    method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: settings.clientId, client_secret: settings.clientSecret, code, code_verifier: verifier, redirect_uri: settings.origin + '/int_ad/CMS/v1/auth/callback' }),
    cache: 'no-store', signal: AbortSignal.timeout(10000),
  });
  if (!tokenResponse.ok) throw new Error('GitHub authentication is unavailable.');
  const token = await tokenResponse.json();
  if (typeof token.access_token !== 'string' || !token.access_token || token.error) throw new Error('GitHub did not approve sign-in.');
  const headers = { Authorization: 'Bearer ' + token.access_token, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
  const userResponse = await fetcher('https://api.github.com/user', { headers, cache: 'no-store', signal: AbortSignal.timeout(10000) });
  if (!userResponse.ok) throw new Error('GitHub account could not be verified.');
  const user = await userResponse.json();
  if (typeof user.login !== 'string' || !settings.allowedUsers.includes(user.login.toLowerCase())) throw new Error('This account is not an authorised editor.');
  const repoResponse = await fetcher('https://api.github.com/repos/' + settings.repo, { headers, cache: 'no-store', signal: AbortSignal.timeout(10000) });
  if (!repoResponse.ok || (await repoResponse.json()).permissions?.push !== true) throw new Error('Repository write access is required.');
  return { token: token.access_token as string, login: user.login as string };
}
