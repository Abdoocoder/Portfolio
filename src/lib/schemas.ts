import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
    name: z.string()
        .min(2, { message: 'Name must be at least 2 characters' })
        .max(100, { message: 'Name must be less than 100 characters' }),
    email: z.string()
        .email({ message: 'Please enter a valid email address' }),
    subject: z.string()
        .min(5, { message: 'Subject must be at least 5 characters' })
        .max(200, { message: 'Subject must be less than 200 characters' }),
    message: z.string()
        .min(10, { message: 'Message must be at least 10 characters' })
        .max(2000, { message: 'Message must be less than 2000 characters' }),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;

// Vault project validation schemas
export const projectLinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
});

export const projectCredentialSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

export const projectStatusSchema = z.enum([
  'idea',
  'active',
  'testing',
  'production',
  'paused',
  'completed',
]);

export const vaultProjectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  nameEn: z.string().min(1),
  emoji: z.string(),
  description: z.string(),
  status: projectStatusSchema,
  type: z.string(),
  tech: z.array(z.string()),
  progress: z.number().min(0).max(100),
  featured: z.boolean(),
  lastUpdated: z.string(),
  notes: z.string(),
  links: z.array(projectLinkSchema),
  credentials: z.array(projectCredentialSchema),
  createdAt: z.string().nullish(),
});

export const vaultActionSchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('get') }),
  z.object({
    action: z.literal('add'),
    data: vaultProjectSchema.omit({ id: true, createdAt: true }),
  }),
  z.object({
    action: z.literal('update'),
    id: z.string(),
    data: vaultProjectSchema.omit({ id: true, createdAt: true }).partial(),
  }),
  z.object({
    action: z.literal('delete'),
    id: z.string(),
  }),
]);
