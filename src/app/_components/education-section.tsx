'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { GraduationCap } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';

const education = [
  {
    degreeKey: "bba.degree",
    institutionKey: "bba.institution",
    durationKey: "bba.duration",
  },
  {
    degreeKey: "itDiploma.degree",
    institutionKey: "itDiploma.institution",
    durationKey: "itDiploma.duration",
  },
];

export function EducationSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations.education : enTranslations.education;

  return (
    <section id="education" className="py-20 sm:py-32 animate-fade-in-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">{translations.title}</SectionHeading>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {education.map((edu, index) => (
            <Card 
              key={index} 
              className="transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <GraduationCap className="h-10 w-10 text-accent" />
                <div>
                  <CardTitle className="text-lg font-bold font-headline">{translations[edu.degreeKey as keyof typeof translations]}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-primary">{translations[edu.institutionKey as keyof typeof translations]}</p>
                <p className="text-sm text-muted-foreground">{translations[edu.durationKey as keyof typeof translations]}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
