import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { enquirySchema } from '@/lib/enquiry-schema';
import { saveEnquiry } from '@/lib/enquiry-store';
import { business } from '@/lib/business';
import { serviceCatalog } from '@/lib/services';
import { verifyTurnstile } from '@/lib/turnstile';
import { ENQUIRY_CSRF_COOKIE, enquiryCsrfSecret, submissionIdPattern, verifyEnquiryCsrf } from '@/lib/enquiry-security';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const expectedOrigin = new URL(process.env.SITE_URL || business.url).origin;
  if (!origin || (origin !== expectedOrigin && !(process.env.NODE_ENV !== 'production' && origin === request.nextUrl.origin))) {
    return NextResponse.json({ error: 'Please submit your enquiry from our website.' }, { status: 403 });
  }
  if (!verifyEnquiryCsrf(request.headers.get('x-csrf-token'), request.cookies.get(ENQUIRY_CSRF_COOKIE)?.value, enquiryCsrfSecret())) {
    return NextResponse.json({ error: 'Your form session could not be verified. Please try sending again.' }, { status: 403 });
  }
  const submissionId = request.headers.get('idempotency-key') || '';
  if (!submissionIdPattern.test(submissionId)) return NextResponse.json({ error: 'Invalid submission reference. Please refresh the page and try again.' }, { status: 400 });
  if (!request.headers.get('content-type')?.includes('application/json')) return NextResponse.json({ error: 'Invalid request format.' }, { status: 415 });
  let input: unknown;
  try {
    // Bound the actual body, even when Content-Length is absent or inaccurate.
    const reader = request.body?.getReader();
    if (!reader) throw new Error('Empty body');
    const chunks: Uint8Array[] = []; let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24000) { await reader.cancel(); return NextResponse.json({ error: 'Your message is too long.' }, { status: 413 }); }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch { return NextResponse.json({ error: 'Please check your form and try again.' }, { status: 400 }); }
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ error: 'Unable to accept this enquiry.' }, { status: 400 });
  const verification = await verifyTurnstile(parsed.data.turnstileToken, {
    secret: process.env.TURNSTILE_SECRET_KEY || '',
    hostname: new URL(process.env.NODE_ENV === 'production' ? expectedOrigin : origin).hostname,
  });
  if (verification === 'unavailable') return NextResponse.json({ error: 'Security verification is temporarily unavailable. Please try again or contact us directly.' }, { status: 503 });
  if (verification !== 'verified') return NextResponse.json({ error: 'Security verification failed or expired. Please complete it again.' }, { status: 403 });
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.ENQUIRY_RATE_LIMIT_SECRET) {
    return NextResponse.json({ error: 'Online enquiries are temporarily unavailable. Please contact us by email or phone.' }, { status: 503 });
  }
  let saved;
  try {
    // Use the client IP header set by the trusted hosting proxy; document proxy requirements.
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    saved = await saveEnquiry(parsed.data, ip, submissionId);
  } catch (e) {
    if (e instanceof Error && e.message === 'RATE_LIMIT') return NextResponse.json({ error: 'Too many enquiries. Please try again in 15 minutes.' }, { status: 429, headers: { 'Retry-After': '900' } });
    if (e instanceof Error && e.message === 'IDEMPOTENCY_CONFLICT') return NextResponse.json({ error: 'This submission reference was already used. Please refresh the page before sending a different enquiry.' }, { status: 409 });
    console.error('Enquiry storage unavailable');
    return NextResponse.json({ error: 'We could not save your enquiry. Please try again or email us directly.' }, { status: 503 });
  }
  if (!saved.created) return NextResponse.json({ id: saved.ref.id, emailSent: saved.emailSent, duplicate: true }, { headers: { 'Cache-Control': 'no-store' } });
  const record = saved.ref;
  const data = parsed.data;
  const service = serviceCatalog.find(s => s.slug === data.service)?.title || 'General / multiple services';
  let emailSent = false;
  try {
    const mail = nodemailer.createTransport({
      service: 'gmail', auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
      connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 15000,
    });
    await mail.sendMail({
      from: { name: 'Cryol Website', address: process.env.GMAIL_USER },
      to: business.email, replyTo: data.email, subject: 'New website enquiry — ' + service,
      text: ['Reference: ' + record.id, 'Name: ' + data.name, 'Email: ' + data.email, 'Phone: ' + (data.phone || 'Not provided'), 'Company: ' + (data.company || 'Not provided'), 'Service: ' + service, 'Page: ' + data.source, '', data.message, '', 'Contact consent: accepted'].join('\n'),
    });
    emailSent = true;
  } catch { console.error('Enquiry notification delayed; record retained:', record.id); }
  try { await record.update({ notification: emailSent ? 'sent' : 'failed' }); }
  catch { console.error('Could not update enquiry notification status:', record.id); }
  return NextResponse.json({ id: record.id, emailSent, duplicate: false }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
}
