'use client';
import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import { serviceCatalog } from '@/lib/services';
import { enquirySchema } from '@/lib/enquiry-schema';
import { TurnstileWidget } from './turnstile-widget';

export function EnquiryForm({ service = '' }: { service?: string }) {
  const id = useId();
  const source = usePathname();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [verificationReset, setVerificationReset] = useState(0);
  const submissionLock = useRef(false);
  const submission = useRef<{ key: string; content: string } | null>(null);
  const [success, setSuccess] = useState<{ id: string; emailSent: boolean; duplicate: boolean } | null>(null);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionLock.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = enquirySchema.safeParse({ ...Object.fromEntries(data), consent: data.get('consent') === 'on', source, turnstileToken });
    if (!parsed.success) { setError(parsed.error.issues[0].message); return; }
    if (!turnstileToken) { setError('Please complete the security verification before sending your enquiry.'); return; }
    const { turnstileToken: _token, ...content } = parsed.data;
    const fingerprint = JSON.stringify(content);
    if (submission.current?.content !== fingerprint) submission.current = { key: crypto.randomUUID(), content: fingerprint };
    submissionLock.current = true;
    setError(''); setPending(true);
    try {
      const csrfResponse = await fetch('/api/enquiries/csrf', { credentials: 'same-origin', cache: 'no-store' });
      const csrf = await csrfResponse.json();
      if (!csrfResponse.ok || !csrf.token) throw new Error(csrf.error || 'Please refresh the page and try again.');
      const response = await fetch('/api/enquiries', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf.token, 'Idempotency-Key': submission.current!.key },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'We could not save your enquiry. Please try again.');
      setSuccess({ id: result.id, emailSent: result.emailSent, duplicate: Boolean(result.duplicate) });
      submission.current = null; setTurnstileToken(''); form.reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Connection failed. Please try again.');
      setTurnstileToken('');
      setVerificationReset(value => value + 1);
    }
    finally { submissionLock.current = false; setPending(false); }
  }
  if (success) return <div className="form-success" role="status"><CheckCircle2 size={36} /><h3>{success.duplicate ? 'Your enquiry is already saved.' : 'Your enquiry is saved.'}</h3><p>Thank you for telling us about your project. Our team will review your request.</p><p>Reference: <strong>{success.id}</strong></p>{!success.emailSent && <p>Email notification is delayed. Your enquiry is safely stored; you do not need to submit it again.</p>}<button type="button" className="button button-dark" onClick={() => setSuccess(null)}>Send another enquiry</button></div>;
  return <form method="post" action="/api/enquiries" onSubmit={submit} className="enquiry-form">
    <div className="form-row"><div><label htmlFor={id + '-name'}>Your name <span>*</span></label><input id={id + '-name'} name="name" autoComplete="name" placeholder="Your full name" required minLength={2} maxLength={100} /></div><div><label htmlFor={id + '-email'}>Email address <span>*</span></label><input id={id + '-email'} name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} /></div></div>
    <div><label htmlFor={id + '-service'}>What can we help with? <span>*</span></label><select id={id + '-service'} name="service" defaultValue={service} required><option value="" disabled>Select a service</option>{serviceCatalog.map(s => <option value={s.slug} key={s.slug}>{s.title}</option>)}<option value="general">I need guidance / multiple services</option></select></div>
    <div><label htmlFor={id + '-message'}>Tell us about your project <span>*</span></label><textarea id={id + '-message'} name="message" placeholder="What would you like to achieve? Share your goals, timeline or current challenges." required minLength={10} maxLength={5000} rows={4} /><p className="field-hint">Please keep passwords, payment details and forensic evidence out of this form.</p></div>
    <details className="optional-fields"><summary>Add phone or company details <span>(optional)</span></summary>
    <div className="form-row"><div><label htmlFor={id + '-phone'}>Phone <small>(optional)</small></label><input id={id + '-phone'} name="phone" type="tel" autoComplete="tel" placeholder="+91" maxLength={30} /></div><div><label htmlFor={id + '-company'}>Company <small>(optional)</small></label><input id={id + '-company'} name="company" autoComplete="organization" placeholder="Your business name" maxLength={160} /></div></div>
    </details>
    <div className="honeypot" aria-hidden="true"><label htmlFor={id + '-website'}>Leave this field empty</label><input id={id + '-website'} name="website" tabIndex={-1} autoComplete="off" /></div>
    <label className="consent-label"><input type="checkbox" name="consent" required /><span>I agree that Cryol may store these details and contact me about this enquiry. Read the <Link href="/privacy">privacy notice</Link>.</span></label>
    <TurnstileWidget onToken={setTurnstileToken} resetKey={verificationReset} />
    {error && <p role="alert" className="form-error">{error} You can also email <a href="mailto:cryoltechnologies@gmail.com">cryoltechnologies@gmail.com</a>.</p>}
    <button className="button button-dark form-submit" type="submit" disabled={pending}>{pending ? <><Loader2 size={18} className="animate-spin" /> Sending your enquiry…</> : <>Let’s discuss your project <ArrowUpRight size={18} /></>}</button>
    <p className="form-footnote" aria-live="polite">Your enquiry goes directly to the Cryol team.</p>
  </form>;
}
