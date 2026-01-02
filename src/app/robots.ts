import { MetadataRoute } from 'next';

export const dynamic = 'force-static';


export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://abdullahsghaira.com'; // Update with your actual domain

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
