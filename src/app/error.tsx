'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="max-w-md text-center">
                <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-destructive/10 p-4">
                        <AlertCircle className="h-12 w-12 text-destructive" />
                    </div>
                </div>
                <h1 className="mb-2 text-3xl font-bold text-foreground">
                    Oops! Something went wrong
                </h1>
                <p className="mb-6 text-muted-foreground">
                    We apologize for the inconvenience. An unexpected error has occurred.
                </p>
                {error.digest && (
                    <p className="mb-4 text-sm text-muted-foreground">
                        Error ID: {error.digest}
                    </p>
                )}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button onClick={reset} size="lg">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Try Again
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="/">Go Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
