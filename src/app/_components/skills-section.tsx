'use client';
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { 
  Laptop, 
  Database, 
  GitBranch, 
  Cloud, 
  Search, 
  Lock,
  Code
} from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';

const skills = [
  { nameKey: "htmlCssJs", icon: Code },
  { nameKey: "reactNext", icon: Laptop },
  { nameKey: "firebase", icon: Database },
  { nameKey: "supabase", icon: Database },
  { nameKey: "gitGithub", icon: GitBranch },
  { nameKey: "vercel", icon: Cloud },
  { nameKey: "systemAnalysis", icon: Search },
  { nameKey: "accessControl", icon: Lock },
];

export function SkillsSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations : enTranslations;

  return (
    <section id="skills" className="py-20 sm:py-32 bg-secondary animate-fade-in-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">{translations.skills.title}</SectionHeading>
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <Card 
              key={skill.nameKey} 
              className="group text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:bg-card/90"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                <skill.icon className="h-12 w-12 text-accent transition-colors duration-300 group-hover:text-primary" />
                <p className="font-semibold text-base sm:text-lg">{translations.skills.items[skill.nameKey as keyof typeof translations.skills.items]}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
