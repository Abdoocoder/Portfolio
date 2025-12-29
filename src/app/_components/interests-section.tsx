'use client';
import { SectionHeading } from "./section-heading";
import { Target, Briefcase, Lightbulb } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';

const interests = [
  {
    icon: Target,
    titleKey: "systemDev.title",
    descriptionKey: "systemDev.description",
  },
  {
    icon: Briefcase,
    titleKey: "digitalTransformation.title",
    descriptionKey: "digitalTransformation.description",
  },
  {
    icon: Lightbulb,
    titleKey: "innovativeEnvironments.title",
    descriptionKey: "innovativeEnvironments.description",
  },
];

export function InterestsSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations.interests : enTranslations.interests;

  return (
    <section id="interests" className="py-20 sm:py-32 animate-fade-in-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">{translations.title}</SectionHeading>
        <p className="mt-4 max-w-3xl mx-auto text-center text-lg text-muted-foreground">
          {translations.subtitle}
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {interests.map((interest, index) => (
            <div 
              key={interest.titleKey} 
              className="text-center p-6 bg-card rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex justify-center items-center mb-4">
                <interest.icon className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-lg font-bold font-headline text-primary">{translations[interest.titleKey as keyof typeof translations]}</h3>
              <p className="mt-2 text-muted-foreground">{translations[interest.descriptionKey as keyof typeof translations]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
