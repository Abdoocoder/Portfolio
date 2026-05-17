import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export const dynamic = 'force-static';


export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_URL;

    const routes = [
        '',
    ];

    const staticPages = routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
        alternates: {
            languages: {
                en: `${baseUrl}/en${route}`,
                ar: `${baseUrl}/ar${route}`,
            },
        },
    }));

    return staticPages;
}
