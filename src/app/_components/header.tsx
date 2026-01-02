'use client';
import Link from "next/link";
import { Code2, Menu, Download, Moon, Sun } from "lucide-react";
import { useContext, useState, useRef, useEffect, useCallback } from "react";
import { LanguageContext } from "../context/language-context";
import { useTheme } from "../context/theme-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", labelKey: "about" },
  { href: "#skills", labelKey: "skills" },
  { href: "#projects", labelKey: "projects" },
  { href: "#experience", labelKey: "experience" },
  { href: "#contact", labelKey: "contact" },
];

const isGithubActions = process.env.NEXT_PUBLIC_GITHUB_ACTIONS === 'true';
const basePath = isGithubActions ? '/Portfolio' : '';

export function Header() {

  const { language, setLanguage } = useContext(LanguageContext);
  const { setTheme, resolvedTheme } = useTheme();
  const translations = language === 'ar' ? arTranslations : enTranslations;
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const activeId = useScrollSpy(navLinks.map(l => l.href.substring(1)), 100);

  const navRef = useRef<HTMLElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const updateIndicator = useCallback(() => {
    const activeLink = navRef.current?.querySelector(`[data-active="true"]`) as HTMLElement;
    if (activeLink) {
      setIndicatorStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
      });
    } else {
      setIndicatorStyle({ width: 0 });
    }
  }, []);

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeId, language, updateIndicator]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <Code2 className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
          <span className="font-bold font-headline text-lg">{translations.header.name}</span>
        </Link>
        <nav ref={navRef} className="hidden md:flex relative items-center space-x-1 text-sm font-medium">
          {navLinks.map(({ href, labelKey }) => (
            <Link
              key={labelKey}
              href={href}
              data-active={activeId === href.substring(1)}
              className={cn(
                "transition-colors hover:text-foreground/80 z-10 px-3 py-1.5 rounded-md",
                activeId === href.substring(1) ? "text-primary-foreground" : "text-foreground/60"
              )}
            >
              {translations.header.nav[labelKey as keyof typeof translations.header.nav]}
            </Link>
          ))}
          <div
            className="absolute h-full bg-primary rounded-md transition-all duration-300 ease-in-out"
            style={indicatorStyle}
          />
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hidden sm:inline-flex"
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <div className="hidden sm:flex items-center gap-2">
            <Button variant={language === 'en' ? 'default' : 'outline'} size="sm" onClick={() => setLanguage('en')}>EN</Button>
            <Button variant={language === 'ar' ? 'default' : 'outline'} size="sm" onClick={() => setLanguage('ar')}>AR</Button>
          </div>
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={language === 'ar' ? 'right' : 'left'}>
                <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
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
                    <SheetClose asChild>
                      <a
                        href={`${basePath}/CV.pdf`}
                        download="Abdullah_Abu_Sghaira_CV.pdf"
                        className="inline-flex items-center justify-center text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                      >
                        <Download className="me-2 h-5 w-5" />
                        {translations.header.downloadCvButton}
                      </a>
                    </SheetClose>

                  </nav>
                  <div className="mt-auto space-y-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={toggleTheme}
                    >
                      {resolvedTheme === 'dark' ? (
                        <>
                          <Sun className="me-2 h-4 w-4" />
                          Light Mode
                        </>
                      ) : (
                        <>
                          <Moon className="me-2 h-4 w-4" />
                          Dark Mode
                        </>
                      )}
                    </Button>
                    <div className="flex items-center gap-2">
                      <SheetClose asChild><Button className="flex-1" variant={language === 'en' ? 'default' : 'outline'} onClick={() => setLanguage('en')}>English</Button></SheetClose>
                      <SheetClose asChild><Button className="flex-1" variant={language === 'ar' ? 'default' : 'outline'} onClick={() => setLanguage('ar')}>العربية</Button></SheetClose>
                    </div>
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
