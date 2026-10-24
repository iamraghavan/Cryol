type Verification = 'verified' | 'rejected' | 'unavailable';

// The verification token and secret are never logged or stored.
export async function verifyTurnstile(
  token: string,
  options: { secret: string; hostname: string },
  fetcher: typeof fetch = fetch,
): Promise<Verification> {
  if (!options.secret) return 'unavailable';
  if (!token || token.length > 2048) return 'rejected';
  try {
    const response = await fetcher('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret: options.secret, response: token }),
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
    });
    if (!response.ok) return 'unavailable';
    const result = await response.json();
    return result.success === true && result.hostname === options.hostname && result.action === 'enquiry' ? 'verified' : 'rejected';
  } catch { return 'unavailable'; }
}
