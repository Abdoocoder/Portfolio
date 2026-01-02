import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import { LanguageProvider } from './context/language-context';
import { ThemeProvider } from './context/theme-context';
import { defaultMetadata, generateStructuredData } from '@/lib/metadata';
import { FirebaseAnalytics } from './_components/firebase-analytics';





const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = generateStructuredData();

  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          <ThemeProvider>
            {children}
            <Toaster />
            <FirebaseAnalytics />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
