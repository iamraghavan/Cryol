import { applicationDefault, getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore, type Firestore } from 'firebase-admin/firestore';
import { createHmac } from 'node:crypto';
import type { Enquiry } from './enquiry-schema';
import { enquiryFingerprint, submissionIdPattern } from './enquiry-security';

export function enquiryDb() {
  const app = getApps().find(app => app.name === 'cryol-enquiries') || initializeApp({
    credential: applicationDefault(),
    ...(process.env.FIREBASE_PROJECT_ID ? { projectId: process.env.FIREBASE_PROJECT_ID } : {}),
  }, 'cryol-enquiries');
  return getFirestore(app);
}

export async function saveEnquiry(data: Enquiry, ip: string, submissionId: string, database: Firestore = enquiryDb()) {
  const secret = process.env.ENQUIRY_RATE_LIMIT_SECRET;
  if (!secret) throw new Error('ENQUIRY_RATE_LIMIT_SECRET is required');
  if (!submissionIdPattern.test(submissionId)) throw new Error('INVALID_SUBMISSION_ID');
  const now = Date.now();
  const fingerprint = enquiryFingerprint(data, secret);
  const limitKey = createHmac('sha256', secret).update(ip).digest('hex');
  const limit = database.collection('enquiryRateLimits').doc(limitKey);
  const requested = database.collection('enquiries').doc(submissionId);
  const duplicate = database.collection('enquiryDeduplication').doc(fingerprint);
  return database.runTransaction(async tx => {
    const existing = await tx.get(requested);
    if (existing.exists) {
      if (existing.data()!.submissionFingerprint !== fingerprint) throw new Error('IDEMPOTENCY_CONFLICT');
      return { ref: requested, created: false, emailSent: existing.data()!.notification === 'sent' };
    }
    const prior = await tx.get(duplicate);
    if (prior.exists && prior.data()!.windowUntil > now) {
      const original = database.collection('enquiries').doc(prior.data()!.enquiryId);
      const stored = await tx.get(original);
      if (stored.exists && stored.data()!.submissionFingerprint === fingerprint) {
        return { ref: original, created: false, emailSent: stored.data()!.notification === 'sent' };
      }
    }
    const previous = await tx.get(limit);
    const window = previous.exists && previous.data()!.windowStart > now - 15 * 60 * 1000
      ? previous.data()! : { windowStart: now, count: 0 };
    if (window.count >= 5) throw new Error('RATE_LIMIT');
    const { website: _honeypot, turnstileToken: _verificationToken, ...enquiry } = data;
    tx.set(limit, { windowStart: window.windowStart, count: window.count + 1, expiresAt: new Date(now + 30 * 60 * 1000) });
    tx.create(requested, { ...enquiry, submissionFingerprint: fingerprint, createdAt: FieldValue.serverTimestamp(), status: 'new', notification: 'pending', consentVersion: '2026-10-24' });
    tx.set(duplicate, { enquiryId: requested.id, windowUntil: now + 15 * 60 * 1000, expiresAt: new Date(now + 15 * 60 * 1000) });
    return { ref: requested, created: true, emailSent: false };
  });
}
