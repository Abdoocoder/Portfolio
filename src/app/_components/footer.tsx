'use client';
import { useContext } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';

export function Footer() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations : enTranslations;

  return (
    <footer className="py-6 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground">
          {translations.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
        </p>
      </div>
    </footer>
  );
}
