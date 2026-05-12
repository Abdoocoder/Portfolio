'use client';
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
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
import { Show, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";

const navLinks = [
  { href: "#about", labelKey: "about" },
  { href: "#skills", labelKey: "skills" },
  { href: "#projects", labelKey: "projects" },
  { href: "#experience", labelKey: "experience" },
  { href: "#contact", labelKey: "contact" },
];

function MagneticNavLink({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 15 });
  const springY = useSpring(y, { stiffness: 300, damping: 15 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 150;
    if (dist > maxDist) return;
    const strength = (1 - dist / maxDist);
    x.set(dx * 0.1 * strength);
    y.set(dy * 0.1 * strength);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative z-10"
    >
      <Link
        href={href}
        data-active={isActive}
        className={cn(
          "transition-colors hover:text-foreground/80 px-3 py-1.5 rounded-md block",
          isActive ? "text-primary-foreground" : "text-foreground/60"
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}

export function Header() {

  const { language, setLanguage } = useContext(LanguageContext);
  const { setTheme, resolvedTheme } = useTheme();
  const translations = language === 'ar' ? arTranslations : enTranslations;
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const activeId = useScrollSpy(navLinks.map(l => l.href.substring(1)), 100);

  const navRef = useRef<HTMLElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  const updateIndicator = useCallback(() => {
    const navEl = navRef.current;
    const activeLink = navEl?.querySelector(`[data-active="true"]`) as HTMLElement | null;
    if (activeLink && navEl) {
      const navRect = navEl.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
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
          <Code2 className="h-6 w-6 text-primary transition-transform group-hover:scale-105" />
          <span className="font-bold font-headline text-lg">{translations.header.name}</span>
        </Link>
        <nav ref={navRef} className="hidden md:flex relative items-center space-x-1 text-sm font-medium">
          {navLinks.map(({ href, labelKey }) => (
            <MagneticNavLink
              key={labelKey}
              href={href}
              isActive={activeId === href.substring(1)}
            >
              {translations.header.nav[labelKey as keyof typeof translations.header.nav]}
            </MagneticNavLink>
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
          <div className="hidden sm:flex items-center gap-1.5">
            <Show when="signed-out">
              <Button variant="ghost" size="sm" asChild>
                <SignInButton forceRedirectUrl="/dashboard" />
              </Button>
              <Button variant="default" size="sm" asChild>
                <SignUpButton forceRedirectUrl="/dashboard" />
              </Button>
            </Show>
            <Show when="signed-in">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton />
            </Show>
          </div>
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
                      <Link
                        href="/cv"
                        className="inline-flex items-center justify-center text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                      >
                        <Download className="me-2 h-5 w-5" />
                        {translations.header.downloadCvButton}
                      </Link>
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
                    <div className="flex items-center gap-2 pt-2 border-t border-border">
                      <Show when="signed-out">
                        <SheetClose asChild><Button variant="outline" size="sm" className="flex-1"><SignInButton forceRedirectUrl="/dashboard" /></Button></SheetClose>
                        <SheetClose asChild><Button variant="default" size="sm" className="flex-1"><SignUpButton forceRedirectUrl="/dashboard" /></Button></SheetClose>
                      </Show>
                      <Show when="signed-in">
                        <SheetClose asChild><Button variant="ghost" size="sm" className="flex-1"><Link href="/dashboard">Dashboard</Link></Button></SheetClose>
                        <div className="flex justify-center w-full"><UserButton /></div>
                      </Show>
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
