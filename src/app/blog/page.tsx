import { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts, getAllTags } from '@/lib/blog-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Articles and tutorials about web development, React, Next.js, and more.',
};

export default function BlogPage() {
    const posts = getBlogPosts();
    const allTags = getAllTags();

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
                        Blog
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        Thoughts, tutorials, and insights on web development
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-12">
                        {allTags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Blog Posts */}
                    <div className="space-y-8">
                        {posts.map((post) => (
                            <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {format(new Date(post.publishDate), 'MMM dd, yyyy')}
                                        </div>
                                        {post.readingTime && (
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {post.readingTime} min read
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold font-headline mb-2">
                                            {post.titleKey}
                                        </h2>
                                        <p className="text-muted-foreground">
                                            {post.descriptionKey}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <Badge key={tag} variant="outline">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div>
                                        <Button asChild variant="link" className="p-0">
                                            <Link href={`/blog/${post.slug}`}>
                                                Read more
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {posts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
