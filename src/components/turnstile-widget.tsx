'use client';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

type TurnstileApi = {
  render: (container: HTMLElement, options: {
    sitekey: string; action: string; theme: string; size: string;
    callback: (token: string) => void;
    'expired-callback': () => void; 'error-callback': () => void;
  }) => string;
  remove: (id: string) => void;
};
declare global { interface Window { turnstile?: TurnstileApi } }

export function TurnstileWidget({ onToken, resetKey }: { onToken: (token: string) => void; resetKey: number }) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  useEffect(() => {
    const api = window.turnstile;
    if (!ready || !sitekey || !api || !container.current) return;
    setError('');
    const widget = api.render(container.current, {
      sitekey, action: 'enquiry', theme: 'light', size: 'flexible',
      callback: token => { setError(''); onToken(token); },
      'expired-callback': () => { onToken(''); },
      'error-callback': () => { onToken(''); setError('Verification could not complete. Please refresh the page and try again.'); },
    });
    return () => { api.remove(widget); };
  }, [ready, sitekey, onToken, resetKey]);
  if (!sitekey) return <p className="field-hint">Verification is temporarily unavailable. Please contact us by email or phone.</p>;
  return <div className="turnstile-verification">
    <Script id="cloudflare-turnstile" src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => setReady(true)} onError={() => { onToken(''); setError('Verification could not load. Please refresh the page or contact us by email.'); }} />
    <div ref={container} />
    {error && <p role="alert" className="field-hint">{error}</p>}
  </div>;
}
