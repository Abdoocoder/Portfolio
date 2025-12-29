import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { Figtree } from 'next/font/google';
import { LanguageProvider } from './context/language-context';

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
});

export const metadata: Metadata = {
  title: 'PortfolioFlow | Abdullah Abu Sghaira',
  description: 'Technical portfolio for Abdullah Abu Sghaira, an IT specialist and web systems developer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="en" className={`scroll-smooth ${figtree.variable}`} data-theme="light">
        <head>
        </head>
        <body className="font-body antialiased">
          {children}
          <Toaster />
        </body>
      </html>
    </LanguageProvider>
  );
}
