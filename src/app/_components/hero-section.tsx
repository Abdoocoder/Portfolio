'use client';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';

export function HeroSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations : enTranslations;

  return (
    <section id="hero" className="relative h-[80dvh] min-h-[500px] flex items-center justify-center text-center bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold font-headline tracking-tight text-primary sm:text-5xl md:text-6xl">
            {translations.hero.name}
          </h1>
          <p className="mt-4 text-xl sm:text-2xl font-semibold text-accent font-headline">
            {translations.hero.title}
          </p>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            {translations.hero.subtitle}
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="#contact">{translations.hero.contactButton}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-background">
              <Link href="#projects">
                {translations.hero.workButton}
                <ArrowDown className="ms-2 h-4 w-4 animate-bounce" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
