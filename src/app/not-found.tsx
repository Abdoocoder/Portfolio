import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="max-w-md text-center">
                <div className="mb-6">
                    <h1 className="text-9xl font-bold text-primary">404</h1>
                </div>
                <h2 className="mb-2 text-3xl font-bold text-foreground">
                    Page Not Found
                </h2>
                <p className="mb-8 text-muted-foreground">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button size="lg" asChild>
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Go Home
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/#projects">
                            <Search className="mr-2 h-4 w-4" />
                            View Projects
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
