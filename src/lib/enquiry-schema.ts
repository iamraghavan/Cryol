import { z } from 'zod';
import { serviceCatalog } from './services';
export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.string().trim().email('Please enter a valid email.').max(254),
  phone: z.string().trim().max(30).refine(v => !v || /^[+()\d\s.-]{7,30}$/.test(v), 'Please enter a valid phone number.'),
  company: z.string().trim().max(160).default(''),
  service: z.string().refine(v => v === 'general' || serviceCatalog.some(s => s.slug === v), 'Please choose a service.'),
  message: z.string().trim().min(10, 'Please share a little more detail (at least 10 characters).').max(5000),
  consent: z.literal(true, { error: 'Please agree so we can respond to your enquiry.' }),
  website: z.string().max(200).default(''),
  turnstileToken: z.string().max(2048).default(''),
  source: z.string().max(300).refine(v => v.startsWith('/') && !v.startsWith('//')).default('/contact'),
});
export type Enquiry = z.infer<typeof enquirySchema>;
