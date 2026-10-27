import { z } from 'zod';

export const contactSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(100),
  last_name: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Invalid email address').max(254),
  phone: z.string().max(30).optional().nullable(),
  address: z.string().max(500).optional().nullable(),
  company: z.string().max(100).optional().nullable(),
  job_title: z.string().max(100).optional().nullable(),
  notes: z.string().max(5000).optional().nullable(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const searchSchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  page_size: z.coerce.number().int().positive().max(100).default(20),
  sort_by: z.enum(['first_name', 'last_name', 'email', 'created_at', 'updated_at']).default('created_at'),
  sort_dir: z.enum(['asc', 'desc']).default('desc'),
});

export type SearchParams = z.infer<typeof searchSchema>;