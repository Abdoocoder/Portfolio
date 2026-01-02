import { Metadata } from 'next';

const baseUrl = 'https://abdullahsghaira.com'; // Update with your actual domain

export const defaultMetadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: 'Abdullah Abu Sghaira - Full Stack Developer',
        template: '%s | Abdullah Abu Sghaira',
    },
    description: 'Full Stack Developer specializing in React, Next.js, and modern web technologies. Building exceptional digital experiences.',
    keywords: [
        'Abdullah Abu Sghaira',
        'Full Stack Developer',
        'React Developer',
        'Next.js Developer',
        'Web Developer',
        'Frontend Developer',
        'Backend Developer',
        'TypeScript',
        'JavaScript',
        'Portfolio',
    ],
    authors: [{ name: 'Abdullah Abu Sghaira' }],
    creator: 'Abdullah Abu Sghaira',
    publisher: 'Abdullah Abu Sghaira',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        alternateLocale: ['ar_SA'],
        url: baseUrl,
        siteName: 'Abdullah Abu Sghaira Portfolio',
        title: 'Abdullah Abu Sghaira - Full Stack Developer',
        description: 'Full Stack Developer specializing in React, Next.js, and modern web technologies.',
        images: [
            {
                url: `${baseUrl}/og-image.png`,
                width: 1200,
                height: 630,
                alt: 'Abdullah Abu Sghaira - Full Stack Developer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Abdullah Abu Sghaira - Full Stack Developer',
        description: 'Full Stack Developer specializing in React, Next.js, and modern web technologies.',
        images: [`${baseUrl}/twitter-image.png`],
        creator: '@abdoocoder', // Update with your Twitter handle
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code', // Add your verification code
        // yandex: 'your-yandex-verification-code',
        // bing: 'your-bing-verification-code',
    },
};

export function generateStructuredData() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Abdullah Abu Sghaira',
        url: baseUrl,
        image: `${baseUrl}/profile.jpg`,
        sameAs: [
            'https://github.com/Abdoocoder',
            'https://www.linkedin.com/in/abdullah-abosagherah-64b37357/', // Update with your LinkedIn
            'https://twitter.com/abdoocoder', // Update with your Twitter
        ],
        jobTitle: 'Full Stack Developer',
        worksFor: {
            '@type': 'Organization',
            name: 'Freelance',
        },
        description: 'Full Stack Developer specializing in React, Next.js, and modern web technologies.',
        knowsAbout: [
            'Web Development',
            'React',
            'Next.js',
            'TypeScript',
            'JavaScript',
            'Node.js',
            'Firebase',
            'Tailwind CSS',
        ],
    };
}
