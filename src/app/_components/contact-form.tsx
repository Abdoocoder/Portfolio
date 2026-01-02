'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormSchema } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormSchema>({
        resolver: zodResolver(contactFormSchema),
    });

    const onSubmit = async (data: ContactFormSchema) => {
        setIsSubmitting(true);

        try {
            // NOTE: Next.js API routes do not work in static exports (output: 'export').
            // To make this form work on GitHub Pages, use a service like Formspree.
            // Replace the URL below with your actual Formspree endpoint.

            const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_URL || 'https://formspree.io/f/YOUR_ID_HERE', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setIsSuccess(true);
            toast({
                title: 'Message sent!',
                description: 'Thank you for your message. I\'ll get back to you soon.',
            });
            reset();

            // Reset success state after 3 seconds
            setTimeout(() => setIsSuccess(false), 3000);
        } catch (_error) {
            toast({
                title: 'Error',
                description: 'Failed to send message. Please use a service like Formspree for static hosting.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                    id="name"
                    placeholder="Your name"
                    {...register('name')}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    disabled={isSubmitting}
                />
                {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    {...register('email')}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    disabled={isSubmitting}
                />
                {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                    id="subject"
                    placeholder="What's this about?"
                    {...register('subject')}
                    aria-invalid={errors.subject ? 'true' : 'false'}
                    disabled={isSubmitting}
                />
                {errors.subject && (
                    <p className="text-sm text-destructive">{errors.subject.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={6}
                    {...register('message')}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    disabled={isSubmitting}
                />
                {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
            </div>

            <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting || isSuccess}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                    </>
                ) : isSuccess ? (
                    <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Sent!
                    </>
                ) : (
                    <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                    </>
                )}
            </Button>
        </form>
    );
}
