import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/schemas';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const validatedData = contactFormSchema.parse(body);

        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY not configured — falling back to console log');
            console.log('Contact form submission:', validatedData);
            return NextResponse.json(
                { message: 'Message received (email not configured)' },
                { status: 200 }
            );
        }

        const { error } = await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>',
            to: 'abdooraf3@gmail.com',
            subject: `Portfolio Contact: ${validatedData.subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <table style="border-collapse:collapse;width:100%;max-width:600px;">
                    <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Name</td><td style="padding:8px;border-bottom:1px solid #ddd;">${validatedData.name}</td></tr>
                    <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Email</td><td style="padding:8px;border-bottom:1px solid #ddd;">${validatedData.email}</td></tr>
                    <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #ddd;">Subject</td><td style="padding:8px;border-bottom:1px solid #ddd;">${validatedData.subject}</td></tr>
                </table>
                <h3>Message</h3>
                <p style="padding:12px;background:#f5f5f5;border-radius:8px;">${validatedData.message}</p>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { error: 'Failed to send message' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
