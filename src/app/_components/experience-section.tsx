'use client';
import { SectionHeading } from "./section-heading";
import { Briefcase } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';

const experiences = [
  {
    roleKey: "itSpecialist.role",
    companyKey: "itSpecialist.company",
    durationKey: "itSpecialist.duration",
    descriptionKeys: [
      "itSpecialist.description.item1",
      "itSpecialist.description.item2",
      "itSpecialist.description.item3",
      "itSpecialist.description.item4",
      "itSpecialist.description.item5",
    ],
  },
];

export function ExperienceSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations.experience : enTranslations.experience;
  
  return (
    <section id="experience" className="py-20 sm:py-32 bg-secondary animate-fade-in-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">{translations.title}</SectionHeading>
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="relative border-l-2 border-primary/20">
            {experiences.map((exp, index) => (
              <div key={index} className="mb-10 ml-8 transition-all duration-300 hover:ml-9">
                <span className="absolute -left-[11px] flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-8 ring-secondary">
                  <Briefcase className="h-4 w-4 text-primary-foreground" />
                </span>
                <div className="p-4 bg-background rounded-lg shadow-sm transition-shadow hover:shadow-md">
                  <h3 className="text-xl font-bold font-headline text-primary">{translations[exp.roleKey as keyof typeof translations]}</h3>
                  <p className="font-semibold text-accent">{translations[exp.companyKey as keyof typeof translations]}</p>
                  <time className="block mb-2 text-sm font-normal leading-none text-muted-foreground">{translations[exp.durationKey as keyof typeof translations]}</time>
                  <ul className="mt-4 space-y-2 text-base text-muted-foreground list-disc pl-5">
                    {exp.descriptionKeys.map((pointKey, i) => (
                      <li key={i}>{translations[pointKey as keyof typeof translations]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
