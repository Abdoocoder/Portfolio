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

// Blog post schema
export const blogPostSchema = z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    content: z.string().min(1),
    category: z.enum(['tutorial', 'article', 'news', 'case-study']),
    tags: z.array(z.string()),
    publishDate: z.string().datetime(),
});

export type BlogPostSchema = z.infer<typeof blogPostSchema>;
