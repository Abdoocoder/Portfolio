import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { GeistSans } from 'geist/font/sans';
import { Space_Grotesk, Tajawal } from 'next/font/google';
import { LanguageProvider } from './context/language-context';
import { ThemeProvider } from './context/theme-context';
import { defaultMetadata, generateStructuredData } from '@/lib/metadata';
import { FirebaseAnalytics } from './_components/firebase-analytics';
import { ClerkProvider } from '@clerk/nextjs';





const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-tajawal',
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = generateStructuredData();

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`scroll-smooth ${GeistSans.variable} ${spaceGrotesk.variable} ${tajawal.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </a>
        <ClerkProvider>
          <LanguageProvider>
            <ThemeProvider>
              {children}
              <Toaster />
              <FirebaseAnalytics />
            </ThemeProvider>
          </LanguageProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
