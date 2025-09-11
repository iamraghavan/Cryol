import { z } from 'zod';

// Schema for the Quick Enquiry Form
export const quickEnquirySchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().min(10, {
    message: 'Please enter a valid phone number.',
  }),
  department: z.string({
    required_error: 'Please select a department to contact.',
  }),
  recaptcha: z.string().min(1, { message: 'Please complete the reCAPTCHA.' }),
});

// Constants for the Quote Form
export const services = [
  { id: 'web-app', label: 'Web app pentesting' },
  { id: 'api', label: 'API pentesting' },
  { id: 'network', label: 'External Network Pentesting' },
  { id: 'cloud', label: 'Cloud security assessment' },
  { id: 'mobile', label: 'Mobile app pentesting' },
  { id: 'iot', label: 'IoT Pentesting' },
  { id: 'others', label: 'Others' },
];

// Schema for the Get a Quote Form
export const quoteFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  workEmail: z.string().email({ message: 'Please enter a valid work email.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  location: z.string().min(2, { message: 'Please enter a valid location.' }),
  services: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one service.',
  }),
  message: z.string().optional(),
  recaptcha: z.string().min(1, { message: 'Please complete the reCAPTCHA.' }),
});
