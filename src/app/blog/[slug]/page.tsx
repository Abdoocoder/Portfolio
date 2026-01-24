import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const posts = getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.titleKey,
        description: post.descriptionKey,
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-3xl mx-auto">
                    <Button asChild variant="ghost" className="mb-8">
                        <Link href="/blog">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Blog
                        </Link>
                    </Button>

                    <article>
                        <header className="mb-8">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag: string) => (
                                    <Badge key={tag} variant="secondary">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
                                {post.titleKey}
                            </h1>

                            <div className="flex items-center gap-4 text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {format(new Date(post.publishDate), 'MMMM dd, yyyy')}
                                </div>
                                {post.readingTime && (
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {post.readingTime} min read
                                    </div>
                                )}
                            </div>
                        </header>

                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="lead text-xl text-muted-foreground mb-8">
                                {post.descriptionKey}
                            </p>

                            <div className="bg-muted/50 rounded-lg p-8 my-8">
                                <p className="text-center text-muted-foreground">
                                    Blog content will be displayed here. This is a placeholder for the full article content.
                                </p>
                                <p className="text-center text-sm text-muted-foreground mt-4">
                                    You can integrate with a CMS like Sanity, Contentful, or use MDX for blog content.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}
