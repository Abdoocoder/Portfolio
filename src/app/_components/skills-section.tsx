'use client';
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { Laptop, Database, GitBranch, Cloud, Search, Lock, Code } from "lucide-react";
import { useContext } from "react";
import { LanguageContext } from "../context/language-context";
import arTranslations from '../../translations/ar.json';
import enTranslations from '../../translations/en.json';

const skills = [
  { nameKey: "htmlCssJs",       icon: Code },
  { nameKey: "reactNext",       icon: Laptop },
  { nameKey: "firebase",        icon: Database },
  { nameKey: "supabase",        icon: Database },
  { nameKey: "gitGithub",       icon: GitBranch },
  { nameKey: "vercel",          icon: Cloud },
  { nameKey: "systemAnalysis",  icon: Search },
  { nameKey: "accessControl",   icon: Lock },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1, x: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 18 },
  },
};

export function SkillsSection() {
  const { language } = useContext(LanguageContext);
  const translations = language === 'ar' ? arTranslations : enTranslations;

  return (
    <section id="skills" role="region" aria-label="Skills" className="py-20 sm:py-32 bg-secondary overflow-hidden scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-center">{translations.skills.title}</SectionHeading>

        <motion.div
          className="mt-14 max-w-2xl mx-auto divide-y divide-border"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.nameKey}
              variants={item}
              className="group flex items-center gap-4 py-4 cursor-default"
            >
              <skill.icon
                className="h-5 w-5 shrink-0 text-accent"
                aria-hidden="true"
              />
              <span className="font-medium text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                {translations.skills.items[skill.nameKey as keyof typeof translations.skills.items]}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
