import { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'building-modern-portfolio-nextjs',
        titleKey: 'blog.post1.title',
        descriptionKey: 'blog.post1.description',
        contentKey: 'blog.post1.content',
        author: 'Abdullah Abu Sghaira',
        publishDate: '2024-12-15T10:00:00Z',
        category: 'tutorial',
        tags: ['Next.js', 'React', 'Portfolio', 'Web Development'],
        featured: true,
        readingTime: 8,
    },
    {
        id: '2',
        slug: 'firebase-authentication-guide',
        titleKey: 'blog.post2.title',
        descriptionKey: 'blog.post2.description',
        contentKey: 'blog.post2.content',
        author: 'Abdullah Abu Sghaira',
        publishDate: '2024-12-10T14:30:00Z',
        category: 'tutorial',
        tags: ['Firebase', 'Authentication', 'Security'],
        featured: false,
        readingTime: 12,
    },
    {
        id: '3',
        slug: 'tailwind-css-best-practices',
        titleKey: 'blog.post3.title',
        descriptionKey: 'blog.post3.description',
        contentKey: 'blog.post3.content',
        author: 'Abdullah Abu Sghaira',
        publishDate: '2024-12-05T09:15:00Z',
        category: 'article',
        tags: ['Tailwind CSS', 'CSS', 'Design'],
        featured: true,
        readingTime: 6,
    },
];

export function getBlogPosts() {
    return blogPosts.sort((a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
}

export function getFeaturedPosts() {
    return blogPosts.filter(post => post.featured);
}

export function getBlogPostBySlug(slug: string) {
    return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string) {
    return blogPosts.filter(post => post.category === category);
}

export function getBlogPostsByTag(tag: string) {
    return blogPosts.filter(post => post.tags.includes(tag));
}

export function getAllTags() {
    const tags = new Set<string>();
    blogPosts.forEach(post => {
        post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
}
