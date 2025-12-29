'use client';
import Link from "next/link";
import { Code2, Menu } from "lucide-react";
import { useContext, useState } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const navLinks = [
  { href: "#about", labelKey: "about" },
  { href: "#skills", labelKey: "skills" },
  { href: "#projects", labelKey: "projects" },
  { href: "#experience", labelKey: "experience" },
  { href: "#contact", labelKey: "contact" },
];

export function Header() {
  const { language, setLanguage } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations : enTranslations;
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">{translations.header.name}</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map(({ href, labelKey }) => (
            <Link key={labelKey} href={href} className="text-foreground/60 transition-colors hover:text-foreground/80">
              {translations.header.nav[labelKey as keyof typeof translations.header.nav]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <Button variant={language === 'en' ? 'default' : 'outline'} size="sm" onClick={() => setLanguage('en')}>EN</Button>
            <Button variant={language === 'ar' ? 'default' : 'outline'} size="sm" onClick={() => setLanguage('ar')}>AR</Button>
          </div>
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={language === 'ar' ? 'right' : 'left'}>
                <div className="flex flex-col h-full py-6">
                    <Link href="/" className="flex items-center gap-2 mb-8">
                      <Code2 className="h-6 w-6 text-primary" />
                      <span className="font-bold font-headline text-lg">{translations.header.name}</span>
                    </Link>
                    <nav className="flex flex-col gap-4">
                      {navLinks.map(({ href, labelKey }) => (
                        <SheetClose key={labelKey} asChild>
                          <Link
                            href={href}
                            className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                            onClick={() => setIsSheetOpen(false)}
                          >
                            {translations.header.nav[labelKey as keyof typeof translations.header.nav]}
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>
                    <div className="mt-auto flex items-center gap-2">
                        <SheetClose asChild><Button className="flex-1" variant={language === 'en' ? 'default' : 'outline'} onClick={() => setLanguage('en')}>English</Button></SheetClose>
                        <SheetClose asChild><Button className="flex-1" variant={language === 'ar' ? 'default' : 'outline'} onClick={() => setLanguage('ar')}>العربية</Button></SheetClose>
                    </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
