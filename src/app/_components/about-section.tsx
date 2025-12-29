'use client';
import Image from "next/image";
import { SectionHeading } from "./section-heading";
import { useContext } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';
import { placeHolderImages } from "@/lib/placeholder-images";

export function AboutSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations : enTranslations;
  const aboutImage = placeHolderImages.find(p => p.id === 'about-portrait');
  
  return (
    <section id="about" className="py-20 sm:py-32 animate-fade-in-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <SectionHeading>{translations.about.title}</SectionHeading>
            <div className="space-y-4 text-muted-foreground">
              <p>
                {translations.about.paragraph1}
              </p>
              <p>
                {translations.about.paragraph2}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={translations.about.imageAlt}
                width={400}
                height={500}
                data-ai-hint={aboutImage.imageHint}
                className="rounded-lg object-cover shadow-lg transition-transform duration-300 hover:scale-105"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
